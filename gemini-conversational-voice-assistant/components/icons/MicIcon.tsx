
import React from 'react';

interface MicIconProps extends React.SVGProps<SVGSVGElement> {}

export const MicIcon: React.FC<MicIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
    <path d="M19 10v1a7 7 0 0 1-14 0v-1h2v1a5 5 0 0 0 10 0v-1z" />
    <path d="M12 19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3h2v3h4v-3h2z" />
  </svg>
);
