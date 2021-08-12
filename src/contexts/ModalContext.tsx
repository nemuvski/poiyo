import React, { createContext, useEffect, useState } from 'react';
import { ModalNameType } from '../stores/modal/slice';

type ModalInfo = {
  name: ModalNameType;
  isOpen: boolean;
};

type Props = {
  children?: React.ReactNode;
};

type Context = {
  closeModal: (name: ModalNameType) => void;
  openModal: (name: ModalNameType) => void;
  setupModal: (name: ModalNameType) => void;
  isOpen: (name: ModalNameType) => boolean;
};

export const ModalContext: React.Context<Context> = createContext<Context>({
  closeModal: () => null,
  openModal: () => null,
  setupModal: () => null,
  isOpen: () => false,
});

export const ModalProvider: React.FC<Props> = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<Array<ModalInfo>>([]);
  const closeModal = (name: ModalNameType) => {
    const newState = isModalOpen.map((modalInfo) => {
      if (modalInfo.name === name) {
        modalInfo.isOpen = false;
      }
      return modalInfo;
    });
    setIsModalOpen(newState);
  };
  const openModal = (name: ModalNameType) => {
    const newState = isModalOpen.map((modalInfo) => {
      if (modalInfo.name === name) {
        modalInfo.isOpen = true;
      }
      return modalInfo;
    });
    setIsModalOpen(newState);
  };
  const isOpen = (name: ModalNameType): boolean => {
    for (let i = 0; i < isModalOpen.length; i++) {
      if (isModalOpen[i].name === name) {
        return isModalOpen[i].isOpen;
      }
    }
    return false;
  };
  const setupModal = (name: ModalNameType) => {
    let exist = false;
    // すでに同じ名前のモーダルが登録されているか確認.
    for (let i = 0; i < isModalOpen.length; i++) {
      if (isModalOpen[i].name === name) {
        isModalOpen[i].isOpen = false;
        exist = true;
      }
    }
    if (!exist) {
      const modalInfo = {
        name,
        isOpen: false,
      } as ModalInfo;
      const newState = isModalOpen;
      newState.unshift(modalInfo);
      setIsModalOpen(newState);
    }
  };

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
    // 1つでも開いていたら固定表示.
    let state = false;
    for (let i = 0; i < isModalOpen.length; i++) {
      if (isModalOpen[i].isOpen) {
        state = true;
        break;
      }
    }
    fixedScroll(state);
    return () => {
      fixedScroll(false);
    };
  }, [isModalOpen]);

  return (
    <ModalContext.Provider value={{ closeModal, openModal, setupModal, isOpen }}>
      {props.children}
    </ModalContext.Provider>
  );
};
