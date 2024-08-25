import { FOOTER_LINKS } from './constants';

import 'styles/footer.scss';

function Footer() {
  const renderFooterLinks = () => (
    <div className="footer__links-container">
      {FOOTER_LINKS.map(({ title, icon: Icon, link }) => (
        <a
          className="footer__link"
          key={title}
          href={link}
          rel="noreferrer"
          target="blank"
        >
          <Icon />
          {title}
        </a>
      ))}
    </div>
  );

  return <footer className="footer">{renderFooterLinks()}</footer>;
}

export default Footer;
