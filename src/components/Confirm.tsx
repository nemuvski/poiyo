import React from 'react';
import '../styles/components/confirm.scss';

type Props = {
  message: string;
  cancelAction: () => void;
  okAction: () => void;
  okLabel: string;
};

const ArticleInner: React.FC<Props> = (props: Props) => {
  return (
    <div className='confirm'>
      <p className='confirm__message'>{props.message}</p>
      <div className='confirm__actions'>
        <button className='is-white' type='button' onClick={() => props.cancelAction()}>
          キャンセル
        </button>
        <button className='is-red' type='button' onClick={() => props.okAction()}>
          {props.okLabel}
        </button>
      </div>
    </div>
  );
};

export default ArticleInner;
