import React from 'react';
import '../styles/components/shadow-box.scss';

type Props = {
  children?: React.ReactNode;
};

const ShadowBox: React.FC<Props> = (props: Props) => {
  return <div className='shadow-box'>{props.children}</div>;
};

export default ShadowBox;
