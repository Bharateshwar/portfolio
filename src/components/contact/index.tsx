import Container from 'components/container';

import 'styles/contact.scss';

function Contact() {
  return (
    <Container className="contact-section" isSection variant="secondary">
      <h2 className="h2-large">Say hello!</h2>
      <form>
        <input placeholder="Your email goes here." />
        <textarea
          placeholder="Share your thoughts, ideas, or questions. I'm all ears."
          rows={10}
        />
        <button type="submit">Send</button>
      </form>
    </Container>
  );
}

export default Contact;
