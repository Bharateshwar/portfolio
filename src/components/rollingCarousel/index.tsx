import { useGSAP } from '@gsap/react';
import cx from 'classnames';
import { Flip } from 'gsap/dist/Flip';
import gsap from 'gsap/dist/gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';

import LayoutCircle from 'components/svg/layoutCircle';

import 'styles/rolling-carousel.scss';
import {
  CAROUSEL_ANCHOR_CLASS,
  CAROUSEL_ANCHOR_SELECTOR,
  CAROUSEL_GRAPHIC_CLASS,
  CAROUSEL_GRAPHIC_ITEM_CLASS,
  CAROUSEL_GRAPHIC_ITEM_SELECTOR,
  CAROUSEL_GRAPHIC_SELECTOR,
  CAROUSEL_ITEM_CLASS,
  CAROUSEL_ITEM_LAYOUT_CLASS,
  CAROUSEL_ITEM_LAYOUT_SELECTOR,
  CAROUSEL_ITEM_SELECTOR,
  CarouselItemGraphic,
  carouselItems,
  CIRCLE_PATH_ID,
  CIRCLE_PATH_SELECTOR,
  CIRCLE_SVG_ID,
  INITIAL_ANIMATION_ID,
  ROLLING_CAROUSEL_CLASS,
  ROLLING_CAROUSEL_SELECTOR,
  SLIDES_ITEM_CONTENT_CLASS,
  SLIDES_ITEM_CONTENT_SELECTOR,
} from './constants';

if (typeof document !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin, useGSAP, ScrollTrigger, Flip);
}

const itemsCount = carouselItems.length;

function RollingCaoursel({ alignment = 'left' }: Props) {
  // ✅ Use mainContainerRef instead of classname with gsap to preserve current instance context
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(-1);

  // Init gsap aniamtions
  useGSAP(
    () => {
      // Get elements
      const carouselItems = gsap.utils.toArray(
        CAROUSEL_ITEM_SELECTOR,
      ) as HTMLDivElement[];

      initRollingCarouselAnimation(carouselItems);
      initSlidesAnimation(carouselItems);
    },
    { scope: mainContainerRef },
  );

  const initRollingCarouselAnimation = (carouselItems: HTMLDivElement[]) => {
    // @TODO: Remove commented code non scrubbed rolling animation is finalized
    // const wrap = gsap.utils.wrap(0, 1);
    // Animate items along svg path
    // const rollingAnimation =
    // @TODO: Pause animation if out of view
    createRollingAnimation(carouselItems);

    // Fade items into view
    gsap.to(carouselItems, { opacity: 1 });

    // Main carousel scroll scrubbed animation trigger
    ScrollTrigger.create({
      trigger: ROLLING_CAROUSEL_SELECTOR,
      // @TODO: Make circle & slides pin when at center, there are alignment issues coz of 10% & padding bottom at slide items
      start: 'center center',
      end: () => getScrollTriggerEnd(),
      pin: true,
      scrub: true,
      anticipatePin: 0.2,
      // Pause rolling animation onEnter
      // onEnter(self: ScrollTriggerWithOffset) {
      //   self.offset = rollingAnimation.progress();
      //   // Add self.progress to make sure rollingAnimation progress is synced with scroll trigger and then paused
      //   rollingAnimation.progress(self.offset + self.progress).pause();
      // },
      // // Update rolling animation progress on scroll
      // onUpdate(self: ScrollTriggerWithOffset) {
      //   self.offset &&
      //     rollingAnimation.progress(wrap(self.offset + self.progress));
      // },
      // // Resume rolling animation onLeaveBack
      // onLeaveBack(self: ScrollTriggerWithOffset) {
      //   self.offset = undefined;
      //   rollingAnimation.play();
      // },
    });
  };

  const initSlidesAnimation = (carouselItems: HTMLDivElement[]) => {
    const SLIDE_Y_OFFSET = 305;
    // Get elements
    const defaultProperties = { ease: 'power2.inOut', duration: 0.5 };
    const rollingLayoutElements = gsap.utils.toArray(
      CAROUSEL_ITEM_LAYOUT_SELECTOR,
    ) as HTMLDivElement[];
    const slides: HTMLDivElement[] = gsap.utils.toArray(
      SLIDES_ITEM_CONTENT_SELECTOR,
    );

    // Set first slide to visible
    gsap.set(slides[0], { opacity: 1 });

    // Handle slide and  carousel item transitions on scroll
    // Note: Animation to -2 opacity to double the time it takes to animate
    slides.forEach((slide, index) => {
      ScrollTrigger.create({
        trigger: slide.parentNode as HTMLDivElement,
        start: 'center center',
        end: () => getScrollTriggerEnd(true),
        pin: true,
        pinSpacing: false,
        scrub: true,
        anticipatePin: index === 0 ? 0.4 : undefined,
        onEnter() {
          onSlideChange(index, carouselItems, rollingLayoutElements);

          // First slide is already visible, so don't animate it
          if (index === 0) return;

          gsap.fromTo(
            slide,
            { opacity: -2, yPercent: SLIDE_Y_OFFSET },
            { opacity: 1, yPercent: 0, ...defaultProperties },
          );
        },
        onLeave() {
          // Last slide needs to stay visible, so don't animate it onLeave
          if (index === itemsCount - 1) return;

          onSlideChange(index + 1, carouselItems, rollingLayoutElements);
          gsap.fromTo(
            slide,
            { opacity: 1, yPercent: 0 },
            { opacity: -2, yPercent: -SLIDE_Y_OFFSET, ...defaultProperties },
          );
        },
        onEnterBack() {
          // Last slide is already visible, so don't animate it onEnterBack
          if (index === itemsCount - 1) return;

          onSlideChange(index, carouselItems, rollingLayoutElements);
          gsap.fromTo(
            slide,
            { opacity: -2, yPercent: -SLIDE_Y_OFFSET },
            { opacity: 1, yPercent: 0, ...defaultProperties },
          );
        },
        onLeaveBack() {
          // First slide and carousel item need to stay visible, so don't animate them onLeaveBack
          if (index === 0) return;

          onSlideChange(index - 1, carouselItems, rollingLayoutElements);
          gsap.fromTo(
            slide,
            { opacity: 1, yPercent: 0 },
            { opacity: -2, yPercent: SLIDE_Y_OFFSET, ...defaultProperties },
          );
        },
        // Move slide.parentNode slightly to subtle scroll movement
        animation: gsap.to(slide.parentNode, { yPercent: -10, ease: 'none' }),
      });
    });
  };

  const getScrollTriggerEnd = (getForSingleItem = false) => {
    const perElementHeight = Math.max(window.innerHeight, 500);

    return `+=${perElementHeight * (getForSingleItem ? 1 : itemsCount)}`;
  };

  const onSlideChange = (
    newActiveItemIndex: number,
    carouselItems: HTMLDivElement[],
    itemContentElements: HTMLDivElement[],
  ) => {
    if (
      activeIndexRef.current === newActiveItemIndex ||
      newActiveItemIndex === itemsCount
    ) {
      return;
    }

    // flip last active to original parent
    if (activeIndexRef.current !== -1) {
      flipItem(
        carouselItems[activeIndexRef.current],
        itemContentElements[activeIndexRef.current],
      );
    }

    // flip current active to anchor
    activeIndexRef.current = newActiveItemIndex;
    flipItem(
      carouselItems[newActiveItemIndex] as HTMLDivElement,
      itemContentElements[newActiveItemIndex] as HTMLDivElement,
    );
  };

  const flipItem = (
    activeItem: HTMLDivElement,
    itemCotnentElement: HTMLDivElement,
  ) => {
    if (!activeItem) return;

    const anchorElement = document.querySelector(
      CAROUSEL_ANCHOR_SELECTOR,
    ) as HTMLDivElement;

    if (itemCotnentElement) {
      const childElements = itemCotnentElement.querySelectorAll(
        `${CAROUSEL_GRAPHIC_SELECTOR}, ${CAROUSEL_GRAPHIC_ITEM_SELECTOR}`,
      );

      // Get current state
      const state = Flip.getState([itemCotnentElement, ...childElements], {
        props: 'opacity, borderColor',
      });

      // Switch parent
      (itemCotnentElement.parentNode === anchorElement
        ? activeItem
        : anchorElement
      ).appendChild(itemCotnentElement);

      // Flip parent switch
      Flip.from(state, {
        duration: 0.5,
        scale: true,
        ease: 'power1.inOut',
        onStart() {
          activeItem.style.zIndex = '1';
        },
        onComplete() {
          activeItem.style.zIndex = '';
        },
      });
    }
  };

  const createRollingAnimation = (items: HTMLDivElement[]) => {
    const itemsPlacementGap = 1 / itemsCount;

    return gsap.to(items, {
      // @ts-expect-error: Wrong gsap type defs
      motionPath: {
        path: CIRCLE_PATH_SELECTOR,
        align: CIRCLE_PATH_SELECTOR,
        start: (index: number) => index * itemsPlacementGap,
        end: (index: number) => index * itemsPlacementGap + 1,
      },
      duration: 50,
      repeat: -1,
      id: INITIAL_ANIMATION_ID,
      ease: 'none',
      runBackwards: alignment === 'left',
    });
  };

  const renderGraphics = (graphics: CarouselItemGraphic[]) => {
    return graphics.map(({ imgSrc, altText }, index) => {
      return (
        <div
          className={cx(
            CAROUSEL_GRAPHIC_CLASS,
            // Avoiding word numbered class to differentitate b/w layout and graphic modifiers
            `${CAROUSEL_GRAPHIC_CLASS}--${index}`,
          )}
          key={index}
        >
          <img
            src={imgSrc}
            alt={altText}
            className={CAROUSEL_GRAPHIC_ITEM_CLASS}
          />
        </div>
      );
    });
  };

  const renderCarouselItems = () => {
    return carouselItems?.map(({ graphics }, index) => {
      const graphicsLength = graphics.length;
      return (
        <div className={CAROUSEL_ITEM_CLASS} key={index}>
          <div
            className={cx(CAROUSEL_ITEM_LAYOUT_CLASS, {
              [`${CAROUSEL_ITEM_LAYOUT_CLASS}--one`]: graphicsLength === 1,
              [`${CAROUSEL_ITEM_LAYOUT_CLASS}--two`]: graphicsLength === 2,
              [`${CAROUSEL_ITEM_LAYOUT_CLASS}--three`]: graphicsLength === 3,
              [`${CAROUSEL_ITEM_LAYOUT_CLASS}--four`]: graphicsLength >= 4,
            })}
          >
            {renderGraphics(graphics)}
          </div>
        </div>
      );
    });
  };

  return (
    <section className="rolling-carousel-container" ref={mainContainerRef}>
      <div
        className={cx(ROLLING_CAROUSEL_CLASS, {
          [`${ROLLING_CAROUSEL_CLASS}--left`]: alignment === 'left',
          [`${ROLLING_CAROUSEL_CLASS}--right`]: alignment === 'right',
        })}
      >
        <LayoutCircle id={CIRCLE_SVG_ID} pathId={CIRCLE_PATH_ID} />
        <div className={CAROUSEL_ANCHOR_CLASS}></div>
        {renderCarouselItems()}
      </div>
      <div className="slides">
        {carouselItems.map(({ title, description }, index) => (
          <div className="slides__item" key={index}>
            <div className={SLIDES_ITEM_CONTENT_CLASS}>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// type ScrollTriggerWithOffset = ScrollTrigger & { offset?: number };

interface Props {
  alignment?: 'left' | 'right';
}

export default RollingCaoursel;
