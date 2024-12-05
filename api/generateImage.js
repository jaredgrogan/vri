// File: api/generateImage.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const fluxResponse = await fetch('https://api.blackforestlabs.com/flux/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLUX_API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!fluxResponse.ok) {
      throw new Error('Failed to generate image');
    }

    const fluxData = await fluxResponse.json();
    // Assuming the response contains a URL to the generated image
    res.status(200).json({ imageUrl: fluxData.imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ message: 'Error generating image' });
  }
}
