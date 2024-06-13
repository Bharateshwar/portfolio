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

// @TODO: Move to props
export type CarouselItemGraphic = {
  imgSrc: string;
  altText?: string;
};

export type CarouselItem = {
  title: string;
  graphics: [CarouselItemGraphic, ...CarouselItemGraphic[]];
};

export const carouselItems: CarouselItem[] = [
  {
    title: "A",
    graphics: [
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
    ],
  },
  {
    title: "D",
    graphics: [{ imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" }],
  },
  {
    title: "B",
    graphics: [
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
    ],
  },
  {
    title: "C",
    graphics: [{ imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" }],
  },
  {
    title: "E",
    graphics: [
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
      { imgSrc: "/images/placeholder.jpeg", altText: "Item grahic" },
    ],
  },
];
