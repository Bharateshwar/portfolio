import { useGSAP } from '@gsap/react';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { ReactNode, useRef } from 'react';

import 'styles/background-break-container.scss';

function BackgroundBreakContainer({ children }: { children: ReactNode }) {
  const mainContainerRef = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: mainContainerRef.current,
        start: 'bottom bottom',
        end: 'bottom center',
        scrub: true,
        animation: gsap.to(mainContainerRef.current, { width: '94vw' }),
      });
    },
    { scope: mainContainerRef },
  );

  return (
    <div className="background-break-container" ref={mainContainerRef}>
      {children}
    </div>
  );
}

export default BackgroundBreakContainer;
