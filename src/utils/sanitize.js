// src/utils/sanitize.js
import DOMPurify from 'dompurify';

export function sanitizeHtml(html) {
  if (!html) return '';
  // configure if needed: DOMPurify.sanitize(html, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow'] })
  return DOMPurify.sanitize(html);
}
