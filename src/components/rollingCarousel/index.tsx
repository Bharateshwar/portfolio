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
      const carouselItemElements: gsap.TweenTarget[] = gsap.utils.toArray(
        ".rolling-carousel__item"
      );

      // Reposition items to align to their centers
      gsap.set(carouselItemElements, {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
      });

      // Fade items into view
      gsap.to(carouselItemElements, { opacity: 1 });

      // Animate items along svg path
      carouselItemElements.forEach((item, index) => {
        gsap.to(item, {
          motionPath: {
            path: "#layout-circle-path",
            align: "#layout-circle-path",
            start: index * itemsPlacementGap + (alignment === "left" ? 1 : 0),
            end: index * itemsPlacementGap + (alignment === "left" ? 0 : 1),
          },
          duration: 10,
          repeat: -1,
          ease: "none",
        });
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
