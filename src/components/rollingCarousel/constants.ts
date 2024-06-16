export const INITIAL_ANIMATION_ID = "intial-rolling-animation";
export const SCRUBBED_ROLLING_ANIMATION_ID = "scrubbed-rolling-animation";
export const CIRCLE_SVG_ID = "layout-circle-svg";
export const CIRCLE_SVG_SELECTOR = `#${CIRCLE_SVG_ID}`;

export const CIRCLE_PATH_ID = "layout-circle-path";
export const CIRCLE_PATH_SELECTOR = `#${CIRCLE_PATH_ID}`;

export const ROLLING_CAROUSEL_CLASS = "rolling-carousel";
export const CAROUSEL_ITEM_CLASS = `${ROLLING_CAROUSEL_CLASS}__item`;
export const CAROUSEL_ITEM_SELECTOR = `.${CAROUSEL_ITEM_CLASS}`;

export const CAROUSEL_ITEM_CONTENT_CLASS = `${CAROUSEL_ITEM_CLASS}__content`;
export const CAROUSEL_ITEM_CONTENT_SELECTOR = `.${CAROUSEL_ITEM_CONTENT_CLASS}`;

export const CAROUSEL_ANCHOR_CLASS = `${ROLLING_CAROUSEL_CLASS}__anchor`;
export const CAROUSEL_ANCHOR_SELECTOR = `.${CAROUSEL_ANCHOR_CLASS}`;

export const SCRUB_ANIMATION_TRIGGER_ID = "scrub-trigger";

export const SLIDES_ITEM_CONTENT_CLASS = "slides__item__content";
export const SLIDES_ITEM_CONTENT_SELECTOR = `.${SLIDES_ITEM_CONTENT_CLASS}`;

// @TODO: Move to props
export type CarouselItemGraphic = {
  imgSrc: string;
  altText?: string;
};

export type CarouselItem = {
  title: string;
  description: string;
  graphics: [CarouselItemGraphic, ...CarouselItemGraphic[]];
};

export const carouselItems: CarouselItem[] = [
  {
    title: "Static, Dynamic, SSR, PWA - You Name It, I Build It",
    description:
      "I craft web experiences that span the full spectrum, from streamlined static sites to dynamic SPAs, performance-driven SSRs, and app-like PWAs, creating digital solutions that exceed expectations.",
    graphics: [
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
    ],
  },
  {
    title: "Art and Science of designs, delivered with Precision and Flair",
    description:
      "I empower designers to dream big, bringing their most creative visions to life. With expertise in dynamic animations, advanced styling, and intricate layouts, I build pixel-perfect responsive websites that are visually stunning, technically sound, and seamlessly adaptable to any screen.",

    graphics: [{ imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" }],
  },
  {
    title: "Fast, Accessible, Optimized, and Compatible",
    description:
      "Performance, accessibility, SEO, compatibility – they're not just buzzwords; they're the promises I deliver on. I engineer websites with meticulous attention to detail, ensuring every element is optimized for speed, accessibility, discoverability, and a seamless experience across all browsers and devices.",

    graphics: [
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
    ],
  },
  {
    title: "Collaborating across Industries, Continents, and Time Zones",
    description:
      "I've honed my skills through diverse projects spanning multiple industries, time zones, and continents. I understand the nuances of effective communication and collaboration across diverse teams, ensuring seamless project delivery regardless of location or background.",

    graphics: [{ imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" }],
  },
  {
    title: "Beyond Code: It's a Mindset of Constant Learning and Growth",
    description:
      "I'm not just a front-end developer; I'm a problem solver, a creative thinker, and a lifelong learner. I embrace challenges with enthusiasm, adapt quickly to new technologies, and constantly strive to improve my craft while delivering innovative solutions that make a real impact.",
    graphics: [
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
    ],
  },
];
