import cx from 'classnames';
import { ReactNode } from 'react';

function Container({ children, className }: Props) {
  return <div className={cx('container', className)}>{children}</div>;
}

interface Props {
  children: ReactNode;
  className?: string;
}

export default Container;
