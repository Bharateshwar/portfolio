import cx from 'classnames';
import { ReactNode } from 'react';

function Container({ children, className, variant, isSection }: Props) {
  const WrapperElement = isSection ? 'section' : 'div';

  return (
    <WrapperElement
      className={cx('container', className, {
        'container--gradient': variant === 'gradient',
        'container--secondary': variant === 'secondary',
      })}
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

export default Container;
