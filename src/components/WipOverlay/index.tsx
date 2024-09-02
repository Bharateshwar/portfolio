import Container from 'components/container';
import LottiePlayer from 'components/LottiePlayer';

function WipOverlay() {
  return (
    <Container className="wip-overlay">
      <LottiePlayer src="/animations/construction.lottie" />
      <Container className="wip-overlay__message">
        <h2 className="h2-large">
          Oops! Looks like you’re on a mobile or tablet.
        </h2>
        <p>
          The mobile site is still in development. Enjoy the full experience on
          a desktop or larger device!
        </p>
      </Container>
    </Container>
  );
}

export default WipOverlay;
