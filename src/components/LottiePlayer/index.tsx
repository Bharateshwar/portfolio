import {
  DotLottieReact,
  DotLottieReactProps,
} from '@lottiefiles/dotlottie-react';

function LottiePlayer(props: DotLottieReactProps) {
  return (
    <DotLottieReact
      autoplay
      loop
      className="lottie-player"
      height="100%"
      width="100%"
      {...props}
    />
  );
}

export default LottiePlayer;
