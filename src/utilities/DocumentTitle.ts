/**
 * タイトルを変更するユーティリティ.
 */

export const setDocumentTitle = (title: string, setSiteTitle = true): void => {
  document.title = setSiteTitle ? `${title} - Poiyo` : title;
};
