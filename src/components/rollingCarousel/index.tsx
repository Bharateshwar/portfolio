import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import gsap from "gsap/dist/gsap";

import LayoutCircle from "components/svg/layoutCircle";
import "styles/rolling-carousel.scss";

// @TODO: Move to props
const carouselItems = [{ title: "" }, { title: "" }, { title: "" }];

function RollingCaoursel({
  alignment = "left",
}: {
  alignment: "left" | "right";
}) {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // register gsap plugins
  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.registerPlugin(useGSAP);
  }, []);

  useGSAP(
    () => {
      const itemsPlacementGap = 1 / carouselItems.length;

      // Reposition items to align to their centers
      gsap.set(".rolling-carousel__item", {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      });

      // Fade items into view
      gsap.to(".rolling-carousel__item", { opacity: 1 });

      // Animate items along svg path

      gsap.to(".rolling-carousel__item", {
        // @ts-expect-error: Wrong gsap type defs
        motionPath: {
          path: "#layout-circle-path",
          align: "#layout-circle-path",
          start: (index: number) => index * itemsPlacementGap + 1,
          end: (index: number) => index * itemsPlacementGap,
        },
        duration: 10,
        repeat: -1,
        ease: "none",
        runBackwards: alignment === "right",
      });
    },
    { scope: mainContainerRef }
  );

  const renderCarouselItems = () => {
    return carouselItems?.map(({ title }, index) => {
      return (
        <div className="rolling-carousel__item" key={index}>
          <div className="rolling-carousel__item__inner-container">
            <h2>{title}</h2>
          </div>
        </div>
      );
    });
  };

  return (
    <div ref={mainContainerRef} className="rolling-carousel --left">
      <LayoutCircle />
      {renderCarouselItems()}
    </div>
  );
}

export default RollingCaoursel;
