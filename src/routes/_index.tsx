import { createCookie, json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import BackgroundBreakContainer from 'components/BackgroundBreakContainer';
import Container from 'components/container';
import Hero from 'components/hero';
import RollingCaoursel from 'components/rollingCarousel';
import Skills from 'components/skills';
import Testimonials from 'components/testimonials';
import Work from 'components/work';
import WorkSectors from 'components/workSectors';
import getGrowthbookInstance, { GB_FEATURES } from 'growthbook';

export const meta: MetaFunction = () => {
  return [
    { title: "Bharateshwar's Portfolio Website" },
    {
      name: 'description',
      content: "Welcome to Bharateshwar's portfolio website!",
    },
  ];
};

const userIdCookie = createCookie('user-id');

export const loader = async ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get('Cookie');
  let userId = await userIdCookie.parse(cookieHeader);
  const isNewVisiter = userId === null;

  if (isNewVisiter) {
    // Dont need a robust ID generation as it's just for A/B testing
    userId = Date.now();
  }

  const growthbook = await getGrowthbookInstance({
    id: userId,
  });

  return json(
    {
      showContainedTestimonials: growthbook.isOn(
        GB_FEATURES.CONTAINED_TESTIMONIALS,
      ),
    },
    // Set userId cookie for new visiters
    isNewVisiter
      ? {
          headers: {
            'Set-Cookie': await userIdCookie.serialize(userId),
          },
        }
      : undefined,
  );
};

export default function Index() {
  const { showContainedTestimonials } = useLoaderData<typeof loader>();

  return (
    <>
      <Container>
        <Hero />
        <RollingCaoursel />
        <Skills />
      </Container>
      <Work />
      <Container fullWidth={!showContainedTestimonials}>
        <Testimonials />
      </Container>
      <Container variant="secondary" fullWidth>
        <BackgroundBreakContainer>
          <WorkSectors />
        </BackgroundBreakContainer>
      </Container>
    </>
  );
}
