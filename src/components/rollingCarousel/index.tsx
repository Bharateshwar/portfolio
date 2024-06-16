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
  SLIDES_ITEM_CONTENT_SELECTOR,
  SLIDES_ITEM_CONTENT_CLASS,
} from "./constants";

if (typeof document !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin, useGSAP, ScrollTrigger, Flip);
}

const itemsCount = carouselItems.length;

function RollingCaoursel({ alignment = "left" }: Props) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(-1);

  useGSAP(
    () => {
      // Get elements
      const carouselItems = gsap.utils.toArray(
        CAROUSEL_ITEM_SELECTOR
      ) as HTMLDivElement[];
      const itemContentElements = gsap.utils.toArray(
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
        end: () => getScrollTriggerEnd(),
        pin: true,
        onEnter: () =>
          startScrubbedAnimation(carouselItems, itemContentElements),
        onLeaveBack: startInitialAnimation,
      });
    },
    { scope: mainContainerRef }
  );

  useGSAP(
    () => {
      const defaultProperties = { ease: "power2.inOut", duration: 0.5 };
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
            if (index === 0) return;

            gsap.fromTo(
              slide,
              { opacity: -2, yPercent: 305 },
              { opacity: 1, yPercent: 0, ...defaultProperties }
            );
          },
          onLeave() {
            gsap.fromTo(
              slide,
              { opacity: 1, yPercent: 0 },
              { opacity: -2, yPercent: -305, ...defaultProperties }
            );
          },
          onEnterBack() {
            gsap.fromTo(
              slide,
              { opacity: -2, yPercent: -305 },
              { opacity: 1, yPercent: 0, ...defaultProperties }
            );
          },
          onLeaveBack() {
            if (index === 0) return;

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
    { scope: slidesContainerRef }
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
    itemContentElements: HTMLDivElement[]
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
      end: () => getScrollTriggerEnd(),
      // @TODO: Look into delayed scrubbing
      scrub: true,
      animation: createRollingAnimation(carouselItems),
      onUpdate: (self) =>
        onScrubAnimationUpdate(self, carouselItems, itemContentElements),
    });
  };

  const getScrollTriggerEnd = (getForSingle = false) => {
    const perElementHeight = Math.max(window.innerHeight, 500);

    return `+=${perElementHeight * (getForSingle ? 1 : carouselItems.length)}`;
  };

  const onScrubAnimationUpdate = (
    { progress }: ScrollTrigger,
    carouselItems: HTMLDivElement[],
    itemContentElements: HTMLDivElement[]
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
        itemContentElements[activeIndexRef.current]
      );
    }

    // flip current active to anchor
    activeIndexRef.current = activeItemIndex;
    flipItem(
      carouselItems[activeItemIndex] as HTMLDivElement,
      itemContentElements[activeItemIndex] as HTMLDivElement
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
        ".graphic, .graphic > img"
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
            "rolling-carousel__layout__item-container graphic",
            // Avoiding word numbered class to differentitate b/w layout and graphic modifiers
            `graphic--${index}`
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
    <div className="rolling-carousel-container">
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
