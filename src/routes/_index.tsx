import type { MetaFunction } from "@remix-run/node";

import Hero from "components/hero";
import RollingCaoursel from "components/rollingCarousel";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <Hero />
      <RollingCaoursel />
    </>
  );
}
