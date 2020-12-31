import React, { createContext, useState, useCallback, ReactElement } from 'react';
import loadingImage from '../assets/loading.svg';
import '../styles/layouts/loading.scss';

type Props = {
  children?: React.ReactNode;
}

type Context = {
  showLoading: () => void;
  hideLoading: () => void;
}

export const LoadingContext: React.Context<Context> = createContext<Context>({
  showLoading: () => null,
  hideLoading: () => null,
});

export const LoadingProvider: React.FC<Props> = (props: Props): ReactElement => {
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

  const showLoading: () => void = useCallback(() => {
    setLoadingStatus(true);
  }, []);

  const hideLoading: () => void = useCallback(() => {
    setLoadingStatus(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {loadingStatus &&
        <div className="loading">
          <img className="loading__image" src={loadingImage} alt="データを読み込み中" />
          <p className="loading__description">データを読み込み中...</p>
        </div>
       }
      {props.children}
    </LoadingContext.Provider>
  );
}
