import { useFetcher } from '@remix-run/react';
import cx from 'classnames';

import Container from 'components/container';
import { action } from 'routes/_index';

import 'styles/contact.scss';

export const CONTACT_FORM_TITLE_ID = 'contact-form-title';

function Contact() {
  const { Form, data, state } = useFetcher<typeof action>();

  const emailError = data && 'errors' in data && data?.errors?.email;
  const messageError = data && 'errors' in data && data?.errors?.message;

  return (
    <Container className="contact-section" isSection variant="secondary">
      <h2 id={CONTACT_FORM_TITLE_ID} className="h2-large">
        Say hello!
      </h2>
      <Form method="POST">
        <div>
          <input
            placeholder="Your email goes here."
            name="email"
            className={cx({
              '--error': emailError,
            })}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>

        <div>
          <textarea
            placeholder="Share your thoughts, ideas, or questions. I'm all ears."
            rows={10}
            name="message"
            className={cx({
              '--error': messageError,
            })}
          />
          {messageError && <div className="error-message">{messageError}</div>}
        </div>
        <button
          type="submit"
          disabled={data && 'emailSent' in data && data?.emailSent}
        >
          Send
        </button>
        {/* @TODO: Add loading indicator or UI */}
        {state === 'loading' && 'Loading...'}
      </Form>
    </Container>
  );
}

export default Contact;
