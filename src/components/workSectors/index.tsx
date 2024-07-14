import { useGSAP } from '@gsap/react';
import gsap from 'gsap/dist/gsap';
import { useRef } from 'react';

import Container from 'components/container';

import 'styles/work-sectors.scss';
import { SECTORS } from './constants';

function WorkSectors() {
  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const scaleMinValue = 0.85;
      const sectorsContainerElements: HTMLDivElement[] = gsap.utils.toArray(
        '.work-sectors-container',
      );

      sectorsContainerElements.forEach((sectorsContainerElement, index) => {
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectorsContainerElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        mainTl.fromTo(
          sectorsContainerElement,
          { scale: scaleMinValue },
          { scale: 1 },
        );

        if (index !== sectorsContainerElements.length - 1) {
          mainTl.to(sectorsContainerElement, { scale: scaleMinValue });
        }
      });
    },
    { scope: mainContainerRef },
  );

  return (
    <Container variant="gradient" isSection ref={mainContainerRef}>
      {SECTORS.map(({ heading, sectors }, index) => (
        <div className="work-sectors-container" key={index}>
          <h2 className="h2-large">
            {heading.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </h2>
          <div className="work-sectors">
            {sectors.map(({ name, flag: Flag }) => (
              <div key={name} className="work-sectors__sector">
                {/* @TODO: Explore styled text instead of normal text */}
                <p>{name}</p>
                {Flag && <Flag />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
}

export default WorkSectors;
