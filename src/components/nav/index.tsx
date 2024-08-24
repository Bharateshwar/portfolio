import { useGSAP } from '@gsap/react';
import { Link } from '@remix-run/react';
import gsap from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { SLIDES_ITEM_CONTENT_SELECTOR } from 'components/rollingCarousel/constants';

function Nav() {
  useGSAP(() => {
    const targets: HTMLAnchorElement[] = gsap.utils.toArray(
      '.nav__link--resume, .nav__link--hire, .nav__bottom',
    );

    const rollingCarouselFirstSlide = document.querySelector(
      SLIDES_ITEM_CONTENT_SELECTOR,
    ) as HTMLDivElement;

    ScrollTrigger.create({
      trigger: rollingCarouselFirstSlide.parentNode as HTMLDivElement,
      start: 'top 10%',
      onEnter() {
        targets.forEach((target) => target.classList.add('--dark'));
      },
      onLeaveBack() {
        targets.forEach((target) => target.classList.remove('--dark'));
      },
    });
  });

  return (
    <nav className="nav">
      <div className="nav__top">
        <Link to="/about" className="nav__link">
          About me
        </Link>
        <Link to="/skills" className="nav__link">
          Skills
        </Link>
      </div>
      <div className="nav__bottom">
        <a
          href="/bharateshwar's resume.pdf"
          className="nav__link nav__link--resume"
          download
        >
          Resume
        </a>
        <Link to="/contact" className="nav__link nav__link--hire">
          Hire me
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
