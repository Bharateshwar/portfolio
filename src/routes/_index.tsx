import type { MetaFunction } from '@remix-run/node';

import BackgroundBreakContainer from 'components/BackgroundBreakContainer';
import Container from 'components/container';
import Hero from 'components/hero';
import RollingCaoursel from 'components/rollingCarousel';
import Skills from 'components/skills';
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
      <Container variant="secondary" fullWidth>
        <BackgroundBreakContainer>
          <WorkSectors />
        </BackgroundBreakContainer>
      </Container>
    </>
  );
}
