import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import '../../styles/create-food.css';
import '../../styles/animations.css';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const CreateFood = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState('');
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);
     const cardRef = useRef(null);
     const fieldsRef = useRef([]);
    const navigate = useNavigate();

  useEffect(() => {
  if (!cardRef.current) return;

  gsap.fromTo(
    cardRef.current,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }
  );

  gsap.fromTo(
    fieldsRef.current,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    }
  );
}, []);

    useEffect(() => {
        if (!videoFile) {
            setVideoURL('');
            return;
        }
        const url = URL.createObjectURL(videoFile);
        setVideoURL(url);

        // Animate video preview
        gsap.from('.video-preview', {
            duration: 0.5,
            opacity: 0,
            scale: 0.9,
            ease: 'back.out(1.7)'
        });

        return () => URL.revokeObjectURL(url);
    }, [videoFile]);

    const onFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) {
            setVideoFile(null);
            setFileError('');
            return;
        }
        if (!file.type.startsWith('video/')) {
            setFileError('Please select a valid video file.');
            // Shake animation on error
            gsap.to('.file-dropzone', {
                duration: 0.1,
                x: -10,
                repeat: 5,
                yoyo: true,
                onComplete: () => gsap.set('.file-dropzone', { x: 0 })
            });
            return;
        }
        setFileError('');
        setVideoFile(file);
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer?.files?.[0];
        if (!file) {
            return;
        }
        if (!file.type.startsWith('video/')) {
            setFileError('Please drop a valid video file.');
            return;
        }
        setFileError('');
        setVideoFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        gsap.to('.file-dropzone', {
            duration: 0.2,
            scale: 1.02,
            borderColor: '#e23744'
        });
    };

    const onDragLeave = () => {
        gsap.to('.file-dropzone', {
            duration: 0.2,
            scale: 1,
            borderColor: 'rgba(226, 55, 68, 0.2)'
        });
    };

    const openFileDialog = () => fileInputRef.current?.click();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append("video", videoFile);

        try {
            const response = await axios.post("http://localhost:3000/api/food", formData, {
                withCredentials: true,
            });

            console.log(response.data);

            // Success animation
            gsap.to('.create-food-card', {
                duration: 0.3,
                scale: 0.95,
                opacity: 0,
                onComplete: () => navigate("/home")
            });
        } catch (error) {
            console.error(error);
            // Shake animation on error
            gsap.to('.create-food-card', {
                duration: 0.1,
                x: -10,
                repeat: 5,
                yoyo: true,
                onComplete: () => gsap.set('.create-food-card', { x: 0 })
            });
        }
    };

    const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

    return (
        <div className="create-food-page">
            <div className="create-food-card">
                <header className="create-food-header">
                    <h1 className="create-food-title">Create Food</h1>
                    <p className="create-food-subtitle">Upload a short video, give it a name, and add a description.</p>
                </header>

                <form className="create-food-form" onSubmit={onSubmit}>
                    <div className="field-group">
                        <label htmlFor="foodVideo">Food Video</label>
                        <input
                            id="foodVideo"
                            ref={fileInputRef}
                            className="file-input-hidden"
                            type="file"
                            accept="video/*"
                            onChange={onFileChange}
                        />

                        <div
                            className="file-dropzone"
                            role="button"
                            tabIndex={0}
                            onClick={openFileDialog}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFileDialog(); } }}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                        >
                            <div className="file-dropzone-inner">
                                <svg className="file-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M10.8 3.2a1 1 0 0 1 .4-.08h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h1.6V3.2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .6.2z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" fill="currentColor" />
                                </svg>
                                <div className="file-dropzone-text">
                                    <strong>Tap to upload</strong> or drag and drop
                                </div>
                                <div className="file-hint">MP4, WebM, MOV • Up to ~100MB</div>
                            </div>
                        </div>

                        {fileError && <p className="error-text animate-slideInDown" role="alert">{fileError}</p>}

                        {videoFile && (
                            <div className="file-chip animate-slideInUp" aria-live="polite">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                    <path d="M9 12.75v-1.5c0-.62.67-1 1.2-.68l4.24 2.45c.53.3.53 1.05 0 1.35L10.2 16.82c-.53.31-1.2-.06-1.2-.68v-1.5" />
                                </svg>
                                <span className="file-chip-name">{videoFile.name}</span>
                                <span className="file-chip-size">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</span>
                                <div className="file-chip-actions">
                                    <button type="button" className="btn-ghost" onClick={openFileDialog}>Change</button>
                                    <button type="button" className="btn-ghost danger" onClick={() => { setVideoFile(null); setFileError(''); }}>Remove</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {videoURL && (
                        <div className="video-preview">
                            <video className="video-preview-el" src={videoURL} controls playsInline preload="metadata" />
                        </div>
                    )}

                    <div className="field-group">
                        <label htmlFor="foodName">Name</label>
                        <input
                            id="foodName"
                            type="text"
                            placeholder="e.g., Spicy Paneer Wrap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div
                           className="field-group"
                          ref={(el) => el && fieldsRef.current.push(el)}
                           ></div>

                    <div className="field-group">
                        <label htmlFor="foodDesc">Description</label>
                        <textarea
                            id="foodDesc"
                            rows={4}
                            placeholder="Write a short description: ingredients, taste, spice level, etc."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-actions">
                        <button className="btn-primary" type="submit" disabled={isDisabled}>
                            Save Food
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFood;