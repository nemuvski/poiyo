import React from 'react';
import NewsService from '../libs/services/NewsService';
import { formatYMD } from '../libs/common/Dayjs';
import '../styles/components/news-list.scss';

const NewsList: React.FC = () => {
  return (
    <div className='news-list'>
      {NewsService.data.map((news, index) => {
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
