'use client';
import { useState } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

function Loader({ color }) {
  return (
    <div className="sweet-loading">
      <BounceLoader
        color={color}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
