/**
 * タイトルを設定する.
 *
 * @param title タイトル.
 * @param setSiteTitle サイトタイトルを末尾に付与したものにするかのフラグ.
 */
export const setDocumentTitle = (title: string, setSiteTitle = true): void => {
  document.title = setSiteTitle ? `${title} - Poiyo` : title;
};
