import React from 'react';
import '../styles/components/pagination.scss';

type Props = {
  prevPage?: number;
  nextPage?: number;
  prevButtonAction: () => void;
  nextButtonAction: () => void;
};

const Pagination: React.FC<Props> = ({ prevPage, nextPage, prevButtonAction, nextButtonAction }) => {
  if (!prevPage && !nextPage) {
    return null;
  }

  return (
    <div className='pagination'>
      <button
        type='button'
        disabled={!prevPage}
        onClick={() => {
          if (prevPage) {
            prevButtonAction();
          }
        }}
      >
        前
      </button>
      <button
        type='button'
        disabled={!nextPage}
        onClick={() => {
          if (nextPage) {
            nextButtonAction();
          }
        }}
      >
        次
      </button>
    </div>
  );
};

export default Pagination;
