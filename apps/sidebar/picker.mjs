import { shortTarget } from './setup-state.mjs';

// A select-only combobox over the choices AIOS has saved for this context, plus
// an inline Link/Name editor. It never lists, searches or checks Notion pages.
function node(tag, props = {}, ...children) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === 'role' || key.startsWith('aria-')) element.setAttribute(key, value);
    else element[key] = value;
  }
  element.append(...children.flat().filter(child => child !== '' && child != null));
  return element;
}
const sameLink = (a, b) => a?.target === b?.target && a?.title === b?.title;

export function createPicker({ id, label, optional = true, menuLabel = 'Saved sources', editText = ['Add link…', 'Edit link…'],
  applyText = 'Apply', nameField = true, placeholder = 'https://… or /path/to/folder', onSelect, onApply, onEdit = () => {} }) {
  const value = node('span', { className: 'picker-value' });
  const button = node('button', { type: 'button', id, className: 'picker', role: 'combobox', 'aria-haspopup': 'listbox', 'aria-expanded': 'false', 'aria-controls': `${id}-list` }, value);
  const list = node('div', { id: `${id}-list`, className: 'menu', role: 'listbox', 'aria-label': label, hidden: true });
  const link = node('input', { id: `${id}-link`, className: 'form-control', type: 'text', maxLength: 2048, autocomplete: 'off', placeholder });
  const name = node('input', { id: `${id}-name`, className: 'form-control', type: 'text', maxLength: 100, autocomplete: 'off', placeholder: 'Shown in AIOS' });
  const note = node('p', { className: 'editor-note', hidden: true });
  const error = node('p', { className: 'editor-error', hidden: true });
  const cancel = node('button', { type: 'button', className: 'btn btn-ghost' }, 'Cancel');
  const apply = node('button', { type: 'button', id: `${id}-apply`, className: 'btn btn-secondary' }, applyText);
  const editor = node('div', { className: 'editor', hidden: true },
    node('label', { className: 'field-label', htmlFor: link.id }, 'Link'), link,
    nameField ? [node('label', { className: 'field-label', htmlFor: name.id }, 'Name', node('span', { className: 'optional' }, 'Optional')), name] : [],
    note, error, node('div', { className: 'editor-actions' }, cancel, apply));
  const root = node('div', { className: 'field' },
    node('label', { className: 'field-label', htmlFor: id }, label, optional ? node('span', { className: 'optional' }, 'Optional') : ''),
    node('div', { className: 'picker-wrap' }, button, list), editor);
  let state = { value: null, choices: [], disabled: false }, options = [], items = [], active = 0, expanded = false, spaceKey = false, busy = false;

  function optionList() {
    const choices = state.choices.filter(Boolean);
    if (state.value && !choices.some(choice => sameLink(choice, state.value))) choices.push(state.value);
    return [...choices.map(choice => ({ link: choice })), ...(optional ? [{ none: true }] : []), { edit: true }];
  }
  function paint() {
    const selected = options.findIndex(option => option.link ? sameLink(option.link, state.value) : option.none && !state.value);
    items = options.map((option, index) => {
      const item = node('div', { id: `${id}-opt-${index}`, role: 'option', className: option.edit ? 'option option-action' : 'option', 'aria-selected': String(index === selected) },
        option.link ? [node('span', { className: 'option-title' }, option.link.title), node('span', { className: 'option-meta' }, shortTarget(option.link.target))]
          : option.none ? 'None' : editText[state.value ? 1 : 0]);
      item.addEventListener('mousedown', event => event.preventDefault());
      item.addEventListener('click', () => choose(index));
      return item;
    });
    const saved = items.filter((_, index) => options[index].link);
    list.replaceChildren(...(saved.length ? [node('div', { role: 'group', 'aria-label': menuLabel }, node('div', { className: 'menu-label', 'aria-hidden': 'true' }, menuLabel), saved)] : []),
      ...items.filter((_, index) => !options[index].link));
    return selected;
  }
  function setActive(index) {
    active = Math.max(0, Math.min(index, options.length - 1));
    items.forEach((item, position) => { item.dataset.active = String(position === active); });
    button.setAttribute('aria-activedescendant', items[active].id);
    items[active].scrollIntoView?.({ block: 'nearest' });
  }
  function outside(event) { if (!root.contains(event.target)) close(); }
  function open() {
    if (state.disabled || expanded) return;
    expanded = true; options = optionList(); list.hidden = false; button.setAttribute('aria-expanded', 'true');
    const selected = Math.max(paint(), 0);
    // Open upward when the drawer footer would cover the menu.
    const bounds = button.getBoundingClientRect?.();
    const container = root.closest?.('.drawer-body')?.getBoundingClientRect();
    if (bounds) {
      const height = list.getBoundingClientRect().height;
      const bottom = container?.bottom ?? document.documentElement.clientHeight;
      list.dataset.side = bottom - bounds.bottom < height + 4 && bounds.top - (container?.top ?? 0) >= height + 4 ? 'up' : 'down';
    }
    setActive(selected);
    document.addEventListener('pointerdown', outside, true);
  }
  function close() {
    if (!expanded) return;
    expanded = false; list.hidden = true; button.setAttribute('aria-expanded', 'false'); button.removeAttribute('aria-activedescendant');
    document.removeEventListener('pointerdown', outside, true);
  }
  function choose(index) {
    const option = options[index];
    close();
    if (option.edit) return openEditor();
    onSelect(option.link || null); button.focus();
  }
  function openEditor() {
    if (state.disabled) return;
    close();
    link.value = state.value?.target || ''; name.value = state.value?.title || '';
    error.hidden = true; editor.hidden = false; note.hidden = !state.note; link.focus();
  }
  function reset() { close(); editor.hidden = true; error.hidden = true; }
  function closeEditor() { reset(); onEdit(); button.focus(); }
  function hasEdits() {
    return !editor.hidden && (link.value !== (state.value?.target || '') || nameField && name.value !== (state.value?.title || ''));
  }
  async function submit() {
    if (busy || state.disabled) return;
    busy = true;
    try {
      const message = await onApply({ target: link.value, name: name.value });
      if (message) { error.textContent = message; error.hidden = false; link.focus(); }
      else closeEditor();
    } finally { busy = false; }
  }

  button.addEventListener('click', () => expanded ? close() : open());
  button.addEventListener('keydown', event => {
    if (!expanded) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); open(); }
      return;
    }
    const moves = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: options.length - 1 };
    if (Object.hasOwn(moves, event.key)) { event.preventDefault(); setActive(moves[event.key]); }
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); spaceKey = event.key === ' '; choose(active); }
    else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
    else if (event.key === 'Tab') close();
  });
  // Space activates buttons on keyup; stop that click from reopening the menu.
  button.addEventListener('keyup', event => { if (event.key === ' ' && spaceKey) { event.preventDefault(); spaceKey = false; } });
  editor.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeEditor(); }
    else if (event.key === 'Enter' && event.target.tagName === 'INPUT') { event.preventDefault(); submit(); }
  });
  cancel.addEventListener('click', closeEditor);
  apply.addEventListener('click', submit);
  for (const input of [link, name]) input.addEventListener('input', onEdit);

  function render(next) {
    state = next;
    value.textContent = next.value?.title || (optional ? 'None' : 'Not set');
    button.dataset.empty = String(!next.value);
    button.disabled = next.disabled;
    for (const control of [link, name, cancel, apply]) control.disabled = next.disabled;
    apply.textContent = next.applyText || applyText;
    note.textContent = next.note || ''; note.hidden = !next.note || editor.hidden;
    if (next.disabled) close();
    else if (expanded) { options = optionList(); paint(); setActive(active); }
  }
  return { root, button, render, open, close, openEditor, reset, hasEdits, focusEditor: () => link.focus() };
}
