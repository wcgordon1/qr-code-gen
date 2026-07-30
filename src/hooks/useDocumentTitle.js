import { useEffect } from "react";

/**
 * Keeps the browser tab title synchronized with the active page.
 *
 * @param {string} title - The title shown by the browser.
 * @returns {void}
 */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
