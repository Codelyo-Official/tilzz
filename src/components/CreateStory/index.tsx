import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApiError } from '../../types/apiError';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import './story.css';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const CreateStory: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('story description');
  const [visibility, setVisibility] = useState<'private' | 'public'>('public');
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);  // Typed state
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const notify = () => toast("Story Created Successfully!");

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
      visibility,
      "cover_image": bannerFile,
    };

    // Append fields
    formData.append('title', payload.title);      // your other fields
    formData.append('description', payload.description);
    formData.append('visibility', payload.visibility);
    if(selectedCategory!==""){
      formData.append('category', selectedCategory);
    }
    // Append the actual file
    if (bannerFile !== null)
      formData.append('cover_image', bannerFile); // payload.file should be a File object

    const token = sessionStorage.getItem("token");
    try {
      console.log(payload)
      setLoading(true);
      const createStory_api_response = await axios.post(`${API_BASE_URL}/api/stories/stories/`, formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      console.log(createStory_api_response);
      if (createStory_api_response.request.status === 201) {
        setLoading(false);
        notify();
        setTimeout(()=>{
          navigate(`?activeTab=story-preview&storyId=${createStory_api_response?.data?.id}`)
        },1000)
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

  const getAllCategories = async () => {
    // /api/stories/categories/
    const token = sessionStorage.getItem("token");

    try {
      const getCategoryResponse = await axios.get(`${API_BASE_URL}/api/stories/categories/`,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      console.log(getCategoryResponse);
      setCategories(getCategoryResponse.data);
    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      setErrors(apiError.message);
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "new") {
      setShowNewCategoryInput(true);
      setSelectedCategory("");
    } else {
      setSelectedCategory(value);
      setShowNewCategoryInput(false);
    }
  };

  const handleAddNewCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory = {
      id: categories.length + 1,
      name: newCategoryName.trim(),
    };

    setCategories([...categories, newCategory]);
    setSelectedCategory(newCategory.name);
    setNewCategoryName("");
    setShowNewCategoryInput(false);
  };

  React.useEffect(() => {
    getAllCategories();
  }, [])

  return (
    <div className="create-story-container">
      <h2>Create Your Story</h2>
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

        {/* <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            required

            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a description for your story"
          />
        </div> */}

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
          <label>Category</label>
          <select
            value={selectedCategory}
            onChange={handleChange}
            className="category-select"
            disabled={categories.length === 0 && !showNewCategoryInput}
          >
            <option value="" disabled>
              {categories.length === 0 ? "No categories available" : "Select a category"}
            </option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
            <option value="new">+ Create New Category</option>
          </select>

          {showNewCategoryInput && (
            <div className="new-category-form" style={{ marginTop: "8px" }}>
              <input
                type="text"
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="new-category-input"
              />
              <button onClick={handleAddNewCategory} className="add-category-btn">
                Add
              </button>
            </div>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="banner-image">Upload Banner Image</label>
          <input
            required
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
        {errors && <p className='errors'>{errors}</p>}
        {!loading ? (
          <button type="submit" className="submit-btn">Create Story</button>
        ) : (
          <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spinner animation="grow" role="status" style={{ color: "blue", fontSize: "20px", background: "#ACA6FF" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CreateStory;
