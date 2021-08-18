import React from 'react';
import { News } from '../models/News';
import { formatYMD } from '../libs/Dayjs';
import '../styles/components/news-list.scss';

const NewsList: React.FC = () => {
  const newsList = [
    new News('2021-08-12', '🏎 機能のリファクタリング'),
    new News('2021-08-10', '🐛 軽微なバグを修正, 一部UIを改善'),
    new News('2021-08-09', '🏖 一部スタイルの変更, 機能のリファクタリング, ライブラリのアップデート等'),
    new News('2021-07-31', '🛠 フロントページのタイトル変更, ライブラリのアップデート等'),
    new News('2021-06-27', '🐛 誤記訂正, ライブラリのアップデート等'),
    new News('2021-04-09', '🐛 軽微なバグを修正'),
    new News('2021-02-18', '🐛 日付フォーマットを変更, 日付関連のバグを修正'),
    new News('2021-02-16', '🛠 ボードまたはコメント削除時とサービス退会時にモーダルを表示'),
    new News('2021-02-14', '🎉 本サービスリリース開始'),
  ];

  return (
    <div className='news-list'>
      {newsList.map((news, index) => {
        return (
          <div className='news-list__item' key={index}>
            <time className='news-list__item-date'>{formatYMD(news.day, true)}</time>
            <div className='news-list__item-title'>{news.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsList;
