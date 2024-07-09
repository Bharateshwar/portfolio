import cx from 'classnames';
import { ReactNode } from 'react';

function Container({ children, className, variant }: Props) {
  return (
    <div
      className={cx('container', className, {
        'container--gradient': variant === 'gradient',
        'container--secondary': variant === 'secondary',
      })}
    >
      {children}
    </div>
  );
}

interface Props {
  children: ReactNode;
  className?: string;
  variant?: 'gradient' | 'secondary';
}

export default Container;
