// apps/web/src/app/fragments/page.tsx
'use client';

import React, { useEffect } from 'react';

export default function FragmentsRedirect() {
  useEffect(() => {
    // Redirect to the soom-fragments app
    window.location.href = 'http://localhost:3004'; // Adjust based on your setup
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Redirecting to Landing Page Generator</h2>
        <p className="text-muted-foreground">Please wait while we prepare your landing page...</p>
      </div>
    </div>
  );
}
