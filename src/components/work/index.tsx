import { useGSAP } from '@gsap/react';
import cx from 'classnames';
import { formatDistance, parseISO } from 'date-fns';
import { gsap } from 'gsap/dist/gsap';
import { useRef, useState } from 'react';

import Container from 'components/container';
import 'styles/work.scss';

const WORK_HISTORY = [
  {
    employer: { name: 'Two Point One', location: 'New Hyde Park, New York' },
    designation: 'Senior Software Developer',
    period: { start: '2021-07-02' },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec ullamcorper lorem, et congue metus. Sed velit lorem, scelerisque sit amet nibh nec, maximus tincidunt neque. Nullam commodo porta imperdiet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec ullamcorper lorem.',
  },
  {
    employer: { name: 'Cognizant', location: 'Bengaluru' },
    designation: 'Full-stack Developer',
    period: { start: '2019-07-30', end: '2021-07-01' },
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec ullamcorper lorem, et congue metus. Sed velit lorem, scelerisque sit amet nibh nec, maximus tincidunt neque. Nullam commodo porta imperdiet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec ullamcorper lorem.',
  },
];

function Work() {
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const activeItemTlRef = useRef<GSAPTimeline | null>(null);

  useGSAP(
    () => {
      // Reverse previously played timeline
      if (activeItemTlRef.current) {
        activeItemTlRef.current.reverse();
        activeItemTlRef.current = null;
      }

      // No active needed if no index is active
      if (activeItemIndex === null) return;

      // Get elements to animate
      const items = gsap.utils.toArray(
        '.work-history__item__details-container',
      );
      const activeItem = items[activeItemIndex] as HTMLDivElement;
      const periodDetailsElement = activeItem.querySelector(
        '.work-history__item__period-details',
      ) as HTMLDivElement;
      const designationElement = activeItem.querySelector(
        '.work-history__item__designation',
      ) as HTMLParagraphElement;
      const descriptionElement = activeItem.querySelector(
        '.work-history__item__description',
      ) as HTMLParagraphElement;

      const newTl = gsap.timeline({
        defaults: { ease: 'power1.inOut', duration: 0.4 },
      });

      // animate elements
      newTl.to(periodDetailsElement, {
        marginLeft: -periodDetailsElement.offsetWidth,
      });
      newTl.to(
        designationElement,
        {
          x: designationElement.offsetWidth + (window.innerWidth / 100) * 3.5,
        },
        0,
      );
      newTl.to(descriptionElement, { right: 0 });

      // save new tl to ref
      activeItemTlRef.current = newTl;
    },
    {
      scope: mainContainerRef,
      dependencies: [activeItemIndex],
    },
  );

  const getItemClickHandler = (index: number) => () =>
    setActiveItemIndex((prevIndex) => (prevIndex === index ? null : index));

  const renderWorkHistoryItems = () => {
    return WORK_HISTORY.map(
      ({ period, employer, designation, description }, index) => {
        const startDate = parseISO(period.start);
        const endDate = parseISO(period.end || new Date().toISOString());
        const duration = formatDistance(startDate, endDate);

        const formattedPeriod = `${startDate.getFullYear()} - ${period.end ? endDate.getFullYear() : 'Present'}`;

        return (
          <button
            className={cx('work-history__item', {
              'work-history__item--active': activeItemIndex === index,
            })}
            key={index}
            onClick={getItemClickHandler(index)}
            type="button"
          >
            <Container className="work-history__item__details-container">
              <div className="work-history__item__period-details">
                <p className="body-extra-large">{formattedPeriod}</p>
                <p className="work-history__item__duration">{duration}</p>
              </div>
              <div>
                <p className="body-extra-large work-history__item__employer-name">
                  {employer.name}
                </p>
                <p>{employer.location}</p>
              </div>
              <p className="body-extra-large work-history__item__designation">
                {designation}
              </p>
              <p className="work-history__item__description">{description}</p>
            </Container>
          </button>
        );
      },
    );
  };

  return (
    <section ref={mainContainerRef}>
      <Container>
        <h2 className="h2-extra-large work-history-heading">Work</h2>
      </Container>
      <div className="work-history">{renderWorkHistoryItems()}</div>
    </section>
  );
}

export default Work;
