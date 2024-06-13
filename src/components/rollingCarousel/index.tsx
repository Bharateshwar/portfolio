import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";
import gsap from "gsap/dist/gsap";
import cx from "classnames";

import LayoutCircle from "components/svg/layoutCircle";
import "styles/rolling-carousel.scss";
import {
  CAROUSEL_ITEM_CLASS,
  CAROUSEL_ITEM_SELECTOR,
  CAROUSEL_ITEM_CONTENT_CLASS,
  CAROUSEL_ITEM_CONTENT_SELECTOR,
  CIRCLE_PATH_ID,
  CIRCLE_PATH_SELECTOR,
  CIRCLE_SVG_ID,
  CIRCLE_SVG_SELECTOR,
  INITIAL_ANIMATION_ID,
  SCRUBBED_ROLLING_ANIMATION_ID,
  SCRUB_ANIMATION_TRIGGER_ID,
  CAROUSEL_ANCHOR_CLASS,
  CAROUSEL_ANCHOR_SELECTOR,
  carouselItems,
  CarouselItem,
  CarouselItemGraphic,
} from "./constants";

if (typeof document !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin, useGSAP, ScrollTrigger, Flip);
}

const itemsCount = carouselItems.length;

function RollingCaoursel({ alignment = "left" }: Props) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(-1);

  useGSAP(
    () => {
      // Get elements
      const carouselItems = gsap.utils.toArray(
        CAROUSEL_ITEM_SELECTOR
      ) as HTMLDivElement[];
      const carouselContentElements = gsap.utils.toArray(
        CAROUSEL_ITEM_CONTENT_SELECTOR
      ) as HTMLDivElement[];

      // Fade items into view
      gsap.to(carouselItems, { opacity: 1 });

      // Animate items along svg path
      createRollingAnimation(carouselItems, true);

      // Main carousel scroll scrubbed animation trigger
      ScrollTrigger.create({
        trigger: mainContainerRef.current,
        start: "top 10%",
        end: "+=2000",
        onEnter: () =>
          startScrubbedAnimation(carouselItems, carouselContentElements),
        onLeaveBack: startInitialAnimation,
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

  const startScrubbedAnimation = (
    carouselItems: HTMLDivElement[],
    carouselContentElements: HTMLDivElement[]
  ) => {
    const initialAnimation = gsap.getById(INITIAL_ANIMATION_ID);

    // Pause initial animation & rotate path to avoid items jumping to (visual) start
    initialAnimation.pause();
    gsap.set(CIRCLE_SVG_SELECTOR, {
      rotate: initialAnimation.progress() * 360,
    });

    // @TODO: Move animation and onUpdate to the main scroll trigger
    ScrollTrigger.create({
      id: SCRUB_ANIMATION_TRIGGER_ID,
      trigger: mainContainerRef.current,
      start: "top 10%",
      end: "+=2000",
      pin: true,
      scrub: true,
      animation: createRollingAnimation(carouselItems),
      onUpdate: (self) =>
        onScrubAnimationUpdate(self, carouselItems, carouselContentElements),
    });
  };

  const onScrubAnimationUpdate = (
    { progress }: ScrollTrigger,
    carouselItems: HTMLDivElement[],
    carouselContentElements: HTMLDivElement[]
  ) => {
    const roundedProgress = Math.round(progress * 100);
    const range = 100 / itemsCount;

    const activeItemIndex = Math.min(
      Math.floor(roundedProgress / range),
      itemsCount - 1
    );

    if (activeIndexRef.current === activeItemIndex) {
      return;
    }

    // reset last active
    if (activeIndexRef.current !== -1) {
      flipItem(
        carouselItems[activeIndexRef.current],
        carouselContentElements[activeIndexRef.current]
      );
    }

    // flip current active to anchor
    activeIndexRef.current = activeItemIndex;
    flipItem(
      carouselItems[activeItemIndex] as HTMLDivElement,
      carouselContentElements[activeItemIndex] as HTMLDivElement
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
      const state = Flip.getState(itemCotnentElement);
      (itemCotnentElement.parentNode === anchorElement
        ? activeItem
        : anchorElement
      ).appendChild(itemCotnentElement);

      Flip.from(state, {
        duration: 0.5,
        scale: true,
        ease: "power1.inOut",
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
            duration: 10,
            repeat: -1,
            id: INITIAL_ANIMATION_ID,
          }
        : { id: SCRUBBED_ROLLING_ANIMATION_ID }),
      ease: "none",
      runBackwards: alignment === "left",
    });
  };

  const renderGraphic = (graphics: CarouselItemGraphic[]) => {
    return graphics.map(({ imgSrc, altText }, index) => {
      return (
        <div
          className={cx(
            "rolling-carousel__layout__item-container",
            // Avoiding word numbered class to differentitate b/w layout and graphic modifiers
            `graphic-${index}`
          )}
          key={index}
        >
          <img src={imgSrc} alt={altText} />
        </div>
      );
    });
  };

  const renderItemContent = ({ graphics }: CarouselItem) => {
    const graphicsLength = graphics.length;

    return (
      <div
        className={cx("rolling-carousel__layout", {
          "rolling-carousel__layout--one": graphicsLength === 1,
          "rolling-carousel__layout--two": graphicsLength === 2,
          "rolling-carousel__layout--three": graphicsLength === 3,
          "rolling-carousel__layout--four": graphicsLength >= 4,
        })}
      >
        {renderGraphic(graphics)}
      </div>
    );
  };

  const renderCarouselItems = () => {
    return carouselItems?.map((data, index) => {
      return (
        <div className={CAROUSEL_ITEM_CLASS} key={index}>
          <div className={`${CAROUSEL_ITEM_CONTENT_CLASS}`}>
            {renderItemContent(data)}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div
        ref={mainContainerRef}
        className={cx("rolling-carousel", {
          "rolling-carousel--left": alignment === "left",
          "rolling-carousel--right": alignment === "right",
        })}
      >
        <LayoutCircle id={CIRCLE_SVG_ID} pathId={CIRCLE_PATH_ID} />
        <div className={CAROUSEL_ANCHOR_CLASS}></div>
        {renderCarouselItems()}
      </div>
    </div>
  );
}

interface Props {
  alignment?: "left" | "right";
}

export default RollingCaoursel;
