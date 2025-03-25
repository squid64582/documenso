'use client';

import type { FormEvent } from 'react';
import React, { useState } from 'react';

interface CrewApiFormProps {
  baseUrl?: string;
  bearerToken?: string;
  className?: string;
  useLocalBackend?: boolean;
  shopDomain?: string;
}

interface LastStep {
  thought: string;
  action: string;
  actionInput: string;
  actionResult: string;
  result?: string;
}

const CrewApiForm: React.FC<CrewApiFormProps> = ({
  baseUrl = 'https://automating-brand-kit-creation-from-url-input-de3f6b6b.crewai.com',
  bearerToken = 'f9f7b4fd5f6a',
  className,
  useLocalBackend = true,
  shopDomain,
}) => {
  const [taskId, setTaskId] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [lastStep, setLastStep] = useState<LastStep | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>(shopDomain || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let response;
      let responseData;

      const brandUrl = userInput;

      if (useLocalBackend) {
        // Use local backend
        response = await fetch('http://localhost:8000/create-brand-kit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brand_url: brandUrl,
          }),
        });

        if (!response.ok) {
          throw new Error(`Local CrewAI service returned error: ${response.status}`);
        }

        responseData = await response.json();
        setResult(JSON.stringify(responseData, null, 2));
        setState('SUCCESS');
        setStatus('Completed');
        setIsLoading(false);
      } else {
        // Use remote CrewAI service
        const kickoffResponse = await fetch(
          '/api/crew-proxy?url=' + encodeURIComponent(baseUrl) + '&endpoint=kickoff',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify({
              inputs: {
                brand_url: brandUrl,
              },
            }),
          },
        );

        // Check for service unavailable error
        if (kickoffResponse.status === 503) {
          throw new Error('CrewAI service is temporarily unavailable. Please try again later.');
        }

        if (!kickoffResponse.ok) {
          const errorText = await kickoffResponse.text();
          // Check if the response is HTML (likely an error page)
          if (errorText.includes('<html>')) {
            throw new Error('CrewAI service returned an error. Please try again later.');
          }

          try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.details || errorData.error || 'Failed to start crew');
          } catch (jsonError) {
            throw new Error(`Failed to start crew: ${errorText.substring(0, 100)}...`);
          }
        }

        const kickoffData = await kickoffResponse.json();

        if (!kickoffData.kickoff_id) {
          throw new Error('No kickoff ID returned from API');
        }

        setTaskId(kickoffData.kickoff_id);
        await pollStatus(kickoffData.kickoff_id);
      }
    } catch (error) {
      console.error('Error starting crew:', error);
      setError(error instanceof Error ? error.message : String(error));
      setIsLoading(false);
    }
  };

  const parseLastStep = (lastStep: { action: string; result: string }): LastStep => {
    const thoughtMatch = lastStep.action.match(/Thought:\s*(.*?)\s*(?=(Action:|$))/s);
    const actionMatch = lastStep.action.match(/Action:\s*(.*?)\s*(?=(Action Input:|$))/s);
    const actionInputMatch = lastStep.action.match(/Action Input:\s*(.*)/s);
    const resultInputMatch = lastStep.action.match(/Result:\s*(.*)/s);

    const thought = thoughtMatch ? thoughtMatch[1].trim() : '';
    const action = actionMatch ? actionMatch[1].trim() : '';
    const actionInput = actionInputMatch ? actionInputMatch[1].trim() : '';
    const actionResult = lastStep.result || '';

    return { thought, action, actionInput, actionResult, result: lastStep.result };
  };

  const pollStatus = async (id: string) => {
    try {
      const statusResponse = await fetch(
        '/api/crew-proxy?url=' + encodeURIComponent(baseUrl) + '&endpoint=status/' + id,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        },
      );
      const statusData = await statusResponse.json();
      setState(statusData.state);
      setStatus(statusData.status);
      setLastStep(statusData.last_step ? parseLastStep(statusData.last_step) : null);
      setResult(statusData.result);

      if (statusData.state === 'SUCCESS') {
        setIsLoading(false);
      } else {
        setTimeout(() => {
          void pollStatus(id);
        }, 10000);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
      setTimeout(() => {
        void pollStatus(id);
      }, 10000);
    }
  };

  return (
    <div className={`rounded bg-white p-4 shadow ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="userInput" className="mb-2 block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <input
            type="text"
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter website URL to analyze"
            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {isLoading ? (
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Start Brand Kit Creation'
            )}
          </button>
        </div>
      </form>
      {taskId && state !== 'SUCCESS' && !useLocalBackend && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4 shadow-inner">
          <p className="text-sm text-gray-500">
            <strong>Task ID:</strong> {taskId}
          </p>
          <p className="text-sm text-gray-500">
            <strong>State:</strong> {state}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Status:</strong> {status}
          </p>
        </div>
      )}

      {status && status !== 'SUCCESS' && lastStep && !useLocalBackend && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4 shadow-inner">
          <h4 className="text-md font-medium text-gray-700">Last Step Details</h4>
          {lastStep.thought && (
            <p className="mt-5 text-sm text-gray-500">
              <strong>Thought:</strong>
              <br />
              <pre className="inline whitespace-pre-wrap">{lastStep.thought}</pre>
            </p>
          )}
          {lastStep.action && (
            <p className="mt-5 text-sm text-gray-500">
              <strong>Action:</strong>
              <br />
              <pre className="inline whitespace-pre-wrap">{lastStep.action}</pre>
            </p>
          )}
          {lastStep.actionInput && (
            <p className="mt-5 text-sm text-gray-500">
              <strong>Action Input:</strong>
              <br />
              <pre className="inline whitespace-pre-wrap">{lastStep.actionInput}</pre>
            </p>
          )}
          {lastStep.result && (
            <p className="mt-5 text-sm text-gray-500">
              <strong>Action Result:</strong>
              <br />
              <pre className="inline whitespace-pre-wrap">{lastStep.result}</pre>
            </p>
          )}
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4 shadow-inner">
          <h3 className="text-sm font-medium text-gray-700">Final Result</h3>
          <div className="whitespace-pre-wrap break-words text-sm text-gray-500">{result}</div>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default CrewApiForm;
