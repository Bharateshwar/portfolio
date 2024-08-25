import { GrowthBook } from '@growthbook/growthbook';

export const GB_FEATURES = {
  // @TODO: Add analytics for time spent on different variations of the testimonial section
  CONTAINED_TESTIMONIALS: 'contained_testimonials',
};

const getGrowthbookInstance = async ({ id }: { id: string }) => {
  const growthbook = new GrowthBook({
    apiHost: 'https://cdn.growthbook.io',
    clientKey: process.env.GB_CLIENT_KEY,
    enableDevMode: true,
    attributes: {
      id,
    },
    trackingCallback: (experiment, result) => {
      // TODO: Use your real analytics tracking system
      console.log('Viewed Experiment', {
        experimentId: experiment.key,
        variationId: result.key,
      });
    },
  });

  // Wait for features to be available
  await growthbook.init();

  return growthbook;
};

export default getGrowthbookInstance;
