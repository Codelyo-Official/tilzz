import React from "react";
import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Trash2, Upload } from "lucide-react";
import { User } from "../../types/user";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";
import { ApiError } from "../../types/apiError";
import Spinner from 'react-bootstrap/Spinner';
import "./AccountPage.css";

type FormData = {
  // first_name: string;
  // last_name: String;
  username: string;
  email: string;
};

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Account() {

  const { register, handleSubmit } = useForm<FormData>();
  const { user, setUser }: any = useAuth();


  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>(user.avatar);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    const formData = new FormData();
    const payload = {
      ...data, bio: '', profile_picture: imageFile
    };

    console.log(payload);

    // Append fields
    formData.append('username', payload.username);      // your other fields
    formData.append('email', payload.email);
    formData.append('bio', payload.bio);
    // Append the actual file
    if (imageFile !== null)
      formData.append('profile_picture', imageFile); // payload.file should be a File object

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const updateUserInfoApi_response = await axios.put(`${API_BASE_URL}/api/accounts/profile/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(updateUserInfoApi_response);
      if (imageFile === null) {
        setUser({ ...user, email: payload.email, username: payload.username });
        localStorage.setItem('user', JSON.stringify({ ...user, email: payload.email, username: payload.username }));
      }
      else {
        setUser({ ...user, email: payload.email, username: payload.username, profile_picture: updateUserInfoApi_response.data.profile_picture });
        localStorage.setItem('user', JSON.stringify({ ...user, email: payload.email, username: payload.username, profile_picture: updateUserInfoApi_response.data.profile_picture }));
      }
      setLoading(false)
    } catch (err: any) {
      setLoading(false)

      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.username || 'could not update user info';
        if (Array.isArray(errorMessage)) {
          alert(errorMessage[0])
        } else {
          alert(errorMessage)
        }
      }
    }
    setOpen(false);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleDeleteAccount = () => {

  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile Settings</h2>
        <div className="profile-avatar">
          {user.profile_picture === null ? (<img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} alt="avatar" className="avatar-img" />) : (
            <img src={user.profile_picture.startsWith('http')
              ? user.profile_picture
              : `${API_BASE_URL}${user.profile_picture}`}
              className="avatar-img" />
          )}

        </div>
        <button className="edit-btn" onClick={() => setOpen(true)}>
          Edit Profile
        </button>
        {open && (
          <div className="modal" style={{ fontSize: "14px" }}>
            <div className="modal-content">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="upload-label">
                  <Upload size={18} /> Upload New Photo
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
                {image && <img src={image} alt="New" className="preview-img" />}
                {/* <label>First Name</label>
                <input
                required
                  {...register("first_name")}
                  defaultValue={user.first_name}
                  className="input-field"
                />
                <label>Last Name</label>
                <input
                  required
                  {...register("last_name")}
                  defaultValue={user.last_name}
                  className="input-field"
                /> */}
                <label>UserName</label>
                <input
                  required
                  {...register("username")}
                  defaultValue={user.username}
                  type="text"
                  className="input-field"
                />
                <label>Email</label>
                <input
                  required
                  {...register("email")}
                  defaultValue={user.email}
                  type="email"
                  className="input-field"
                />

                {!loading ? (
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>) : (
                  <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Spinner animation="grow" role="status" style={{ color: "blue", fontSize: "20px", background: "#ACA6FF" }}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}

              </form>
              <button className="close-btn" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
        {/* <button className="delete-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button> */}
      </div>
    </div>
  );
}
