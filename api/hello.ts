import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Get the form_no from the query parameters
  const { form_no } = req.query;

  // Check if form_no is provided
  if (!form_no) {
    return res.status(400).json({ error: 'form_no is required' });
  }

  try {
    // Call the external URL with the dynamic form_no
    const response = await axios.get(`https://rem.creativerp.org/cv/web/ApisController.php?form_no=${form_no}`);
    const data = response.data;

    console.log('Fetched Data:', JSON.stringify(data, null, 2)); // Log data to Vercel logs
    return res.json(data); // Send the data to the client
  } catch (error) {
    console.error('Error fetching data:', error); // Log error to Vercel logs
    return res.status(500).json({ error: 'Error fetching data' });
  }
}
