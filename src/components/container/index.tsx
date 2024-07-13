import cx from 'classnames';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

function Container(
  { children, className, variant, isSection }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const WrapperElement = isSection ? 'section' : 'div';

  return (
    <WrapperElement
      className={cx('container', className, {
        'container--gradient': variant === 'gradient',
        'container--secondary': variant === 'secondary',
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
  variant?: 'gradient' | 'secondary';
  isSection?: boolean;
}

export default forwardRef(Container);
