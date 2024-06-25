import type { MetaFunction } from '@remix-run/node';

import Hero from 'components/hero';
import RollingCaoursel from 'components/rollingCarousel';
import Skills from 'components/skills';

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
      <Hero />
      <RollingCaoursel />
      <Skills />
    </>
  );
}
