import React from 'react'

export const Loading: React.FC = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      fill="none"
      r="8"
      stroke="currentColor"
      strokeDasharray="32"
      strokeDashoffset="12"
      strokeLinecap="round"
      strokeWidth="2"
    >
      <animateTransform
        attributeName="transform"
        dur="1s"
        from="0 10 10"
        repeatCount="indefinite"
        to="360 10 10"
        type="rotate"
      />
    </circle>
  </svg>
)
