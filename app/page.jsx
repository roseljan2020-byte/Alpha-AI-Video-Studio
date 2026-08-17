'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  async function handleGenerate() {
    setLoading(true);
    setVideoUrl(null);
    setError(null);
    try {
      const imgRes = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const imgData = await imgRes.json();

      const vidRes = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: imgData.imageUrl, prompt }),
      });
      const vidData = await vidRes.json();
      setVideoUrl(vidData.videoUrl);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0f172a', color: 'white', padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Alpha AI Video Studio</h1>
      <p style={{ marginBottom: '24px', color: '#cbd5e1' }}>Turn text into video</p>

      <textarea
        style={{ width: '100%', maxWidth: '600px', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}
        rows={4}
        placeholder="Describe your video..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginTop: '12px',
          padding: '12px 24px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Video'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {videoUrl && (
        <div style={{ marginTop: '30px' }}>
          <video src={videoUrl} controls style={{ width: '100%' }} />
          <a href={videoUrl} download style={{ display: 'block', marginTop: '10px' }}>
            Download MP4
          </a>
        </div>
      )}
    </main>
  );
}
