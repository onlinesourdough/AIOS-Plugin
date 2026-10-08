export function classifyTarget(value) {
  if (typeof value !== 'string' || value.length > 2048 || /[\x00-\x1f\x7f]/.test(value)) return null;
  const target = value.trim();
  if (target.startsWith('/') || /^[A-Za-z]:[\\/]/.test(target)) return { target, kind: 'path' };
  try {
    const url = new URL(target);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    const notion = url.hostname === 'notion.so' || url.hostname.endsWith('.notion.so') ||
      url.hostname === 'notion.site' || url.hostname.endsWith('.notion.site') || url.hostname === 'app.notion.com';
    return { target: url.href, kind: notion ? 'notion' : 'url' };
  } catch { return null; }
}

export function notionPageId(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password ||
      !['app.notion.com', 'notion.so', 'www.notion.so'].includes(url.hostname) && !url.hostname.endsWith('.notion.site')) return null;
    const match = url.pathname.match(/([a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\/?$/i);
    return match?.[1].replaceAll('-', '').toLowerCase() || null;
  } catch { return null; }
}
