import React, {ReactElement, useEffect, useState} from 'react';
import clsx from "clsx";
import arrowUpIcon from '../assets/icons/arrow-up.svg';
import '../styles/layouts/scroll-to-top.scss';

const ScrollToTop: React.FC = (): ReactElement => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // スクロール時のイベントを登録する.
    document.addEventListener('scroll', () => {
      setHidden(window.scrollY < 100);
    });
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={clsx(['scroll-to-top', 'is-black', {'is-hidden':hidden}])}
      onClick={handleClick}
    >
      <img aria-hidden="true" alt="ページトップへ" title="ページのトップへスクロールします。" src={arrowUpIcon} />
    </button>
  );
}

export default ScrollToTop;
