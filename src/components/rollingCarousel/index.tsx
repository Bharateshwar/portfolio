import { useGSAP } from "@gsap/react";
import cx from "classnames";
import { Flip } from "gsap/dist/Flip";
import gsap from "gsap/dist/gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

import LayoutCircle from "components/svg/layoutCircle";

import "styles/rolling-carousel.scss";
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
  CIRCLE_SVG_SELECTOR,
  INITIAL_ANIMATION_ID,
  ROLLING_CAROUSEL_CLASS,
  SCRUB_ANIMATION_TRIGGER_ID,
  SCRUBBED_ROLLING_ANIMATION_ID,
  SLIDES_ITEM_CONTENT_CLASS,
  SLIDES_ITEM_CONTENT_SELECTOR,
} from "./constants";

if (typeof document !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin, useGSAP, ScrollTrigger, Flip);
}

const itemsCount = carouselItems.length;

function RollingCaoursel({ alignment = "left" }: Props) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(-1);

  useGSAP(
    () => {
      // Get elements
      const carouselItems = gsap.utils.toArray(
        CAROUSEL_ITEM_SELECTOR
      ) as HTMLDivElement[];

      // Fade items into view
      gsap.to(carouselItems, { opacity: 1 });

      // Animate items along svg path
      createRollingAnimation(carouselItems, true);

      // Main carousel scroll scrubbed animation trigger
      ScrollTrigger.create({
        trigger: carouselContainerRef.current,
        start: "top 10%",
        end: () => getScrollTriggerEnd(),
        pin: true,
        onEnter: () => startScrubbedAnimation(carouselItems),
        onLeaveBack: startInitialAnimation,
      });
    },
    { scope: carouselContainerRef }
  );

  useGSAP(
    () => {
      const defaultProperties = { ease: "power2.inOut", duration: 0.5 };
      const carouselItems = gsap.utils.toArray(
        CAROUSEL_ITEM_SELECTOR
      ) as HTMLDivElement[];
      const itemContentElements = gsap.utils.toArray(
        CAROUSEL_ITEM_LAYOUT_SELECTOR
      ) as HTMLDivElement[];
      const slides: HTMLDivElement[] = gsap.utils.toArray(
        SLIDES_ITEM_CONTENT_SELECTOR
      );

      gsap.set(slides[0], { opacity: 1 });
      slides.forEach((slide, index) => {
        ScrollTrigger.create({
          trigger: slide.parentNode as HTMLDivElement,
          start: "top 10%",
          end: () => getScrollTriggerEnd(true),
          pin: true,
          pinSpacing: false,
          scrub: true,
          onEnter() {
            onSlideChange(index, carouselItems, itemContentElements);

            if (index === 0) return;

            gsap.fromTo(
              slide,
              { opacity: -2, yPercent: 305 },
              { opacity: 1, yPercent: 0, ...defaultProperties }
            );
          },
          onLeave() {
            if (index === carouselItems.length - 1) return;

            onSlideChange(index + 1, carouselItems, itemContentElements);
            gsap.fromTo(
              slide,
              { opacity: 1, yPercent: 0 },
              { opacity: -2, yPercent: -305, ...defaultProperties }
            );
          },
          onEnterBack() {
            if (index === carouselItems.length - 1) return;

            onSlideChange(index, carouselItems, itemContentElements);
            gsap.fromTo(
              slide,
              { opacity: -2, yPercent: -305 },
              { opacity: 1, yPercent: 0, ...defaultProperties }
            );
          },
          onLeaveBack() {
            if (index === 0) return;

            onSlideChange(index - 1, carouselItems, itemContentElements);
            gsap.fromTo(
              slide,
              { opacity: 1, yPercent: 0 },
              { opacity: -2, yPercent: 305, ...defaultProperties }
            );
          },
          animation: gsap.to(slide.parentNode, { yPercent: -10, ease: "none" }),
        });
      });
    },
    { scope: mainContainerRef }
  );

  const startInitialAnimation = () => {
    // @TODO: Handle scrubbed complete
    gsap.set(CIRCLE_SVG_SELECTOR, {
      rotate: 0,
    });
    gsap.getById(INITIAL_ANIMATION_ID).play();
    ScrollTrigger.getById(SCRUB_ANIMATION_TRIGGER_ID)?.kill(true);
  };

  const startScrubbedAnimation = (carouselItems: HTMLDivElement[]) => {
    const initialAnimation = gsap.getById(INITIAL_ANIMATION_ID);

    // Pause initial animation & rotate path to avoid items jumping to (visual) start
    initialAnimation.pause();
    gsap.set(CIRCLE_SVG_SELECTOR, {
      rotate: initialAnimation.progress() * 360,
    });

    // @TODO: Move animation and onUpdate to the main scroll trigger
    ScrollTrigger.create({
      id: SCRUB_ANIMATION_TRIGGER_ID,
      trigger: carouselContainerRef.current,
      start: "top 10%",
      end: () => getScrollTriggerEnd(),
      // @TODO: Look into delayed scrubbing
      scrub: true,
      animation: createRollingAnimation(carouselItems),
    });
  };

  const getScrollTriggerEnd = (getForSingle = false) => {
    const perElementHeight = Math.max(window.innerHeight, 500);

    return `+=${perElementHeight * (getForSingle ? 1 : carouselItems.length)}`;
  };

  const onSlideChange = (
    newActiveItemIndex: number,
    carouselItems: HTMLDivElement[],
    itemContentElements: HTMLDivElement[]
  ) => {
    if (
      activeIndexRef.current === newActiveItemIndex ||
      newActiveItemIndex === carouselItems.length
    ) {
      return;
    }

    // reset last active
    if (activeIndexRef.current !== -1) {
      flipItem(
        carouselItems[activeIndexRef.current],
        itemContentElements[activeIndexRef.current]
      );
    }

    // flip current active to anchor
    activeIndexRef.current = newActiveItemIndex;
    flipItem(
      carouselItems[newActiveItemIndex] as HTMLDivElement,
      itemContentElements[newActiveItemIndex] as HTMLDivElement
    );
  };

  const flipItem = (
    activeItem: HTMLDivElement,
    itemCotnentElement: HTMLDivElement
  ) => {
    if (!activeItem) return;

    const anchorElement = document.querySelector(
      CAROUSEL_ANCHOR_SELECTOR
    ) as HTMLDivElement;

    if (itemCotnentElement) {
      const childElements = itemCotnentElement.querySelectorAll(
        `${CAROUSEL_GRAPHIC_SELECTOR}, ${CAROUSEL_GRAPHIC_ITEM_SELECTOR}`
      );

      const state = Flip.getState([itemCotnentElement, ...childElements], {
        props: "opacity, borderColor",
      });
      (itemCotnentElement.parentNode === anchorElement
        ? activeItem
        : anchorElement
      ).appendChild(itemCotnentElement);

      Flip.from(state, {
        duration: 0.5,
        scale: true,
        ease: "power1.inOut",
        onStart() {
          activeItem.style.zIndex = "1";
        },
        onComplete() {
          activeItem.style.zIndex = "";
        },
      });
    }
  };

  const createRollingAnimation = (
    items: HTMLDivElement[],
    withRepeat = false
  ) => {
    const itemsPlacementGap = 1 / itemsCount;

    return gsap.to(items, {
      // @ts-expect-error: Wrong gsap type defs
      motionPath: {
        path: CIRCLE_PATH_SELECTOR,
        align: CIRCLE_PATH_SELECTOR,
        start: (index: number) => index * itemsPlacementGap,
        end: (index: number) => index * itemsPlacementGap + 1,
      },
      ...(withRepeat
        ? {
            duration: 40,
            repeat: -1,
            id: INITIAL_ANIMATION_ID,
          }
        : { id: SCRUBBED_ROLLING_ANIMATION_ID }),
      ease: "none",
      runBackwards: alignment === "left",
    });
  };

  const renderGraphics = (graphics: CarouselItemGraphic[]) => {
    return graphics.map(({ imgSrc, altText }, index) => {
      return (
        <div
          className={cx(
            CAROUSEL_GRAPHIC_CLASS,
            // Avoiding word numbered class to differentitate b/w layout and graphic modifiers
            `${CAROUSEL_GRAPHIC_CLASS}--${index}`
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
    <div className="rolling-carousel-container" ref={mainContainerRef}>
      <div
        ref={carouselContainerRef}
        className={cx(ROLLING_CAROUSEL_CLASS, {
          [`${ROLLING_CAROUSEL_CLASS}--left`]: alignment === "left",
          [`${ROLLING_CAROUSEL_CLASS}--right`]: alignment === "right",
        })}
      >
        <LayoutCircle id={CIRCLE_SVG_ID} pathId={CIRCLE_PATH_ID} />
        <div className={CAROUSEL_ANCHOR_CLASS}></div>
        {renderCarouselItems()}
      </div>
      <div className="slides" ref={slidesContainerRef}>
        {carouselItems.map(({ title, description }, index) => (
          <div className="slides__item" key={index}>
            <div className={SLIDES_ITEM_CONTENT_CLASS}>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  alignment?: "left" | "right";
}

export default RollingCaoursel;
