const LayoutCircle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 700 700" className={className}>
    <path
      id="layout-circle-path"
      d="M350 0.5a349.5 349.5 0 1 0 0 699a349.5 349.5 0 1 0 0 -699z"
      stroke="#3D3D3D"
      fill="none"
    />
  </svg>
);

export default LayoutCircle;
