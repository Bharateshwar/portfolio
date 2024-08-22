import { useGSAP } from '@gsap/react';
import gsap from 'gsap/dist/gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import { useRef } from 'react';

import 'styles/testimonials.scss';
import { TESTIMONIALS } from './constants';

function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<GSAPAnimation | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollToPlugin);

      scrollAnimationRef.current = gsap.to(containerRef.current, {
        scrollTo: {
          x: 'max',
          autoKill: true,
          // @TODO: Explore adding scrolling after autokill
          onAutoKill() {
            scrollAnimationRef.current = null;
          },
        },
        ease: 'none',
        duration: TESTIMONIALS.length * 4.5,
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef },
  );

  const pauseScrollAnimation = () => scrollAnimationRef.current?.pause();

  const playScrollAnimation = () => scrollAnimationRef.current?.play();

  return (
    <section className="testimonials-section hide-scrollbar" ref={containerRef}>
      {TESTIMONIALS.map(
        (
          { name, company, designation, image, pretext, excerpt, posttext },
          index,
        ) => {
          return (
            <div
              className="testimonial"
              key={index}
              onMouseOver={pauseScrollAnimation}
              onFocus={pauseScrollAnimation}
              onMouseOut={playScrollAnimation}
              onBlur={playScrollAnimation}
            >
              <div className="testimonial__intro">
                <img
                  src={image}
                  alt={name}
                  className="testimonial__image"
                  loading="lazy"
                />
                <div>
                  <p className="testimonial__name">{name}</p>
                  <p>{designation}</p>
                  <p>{company}</p>
                </div>
              </div>
              <p>
                <span className="testimonial__blurred-text">{pretext}</span>
                <span className="testimonial__excerpt">{excerpt}</span>
                <span className="testimonial__blurred-text">{posttext}</span>
              </p>
            </div>
          );
        },
      )}
    </section>
  );
}

export default Testimonials;
