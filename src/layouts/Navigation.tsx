import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import '../styles/layouts/navigation.scss';

const Navigation: React.FC = (): ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <nav role="navigation" aria-label="header-navigation" className={clsx('navigation', {'is-open':open})}>
      <div aria-hidden="true" className="navigation__toggle" onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </div>
      <ul className="navigation__actions">
        <li className="navigation__action">
          <button className="navigation__button">
            ログイン
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
