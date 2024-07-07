import type { MetaFunction } from '@remix-run/node';

import Container from 'components/container';
import Hero from 'components/hero';
import RollingCaoursel from 'components/rollingCarousel';
import Skills from 'components/skills';
import WorkLocations from 'components/workLocations';

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
      <WorkLocations />
    </>
  );
}
