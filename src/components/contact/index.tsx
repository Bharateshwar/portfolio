import { useFetcher } from '@remix-run/react';
import cx from 'classnames';

import Container from 'components/container';
import LottiePlayer from 'components/LottiePlayer';
import { action } from 'routes/_index';

import 'styles/contact.scss';
import 'styles/loader.scss';

export const CONTACT_FORM_TITLE_ID = 'contact-form-title';

function Contact() {
  const { Form, data, state } = useFetcher<typeof action>();

  const isLoading = state === 'loading' || state === 'submitting';
  const isEmailSent = data && 'emailSent' in data && data?.emailSent;
  const disableSubmitButton = isLoading || isEmailSent;
  const emailError = data && 'errors' in data && data?.errors?.email;
  const messageError = data && 'errors' in data && data?.errors?.message;

  return (
    <Container
      isSection
      variant="secondary"
      className={cx('contact-section', {
        '--email-sent': isEmailSent,
      })}
    >
      <div className="success-state">
        <h2 className="h2-large">Thanks for that! Will reply ASAP.</h2>
        <LottiePlayer src="/animations/email-writing.lottie" speed={0.3} />
      </div>
      <Form method="POST">
        <h2 id={CONTACT_FORM_TITLE_ID} className="h2-large">
          Say hello!
        </h2>
        <div>
          <input
            placeholder="Your email goes here."
            name="email"
            className={cx({
              '--error': emailError,
            })}
            disabled={isLoading}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>

        <div>
          <textarea
            placeholder="Share your thoughts, ideas, or questions. I'm all ears."
            rows={10}
            name="message"
            disabled={isLoading}
            className={cx({
              '--error': messageError,
            })}
          />
          {messageError && <div className="error-message">{messageError}</div>}
        </div>
        <button
          type="submit"
          disabled={disableSubmitButton}
          className={cx('submit-button', {
            'submit-button--is-loading': isLoading,
          })}
        >
          <div className="loader" />
          <span>Send</span>
        </button>
      </Form>
    </Container>
  );
}

export default Contact;
