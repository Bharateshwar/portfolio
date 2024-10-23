/**
 * Return a ScrollTrigger config object for controlling the play/pause behavior of a GSAP animation based on its visibility within the viewport.
 *
 * @param container - The element that will be used as the trigger for the ScrollTrigger.
 * @returns A ScrollTrigger config object.
 */
export const getAnimationToggleTrigger = (
  container: gsap.DOMTarget,
): ScrollTrigger.Vars => ({
  trigger: container,
  start: 'top bottom',
  end: 'bottom top',
  toggleActions: 'play pause play pause',
});
