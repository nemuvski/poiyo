/**
 * お知らせに関するサービス関数を定義.
 */
import {News} from "../models/News";

const data: Array<News> = [
  new News('2021-04-09', '🐛 軽微なバグを修正'),
  new News('2021-02-18', '🐛 日付フォーマットを変更, 日付関連のバグを修正'),
  new News('2021-02-16', '🛠 ボードまたはコメント削除時とサービス退会時にモーダルを表示'),
  new News('2021-02-14', '🎉 本サービスリリース開始'),
];

export default { data };
