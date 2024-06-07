import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap/dist/gsap";
import cx from "classnames";

import LayoutCircle from "components/svg/layoutCircle";
import "styles/rolling-carousel.scss";
import {
  CAROUSEL_ITEM_CLASS,
  CAROUSEL_ITEM_SELECTOR,
  CIRCLE_PATH_ID,
  CIRCLE_PATH_SELECTOR,
  CIRCLE_SVG_ID,
  CIRCLE_SVG_SELECTOR,
  INITIAL_ANIMATION_ID,
  SCRUB_ANIMATION_TRIGGER_ID,
} from "./constants";

if (typeof document !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin, useGSAP, ScrollTrigger);
}

// @TODO: Move to props
const carouselItems = [{ title: "" }, { title: "" }, { title: "" }];
const itemsPlacementGap = 1 / carouselItems.length;

function RollingCaoursel({ alignment = "left" }: Props) {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reposition items to align to their centers
      gsap.set(CAROUSEL_ITEM_SELECTOR, {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      });

      // Fade items into view
      gsap.to(CAROUSEL_ITEM_SELECTOR, { opacity: 1 });

      // Animate items along svg path
      createRollingAnimation(true);

      ScrollTrigger.create({
        trigger: mainContainerRef.current,
        start: "top 10%",
        end: "+=2000",
        onEnter: startScrubAnimation,
        onLeaveBack: startInitialAnimation,
      });
    },
    { scope: mainContainerRef }
  );

  const startInitialAnimation = () => {
    gsap.set(CIRCLE_SVG_SELECTOR, {
      rotate: 0,
    });
    gsap.getById(INITIAL_ANIMATION_ID).play();
    ScrollTrigger.getById(SCRUB_ANIMATION_TRIGGER_ID)?.kill(true);
  };

  const startScrubAnimation = () => {
    const initialAnimation = gsap.getById(INITIAL_ANIMATION_ID);

    initialAnimation.pause();

    const tl = gsap.timeline();

    gsap.utils.toArray(CAROUSEL_ITEM_SELECTOR).forEach((item, index) => {
      // @ts-expect-error: Wrong gsap type defs
      tl.to(
        item as gsap.DOMTarget,
        {
          duration: 3,
          motionPath: {
            path: CIRCLE_PATH_SELECTOR,
            align: CIRCLE_PATH_SELECTOR,
            start: () => {
              const initialPostion = index * itemsPlacementGap;

              return initialAnimation.progress() + initialPostion;
            },
            end: () => {
              return (
                1 / carouselItems.length +
                initialAnimation.progress() +
                index * itemsPlacementGap
              );
            },
          },
          ease: "none",
          // runBackwards: alignment === "left",
        },
        "0"
      );
      tl.to(
        item as gsap.DOMTarget,
        {
          scale: 5,
        },
        `${index * (tl.duration() / carouselItems.length)}`
      );

      tl.to(
        item as gsap.DOMTarget,
        {
          scale: 1,
        },
        ">"
      );
      tl.addLabel(`anim-${index}`);
    });

    ScrollTrigger.create({
      id: SCRUB_ANIMATION_TRIGGER_ID,
      trigger: mainContainerRef.current,
      start: "top 10%",
      end: "+=2000",
      pin: true,
      scrub: true,
      animation: tl,
    });
  };

  const createRollingAnimation = (withRepeat = false) => {
    return gsap.to(CAROUSEL_ITEM_SELECTOR, {
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
        : {}),
      ease: "none",
      // runBackwards: alignment === "left",
    });
  };

  const renderCarouselItems = () => {
    return carouselItems?.map(({ title }, index) => {
      return (
        <div className={CAROUSEL_ITEM_CLASS} key={index}>
          <h2>{index}</h2>
          <div className={`${CAROUSEL_ITEM_CLASS}__inner-container`}>
            <h2>{title}</h2>
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
        {renderCarouselItems()}
      </div>
    </div>
  );
}

interface Props {
  alignment?: "left" | "right";
}

export default RollingCaoursel;
