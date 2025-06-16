'use client';

const BendArrow = ({ stroke = 'currentColor', className, ...props }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M3.5 20H6.9C10.2603 20 11.9405 20 13.2239 19.346C14.3529 18.7708 15.2708 17.8529 15.846 16.7239C16.5 15.4405 16.5 13.7603 16.5 10.4L16.5 4M16.5 4L11.5 9M16.5 4L21.5 9"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="square"
    />
  </svg>
);

export default BendArrow;
