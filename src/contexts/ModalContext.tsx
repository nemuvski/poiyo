import React, {createContext, useEffect, useState} from 'react';

type Props = {
  children?: React.ReactNode;
};

type Context = {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

export const ModalContext: React.Context<Context> = createContext<Context>({
  isModalOpen: false,
  closeModal: () => null,
  openModal: () => null,
});

export const ModalProvider: React.FC<Props> = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    // 固定表示(スクロール制限)を実行する.
    const fixedScroll = (status: boolean) => {
      const htmlElement = document.documentElement;
      if (status) {
        htmlElement.setAttribute('style', 'overflow: hidden');
      } else {
        htmlElement.style['overflow'] = '';
      }
    };
    fixedScroll(isModalOpen);
    return () => {
      fixedScroll(false);
    };
  }, [isModalOpen]);

  return (
    <ModalContext.Provider value={{ isModalOpen, closeModal, openModal }}>
      {props.children}
    </ModalContext.Provider>
  );
};
