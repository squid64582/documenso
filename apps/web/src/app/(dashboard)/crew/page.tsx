'use client';

import CrewApiForm from '../../../components/crew-component';

export default function CrewPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-semibold">Brand Kit Creator</h1>
      <p className="mb-6 text-gray-600">
        Enter a website URL to analyze and create a brand kit automatically using AI.
      </p>

      <CrewApiForm useLocalBackend={true} className="max-w-2xl" />

    </div>
  );
}
