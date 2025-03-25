import type { NextApiRequest, NextApiResponse } from 'next';

// Helper function to wait
async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Function to retry a fetch with exponential backoff
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);

      // If we get a 5xx error, retry
      if (response.status >= 500 && response.status < 600 && retries < maxRetries - 1) {
        retries++;
        const delay = Math.pow(2, retries) * 1000; // Exponential backoff
        console.log(`Retry ${retries}/${maxRetries} after ${delay}ms for ${url}`);
        await wait(delay);
        continue;
      }

      return response;
    } catch (error) {
      if (retries < maxRetries - 1) {
        retries++;
        const delay = Math.pow(2, retries) * 1000;
        console.log(
          `Retry ${retries}/${maxRetries} after ${delay}ms for ${url} due to error: ${error}`,
        );
        await wait(delay);
      } else {
        throw error;
      }
    }
  }

  throw new Error(`Failed after ${maxRetries} retries`);
}

// Test function to directly check the CrewAI API
async function testCrewAiApi(brandUrl = 'https://lifeboostcoffee.com') {
  const url = 'https://automating-brand-kit-creation-from-url-inpu-de3f6b6b.crewai.com/kickoff';
  const bearerToken = 'f9f7b4fd5f6a';

  console.log('Testing direct connection to CrewAI API...');
  console.log(`Using brand_url: ${brandUrl}`);

  try {
    const response = await fetch(url, {
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
    });

    console.log(`Direct API test status: ${response.status}`);

    const text = await response.text();
    console.log(`Direct API test response: ${text.substring(0, 200)}`);

    return {
      status: response.status,
      body: text,
    };
  } catch (error) {
    console.error('Direct API test error:', error);
    return {
      status: 500,
      body: error instanceof Error ? error.message : String(error),
    };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add a special endpoint for testing the API directly
  if (req.query.endpoint === 'test-direct') {
    const brandUrl = (req.query.brand_url as string) || 'https://lifeboostcoffee.com';
    const result = await testCrewAiApi(brandUrl);
    return res.status(200).json(result);
  }

  const { url, endpoint } = req.query;
  const bearerToken = req.headers.authorization?.split(' ')[1] || '';

  if (!url || !endpoint) {
    return res.status(400).json({ error: 'Missing required parameters: url and endpoint' });
  }

  try {
    const apiUrl = `${url}/${endpoint}`;
    console.log(`Proxying request to: ${apiUrl}`);
    console.log(`Request method: ${req.method}`);
    console.log(`Request headers:`, {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken.substring(0, 4)}...`, // Log partial token for security
    });
    console.log(`Request body:`, req.body);

    const response = await fetchWithRetry(apiUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response headers:`, Object.fromEntries([...response.headers.entries()]));

    const responseText = await response.text();
    console.log(
      `Response body:`,
      responseText.substring(0, 200) + (responseText.length > 200 ? '...' : ''),
    );

    if (responseText.includes('<html>')) {
      console.error(`API returned HTML error page with status ${response.status}`);
      return res.status(response.status).send(responseText);
    }

    try {
      const data = JSON.parse(responseText);
      return res.status(response.status).json(data);
    } catch (e) {
      return res.status(response.status).send(responseText);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Failed to proxy request',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
