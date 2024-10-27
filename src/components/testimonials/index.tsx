import { useGSAP } from '@gsap/react';
import { useLoaderData } from '@remix-run/react';
import cx from 'classnames';
import gsap from 'gsap/dist/gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';

import { loader as homePageLoader } from 'routes/_index';
import { getAnimationToggleTrigger } from 'utils';

import 'styles/testimonials.scss';
import { ANALYTICS_EVENTS, EVENT_CATEGORIES, TESTIMONIALS } from './constants';

function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<GSAPAnimation | null>(null);

  const { showContainedTestimonials } = useLoaderData<typeof homePageLoader>();

  // Engagement duration analytics
  useGSAP(
    () => {
      let startTime: number | null = null;

      const sendDurationEvent = () => {
        if (startTime) {
          const duration = (Date.now() - startTime) / 1000;
          sendEngagementDurationEvent(duration);
        }
      };

      const setStartTime = () => {
        startTime = Date.now();
      };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        end: 'bottom 20%',
        onEnter: setStartTime,
        onLeave: sendDurationEvent,
        onEnterBack: setStartTime,
        onLeaveBack: sendDurationEvent,
      });
    },
    { scope: containerRef },
  );

  // Autoscroll animation
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
        // Pause animation when not in view
        scrollTrigger: getAnimationToggleTrigger(containerRef.current),
      });
    },
    { scope: containerRef },
  );

  const pauseScrollAnimation = () => scrollAnimationRef.current?.pause();

  const playScrollAnimation = () => scrollAnimationRef.current?.play();

  const sendClickEvent = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag(
      'event',
      ANALYTICS_EVENTS.LINKEDIN_RECOMMENDATIONS_OPENED,
      {
        event_category: EVENT_CATEGORIES.TESTIMONIALS,
        event_label: showContainedTestimonials ? 'contained' : 'clean',
      },
    );
  };

  const sendEngagementDurationEvent = (duration: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag(
      'event',
      ANALYTICS_EVENTS.TESTIMONIALS_ENGAGEMENT_DURATION,
      {
        event_category: EVENT_CATEGORIES.TESTIMONIALS,
        event_label: showContainedTestimonials ? 'contained' : 'clean',
        value: duration,
      },
    );
  };

  const renderTestimonials = () => (
    <div className="testimonials-container hide-scrollbar" ref={containerRef}>
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
    </div>
  );

  return (
    <section
      className={cx('testimonials-section', {
        'testimonials-section--contained': showContainedTestimonials,
      })}
    >
      {renderTestimonials()}
      <a
        href="https://www.linkedin.com/in/bharateshwar/details/recommendations/"
        target="blank"
        rel="noreferrer"
        className="body-small"
        onClick={sendClickEvent}
      >
        Endorsed by Peers ↗
      </a>
    </section>
  );
}

export default Testimonials;
