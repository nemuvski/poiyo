import React, { ReactElement } from 'react';
import '../styles/layouts/main.scss';

type Props = {
  children?: React.ReactNode;
}

const Main: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <main className="main">
      <div className="main__inner">
        {props.children}
      </div>
    </main>
  );
}

export default Main;
