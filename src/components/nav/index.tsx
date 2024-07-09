import { Link } from '@remix-run/react';

function Nav() {
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
