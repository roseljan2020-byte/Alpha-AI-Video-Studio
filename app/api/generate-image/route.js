import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { prompt } = await request.json()
    if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    
    const fal_api_key = process.env.NEXT_PUBLIC_FAL_API_KEY
    if (!fal_api_key) return NextResponse.json({ error: 'FAL API key not configured' }, { status: 500 })

    const response = await fetch('https://queue.fal.run/fal-ai/flux-pro', {
      method: 'POST',
      headers: {
        'Authorization': 'Key ' + fal_api_key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        image_size: { width: 1024, height: 576 },
        num_images: 1,
      }),
    })

    if (!response.ok) throw new Error('FAL API error')
    const data = await response.json()
    const imageUrl = data.images?.[0]?.url
    if (!imageUrl) return NextResponse.json({ error: 'No image generated' }, { status: 400 })
    
    return NextResponse.json({ imageUrl })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
