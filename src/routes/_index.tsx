import {
  ActionFunctionArgs,
  createCookie,
  json,
  type MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import BackgroundBreakContainer from 'components/BackgroundBreakContainer';
import Contact from 'components/contact';
import Container from 'components/container';
import Footer from 'components/footer';
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
        <Container variant="secondary">
          <Contact />
          <Footer />
        </Container>
      </Container>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const fromEmail = formData.get('email');
  const message = formData.get('message');

  // @TODO: Apply validations on data before submit
  const data = {
    service_id: process.env.EMAIL_SERVICE_ID,
    template_id: process.env.EMAIL_TEMPLATE_ID,
    user_id: process.env.EMAIL_SERVICE_KEY,
    template_params: { from_email: fromEmail, message },
  };

  // @TODO: Setup loading and error states on UI
  try {
    const response = await fetch(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    if (response.ok) {
      return json({ emailSent: true });
    }
  } catch (error) {
    console.error('Oops... ', { error });
  }
}
