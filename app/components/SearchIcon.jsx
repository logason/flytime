import React from 'react';

export default ({ className, circleClassName, rectClassName }) => (
  <svg className={className} viewBox="0 0 153 153" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(86.967263, 87.567958) rotate(-315.000000) translate(-86.967263, -87.567958) translate(-1.032737, 37.567958)">
        <circle className={circleClassName} strokeWidth="20" cx="50" cy="50" r="50"></circle>
        <rect className={rectClassName} x="100" y="40" width="76" height="20" rx="10"></rect>
      </g>
    </g>
  </svg>
);
