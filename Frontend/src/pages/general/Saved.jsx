import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import '../../styles/animations.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'
import gsap from 'gsap'

const Saved = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Page load animation
        gsap.from('body', {
            duration: 0.5,
            opacity: 0,
            ease: 'power2.out'
        })

        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
                setLoading(false)

                // Animate videos on load
                setTimeout(() => {
                    gsap.from('.reel-item', {
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

    const removeSaved = async (item) => {
        try {
            // Remove animation
            gsap.to('[data-video-id="' + item._id + '"]', {
                duration: 0.3,
                opacity: 0,
                scale: 0.9,
                onComplete: async () => {
                    await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
                    setVideos((prev) => prev.filter((v) => v._id !== item._id))
                }
            })
        } catch {
            // Restore on error
            gsap.to('[data-video-id="' + item._id + '"]', {
                duration: 0.3,
                opacity: 1,
                scale: 1
            })
        }
    }

    return (
        <>
            {loading && (
                <div className="loading-container animate-fadeIn">
                    <div className="spinner"></div>
                    <p>Loading your saved meals...</p>
                </div>
            )}
            <ReelFeed
                items={videos}
                onSave={removeSaved}
                emptyMessage="No saved videos yet."
            />
        </>
    )
}

export default Saved