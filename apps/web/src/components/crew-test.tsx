'use client';

import React, { useState } from 'react';

interface ApiTestResult {
  status: number;
  body: string;
}

export default function CrewTest() {
  const [result, setResult] = useState<ApiTestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brandUrl, setBrandUrl] = useState<string>('https://lifeboostcoffee.com');

  const testDirectConnection = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/crew-proxy?endpoint=test-direct&brand_url=${encodeURIComponent(brandUrl)}`,
      );
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-lg border p-4">
      <h2 className="mb-4 text-xl font-semibold">Test CrewAI API Connection</h2>

      <div className="mb-4">
        <label htmlFor="brandUrl" className="mb-2 block text-sm font-medium text-gray-700">
          Brand URL
        </label>
        <input
          type="text"
          id="brandUrl"
          value={brandUrl}
          onChange={(e) => setBrandUrl(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
        />
      </div>

      <button
        onClick={testDirectConnection}
        disabled={loading}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Direct Connection'}
      </button>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 text-lg font-medium">API Response</h3>
          <p>
            <strong>Status:</strong> {result.status}
          </p>
          <div className="mt-2">
            <strong>Response Body:</strong>
            <pre className="mt-1 max-h-60 overflow-auto rounded bg-gray-100 p-2 text-sm">
              {result.body}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
