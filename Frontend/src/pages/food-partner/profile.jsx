import React, { useEffect, useState } from 'react'
import '../../styles/profile.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])
  const [viewer, setViewer] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);


  useEffect(() => {
    if (!id) return

    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const partner = res.data.foodPartner
        setProfile(partner)
        setVideos(partner.foodItems || []);
      })
      .catch(console.error)
  }, [id])

  useEffect(() => {
  axios
    .get("http://localhost:3000/api/auth/me", { withCredentials: true })
    .then(res => setViewer(res.data))
    .catch(() => setViewer(null));
}, []);


  return (
    <main className="profile-page">

      {/* ===== PROFILE HEADER ===== */}
      <section className="profile-header">
        <img
          className="profile-avatar"
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b"
          alt="Profile"
        />

        <div className="profile-info">
          <h1 className="profile-name">{profile?.name}</h1>
          <p className="profile-address">📍 {profile?.address}</p>

          {/* STATS */}
          <div className="profile-stats">
            <div>
              <strong>{videos.length}</strong>
              <span>Items</span>
            </div>
            <div>
              <strong>{profile?.customersServed || 2500}</strong>
              <span>Customers</span>
            </div>
          </div>

        {viewer?.role === "food-partner" && viewer?.id === id && (
  <button
    className="profile-create-btn"
    onClick={() => navigate("/create-food")}
  >
    ➕ Create Food
  </button>
)}
        </div>
      </section>

      {/* ===== INSTAGRAM GRID ===== */}
      <section className="profile-grid">
        {videos.length === 0 && (
          <p className="profile-empty">No posts yet</p>
        )}

        {videos.map((v) => (
          <div
            key={v._id}
            className="profile-grid-item"
            onMouseEnter={(e) =>
              e.currentTarget.querySelector('video')?.play()
            }
            onMouseLeave={(e) =>
              e.currentTarget.querySelector('video')?.pause()
            }
             onClick={() => setActiveVideo(v)}
          >
            <video
              src={v.video}
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        ))}
      </section>
{activeVideo && (
  <div className="video-modal">
    <button
      className="video-modal-close"
      onClick={() => setActiveVideo(null)}
    >
      ✕
    </button>

    <video
      src={activeVideo.video}
      className="video-modal-video"
      controls
      autoPlay
      playsInline
    />
  </div>
)}

      

    </main>
  )
}

export default Profile
