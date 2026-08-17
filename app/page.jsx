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

  const GUMROAD_URL = 'https://roseljan.gumroad.com/l/rhubwe';

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

      {/* Pricing Section */}
      <section style={{ marginTop: '80px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '32px' }}>Pricing</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', width: '220px' }}>
              <h3 style={{ fontSize: '20px' }}>Starter</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0' }}>$9<span style={{ fontSize: '14px' }}>/mo</span></p>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Get started with basic video generation</p>
            </div>
          </a>

          <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', width: '220px', border: '2px solid #3b82f6' }}>
              <h3 style={{ fontSize: '20px' }}>Creator</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0' }}>$29<span style={{ fontSize: '14px' }}>/mo</span></p>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>More generations, priority processing</p>
            </div>
          </a>

          <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', width: '220px' }}>
              <h3 style={{ fontSize: '20px' }}>Pro</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0' }}>$49<span style={{ fontSize: '14px' }}>/mo</span></p>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Full access, unlimited priority support</p>
            </div>
          </a>
        </div>

        <p style={{ marginTop: '24px', color: '#94a3b8', fontSize: '14px' }}>
          30-day money back guarantee on all plans.
        </p>
      </section>
    </main>
  );
}
