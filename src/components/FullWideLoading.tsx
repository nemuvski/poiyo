import React from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { selectFullWideLoading } from '../stores/fullWideLoading/selector';
import '../styles/components/full-wide-loading.scss';

const FullWideLoading: React.FC = () => {
  const isLoading = useSelector(selectFullWideLoading);
  const rootElement = document.getElementById('loading');

  if (!isLoading) {
    return null;
  }

  return createPortal(<div className='full-wide-loading' />, rootElement as Element);
};

export default FullWideLoading;
