import type { MetaFunction } from '@remix-run/node';

import Container from 'components/container';
import Hero from 'components/hero';
import RollingCaoursel from 'components/rollingCarousel';
import Skills from 'components/skills';
import Testimonials from 'components/testimonials';
import Work from 'components/work';
import WorkSectors from 'components/workSectors';

export const meta: MetaFunction = () => {
  return [
    { title: "Bharateshwar's Portfolio Website" },
    {
      name: 'description',
      content: "Welcome to Bharateshwar's portfolio website!",
    },
  ];
};

export default function Index() {
  return (
    <>
      <Container>
        <Hero />
        <RollingCaoursel />
        <Skills />
      </Container>
      <Work />
      <Container>
        <Testimonials />
      </Container>
      {/* @TODO: Implement background break */}
      {/* <Container variant="secondary" fullWidth>
        <BackgroundBreakContainer> */}
      {/* @TODO Check if the container in worksectors is required */}
      <WorkSectors />
      {/* </BackgroundBreakContainer>
      </Container> */}
    </>
  );
}
