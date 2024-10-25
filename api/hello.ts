import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET'); // Allow only GET requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

  // Handle OPTIONS request for CORS preflight check
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { form_no } = req.query;

  if (!form_no) {
    return res.status(400).json({ error: 'form_no is required' });
  }

  try {
    const response = await axios.get(`https://rem.creativerp.org/cv/web/ApisController.php?form_no=${form_no}`);
    const data = response.data;

    console.log('Fetched Data:', JSON.stringify(data, null, 2));
    return res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Error fetching data' });
  }
}
