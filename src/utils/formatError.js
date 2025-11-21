// src/utils/formatError.js
export function formatFriendlyError(err) {
  if (!err) return 'Unknown error';
  // If err is Error with message from backend, use it but avoid leaking stack
  if (err.message) return err.message;
  return String(err);
}
