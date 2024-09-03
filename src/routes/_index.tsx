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

const validateContactFormData = ({
  email,
  message,
}: {
  email?: string;
  message?: string;
}) => {
  const errors: { [key: string]: string } = {};

  // Validate email
  if (
    email === undefined ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  ) {
    errors.email = 'Hmm, this email doesn’t look right. Check again?';
  } else if (email.length > 254) {
    errors.email = 'This email is a bit too long.';
  }

  // Validate message
  if (message === undefined) {
    errors.message = 'Don’t be shy, tell me something!';
  } else if (message.length < 10) {
    errors.message =
      'Your message is a bit short. Could you add a little more detail?';
  }

  return errors;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get('email')?.toString();
  const message = formData.get('message')?.toString();

  const errors = validateContactFormData({ email, message });

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  // @TODO: Apply validations on data before submit
  const data = {
    service_id: process.env.EMAIL_SERVICE_ID,
    template_id: process.env.EMAIL_TEMPLATE_ID,
    user_id: process.env.EMAIL_SERVICE_KEY,
    template_params: { from_email: email, message },
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
