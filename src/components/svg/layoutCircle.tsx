const LayoutCircle = ({ id, className, pathId }: Props) => (
  <svg viewBox="0 0 700 700" className={className} id={id}>
    <path
      id={pathId}
      d="M350 0.5a349.5 349.5 0 1 0 0 699a349.5 349.5 0 1 0 0 -699z"
      stroke="currentColor"
      fill="none"
    />
  </svg>
);

interface Props {
  id?: string;
  className?: string;
  pathId?: string;
}

export default LayoutCircle;
