import { useGSAP } from '@gsap/react';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { FOOTER_LINKS } from './constants';

import 'styles/footer.scss';

function Footer() {
  useGSAP(() => {
    const footer = document.querySelector('.footer');
    const bottomNav = document.querySelector('.nav__bottom');

    ScrollTrigger.create({
      trigger: footer,
      start: 'top 110%',
      animation: gsap.to(bottomNav, {
        right: '-20vw',
      }),
      toggleActions: 'play none none reverse',
    });
  });

  const renderFooterLinks = () => (
    <div className="footer__links-container">
      {FOOTER_LINKS.map(({ title, icon: Icon, link }) => (
        <a
          className="footer__link body-small"
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

  return (
    <footer className="footer">
      {renderFooterLinks()}
      <span className="footer__note">Site designed & developed by Me.</span>
    </footer>
  );
}

export default Footer;
