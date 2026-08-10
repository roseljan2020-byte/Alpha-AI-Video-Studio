import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { imageUrl, prompt } = await request.json()
    if (!imageUrl) return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    
    const fal_api_key = process.env.NEXT_PUBLIC_FAL_API_KEY
    if (!fal_api_key) return NextResponse.json({ error: 'FAL API key not configured' }, { status: 500 })

    const response = await fetch('https://queue.fal.run/fal-ai/ltx-video', {
      method: 'POST',
      headers: {
        'Authorization': 'Key ' + fal_api_key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt || 'A cinematic video',
        image_url: imageUrl,
        duration: 4,
      }),
    })

    if (!response.ok) throw new Error('Video generation failed')
    const data = await response.json()
    const videoUrl = data.video?.url
    if (!videoUrl) return NextResponse.json({ error: 'No video generated' }, { status: 400 })
    
    return NextResponse.json({ videoUrl })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
