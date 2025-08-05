'use client';

import React from 'react';

const HamburgerIcon: React.FC = () => {
  return (
    <div className="flex flex-col items-start space-y-1">
      <span className="h-0.5 w-6 bg-black rounded-sm" />
      <span className="h-0.5 w-4 bg-black rounded-sm" />
      <span className="h-0.5 w-2.5 bg-black rounded-sm" />
    </div>
  );
};

export default HamburgerIcon;
