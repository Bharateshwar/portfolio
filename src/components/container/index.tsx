import cx from 'classnames';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

function Container(
  { children, className, variant = 'primary', isSection, fullWidth }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const WrapperElement = isSection ? 'section' : 'div';

  return (
    <WrapperElement
      className={cx('container', className, {
        'container--primary': variant === 'primary',
        'container--secondary': variant === 'secondary',
        'container--full-width': fullWidth,
      })}
      ref={ref}
    >
      {children}
    </WrapperElement>
  );
}

interface Props {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  isSection?: boolean;
  fullWidth?: boolean;
}

export default forwardRef(Container);
