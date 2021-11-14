/**
 * マークダウン記法のテキストデータをHTML形式に変換するヘルパー関数.
 */

import DOMPurify, { Config } from 'dompurify'
import { marked } from 'marked'

type InnerHTML = {
  __html: string
}

const renderer = new marked.Renderer()
// 出力されるanchorタグにtarget属性とrel属性を付与.
renderer.link = (href, title, text) => {
  return `<a rel="noopener noreferrer" target="_blank" href="${href}">${text}</a>`
}

export const convertMarkdownTextToHTML = (markdownText: string): InnerHTML => {
  // マークダウン記法のテキストをHTMLの文字列に変換.
  const markedText = marked(markdownText, {
    silent: true,
    renderer,
  })

  // DOMPurifyでサニタイズするときのオプションを定義.
  const config: Config = {
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOWED_TAGS: ['p', 'br', 'ul', 'ol', 'li', 'blockquote', 'strong', 'em', 'a', 'hr', 'del', 'pre', 'code'],
  }

  // dangerouslySetInnerHTMLだとstringしか受け付けていないため型をアサーション.
  const __html = DOMPurify.sanitize(markedText, config) as string

  return { __html }
}
