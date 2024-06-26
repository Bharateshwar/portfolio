import { useGSAP } from '@gsap/react';
import gsap from 'gsap/dist/gsap';
import { useRef } from 'react';

import 'styles/skills.scss';
import { SKILLS_DATA } from './constants';

function Skills() {
  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const distributer = gsap.utils.distribute({
        base: 0,
        amount: mainContainerRef.current?.offsetWidth ?? window.innerWidth,
        // grid: [20, 10],
        // from: 'start',
      });

      // Scale items as per config in data const
      gsap.set('.skill-item', {
        // scale: (index) => SKILLS_DATA[index].scale ?? 1,

        left: (...params) => {
          const leftValue = distributer(...params);

          const maxLeftValue =
            (mainContainerRef.current?.offsetWidth ?? window.innerWidth) -
            params[1].offsetWidth;

          return gsap.utils.clamp(0, leftValue, maxLeftValue);
        },
      });

      // Add fade in to avoid flashing of unscaled items
      gsap.to('.skill-item', { opacity: 1 });

      gsap.to('.skill-item', {
        top: 'random(50,100)%',
        stagger: {
          from: 'random',
          amount: 0.05,
        },
        // stagger: 0.01,
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: 'clamptop 90%)',
          end: 'clamp(bottom top)',
          scrub: 0.5,
          markers: true,
        },
      });
    },
    { scope: mainContainerRef },
  );

  return (
    <div ref={mainContainerRef} className="skills-section">
      <div className="animation-trigger">
        {SKILLS_DATA.map(({ name, logo: Logo }) => (
          <div className="skill-item" key={name}>
            <div className="skill-item__logo">
              <Logo />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
