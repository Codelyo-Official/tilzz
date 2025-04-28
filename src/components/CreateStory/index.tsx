import React, { useState, ChangeEvent, FormEvent } from 'react';
import './story.css';
import axios from 'axios';
import { ApiError } from '../../types/apiError';

const API_BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';


const CreateStory: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [visibility, setVisibility] = useState<'private' | 'public'>('private');
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<string | null>(null);  // Typed state


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
      setBannerFile(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    const payload = {
      title,
      description,
      // visibility,
      "cover_image": bannerFile,
    };

    // Append fields
    formData.append('title', payload.title);      // your other fields
    formData.append('description', payload.description);
    // Append the actual file
    if (bannerFile !== null)
      formData.append('cover_image', bannerFile); // payload.file should be a File object

    const token = sessionStorage.getItem("token");
    try {
      console.log(payload)
      const createStory_api_response = await axios.post(`${API_BASE_URL}/api/stories/`, formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      console.log(createStory_api_response);
      if (createStory_api_response.request.status === 201) {
        alert("story created")
      }
    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      setErrors(apiError.message);
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
        setErrors(errorMessage);
      }
    }
  };

  return (
    <div className="create-story-container">
      <h2>Create Your Story</h2>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <form onSubmit={handleSubmit} className="create-story-form">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter story title"
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            required

            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a description for your story"
          />
        </div>

        <div className="input-group">
          <label>Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as 'private' | 'public')}
            className="visibility-select"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="banner-image">Upload Banner Image</label>
          <input
            type="file"
            id="banner-image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {bannerImage && (
            <div className="image-preview">
              <img src={bannerImage} alt="Banner Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">Create Story</button>
      </form>
    </div>
  );
};

export default CreateStory;
