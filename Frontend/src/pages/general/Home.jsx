import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/reels.css'
import '../../styles/animations.css'
import ReelFeed from '../../components/ReelFeed'
import gsap from 'gsap'

const Home = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Page load animation
       if (document.body) {
    gsap.from(document.body, {
      duration: 0.5,
      opacity: 0,
      ease: 'power2.out'
    })
}

        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {
                console.log(response.data)
                setVideos(response.data.foodItems)
                setLoading(false)

                // Animate videos on load
               setTimeout(() => {
  gsap.from('.reel', {
    duration: 0.6,
    opacity: 0,
    y: 30,
    stagger: 0.1,
    ease: 'power2.out'
  })
}, 100)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    // Smooth scroll animations on wheel
    useEffect(() => {
        const handleScroll = () => {
            gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
                const rect = element.getBoundingClientRect()
                if (rect.top < window.innerHeight * 0.8) {
                    gsap.to(element, {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    })
                }
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    async function likeVideo(item) {
        const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, { withCredentials: true })

        if (response.data.like) {
            console.log("Video liked")
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
            // Like animation
            gsap.to('[data-video-id="' + item._id + '"] .like-btn', {
                duration: 0.3,
                scale: 1.2,
                yoyo: true,
                repeat: 1,
                ease: 'back.out(1.7)'
            })
        } else {
            console.log("Video unliked")
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
    }

    async function saveVideo(item) {
        const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })

        if (response.data.save) {
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
            // Save animation
            gsap.to('[data-video-id="' + item._id + '"] .save-btn', {
                duration: 0.3,
                scale: 1.2,
                yoyo: true,
                repeat: 1,
                ease: 'back.out(1.7)'
            })
        } else {
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

    return (
        <>
            {loading && (
                <div className="loading-container animate-fadeIn">
                    <div className="spinner"></div>
                    <p>Loading delicious meals...</p>
                </div>
            )}
            <ReelFeed
                items={videos}
                onLike={likeVideo}
                onSave={saveVideo}
                emptyMessage="No videos available."
            />
        </>
    )
}

export default Home