'use client'

import { useState } from 'react'
import axios from 'axios'

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  const handleGenerateImage = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    
    setLoading(true)
    try {
      const response = await axios.post('/api/generate-image', { prompt })
      setImageUrl(response.data.imageUrl)
    } catch (err) {
      alert('Error generating image: ' + err.message)
    }
    setLoading(false)
  }

  const handleGenerateVideo = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/generate-video', { imageUrl, prompt })
      setVideoUrl(response.data.videoUrl)
    } catch (err) {
      alert('Error generating video: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="glass rounded-xl p-8 space-y-6">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your video idea..."
        rows="4"
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-600"
      />
      
      <button
        onClick={handleGenerateImage}
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {imageUrl && (
        <>
          <img src={imageUrl} alt="Generated" className="w-full rounded-lg" />
          <button
            onClick={handleGenerateVideo}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg"
          >
            Convert to Video
          </button>
        </>
      )}

      {videoUrl && (
        <video src={videoUrl} controls className="w-full rounded-lg" />
      )}
cat > app/page.jsx << 'EOF'
'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VideoGenerator from '@/components/VideoGenerator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Alpha AI Video Studio
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your ideas into stunning videos. Write a prompt, generate an image, and watch it come to life as a video.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoGenerator />
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">How it works</h3>
              <ol className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">1</span>
                  <span>Write your creative prompt</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">2</span>
                  <span>AI generates a stunning image</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold">3</span>
                  <span>Video synthesis brings it to life</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
