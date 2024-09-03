import { useFetcher } from '@remix-run/react';

import Container from 'components/container';
import { action } from 'routes/_index';

import 'styles/contact.scss';

export const CONTACT_FORM_TITLE_ID = 'contact-form-title';

function Contact() {
  const { Form, data, state } = useFetcher<typeof action>();

  return (
    <Container className="contact-section" isSection variant="secondary">
      <h2 id={CONTACT_FORM_TITLE_ID} className="h2-large">
        Say hello!
      </h2>
      <Form method="POST">
        <input placeholder="Your email goes here." name="email" />
        <textarea
          placeholder="Share your thoughts, ideas, or questions. I'm all ears."
          rows={10}
          name="message"
        />
        <button type="submit" disabled={data?.emailSent}>
          Send
        </button>
        {/* @TODO: Add loading indicator or UI */}
        {state === 'loading' && 'Loading...'}
      </Form>
    </Container>
  );
}

export default Contact;
