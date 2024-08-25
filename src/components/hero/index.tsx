import 'styles/hero.scss';

function Hero() {
  return (
    <section className="hero">
      <p className="hero__intro body-large">Hi, I&apos;m Bharateshwar</p>
      <h1 className="hero__headline">
        <span className="hero__headline__item--one">Front-end</span>
        <span className="hero__headline__item--two">Developer</span>
      </h1>
      <p className="hero__description body-large">
        For over half a decade, I&apos;ve been dedicated to creating quality web
        solutions while working remotely from India.
      </p>
    </section>
  );
}

export default Hero;
