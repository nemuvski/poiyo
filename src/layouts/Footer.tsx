import React, { ReactElement } from 'react';
import '../styles/layouts/footer.scss';

const Footer: React.FC = (): ReactElement => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>© 2021 Poiyo</span>
      </div>
    </footer>
  );
}

export default Footer;
