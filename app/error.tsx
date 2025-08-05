// app/error.tsx

'use client';

import { useState, useEffect } from 'react';

const ErrorPage = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Example of something that would require client-side JS
    const timeout = setTimeout(() => {
      setHasError(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <h1>An error occurred!</h1>
      {hasError && <p>We encountered an issue.</p>}
    </div>
  );
};

export default ErrorPage;
