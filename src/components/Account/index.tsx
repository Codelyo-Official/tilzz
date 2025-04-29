import React from "react";
import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Trash2, Upload } from "lucide-react";
import { User } from "../../types/user";
import { useAuth } from "../../contexts/AuthProvider";
import "./AccountPage.css";

type FormData = {
  first_name: string;
  last_name: String;
  email: string;
};

const API_BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';


export default function Account() {
  console.log("account rendered");

  const { register, handleSubmit } = useForm<FormData>();
  const { user }: any = useAuth();


  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>(user.avatar);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setOpen(false);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDeleteAccount = () => {
    
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile Settings</h2>
        <div className="profile-avatar">
          <img src={`${API_BASE_URL}${user.profile_picture}`} alt="Profile" className="avatar-img" />
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
                <label>First Name</label>
                <input
                  {...register("first_name")}
                  defaultValue={user.first_name}
                  className="input-field"
                />
                <label>Last Name</label>
                <input
                  {...register("last_name")}
                  defaultValue={user.last_name}
                  className="input-field"
                />
                <label>Email</label>
                <input
                  {...register("email")}
                  defaultValue={user.email}
                  type="email"
                  className="input-field"
                />
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </form>
              <button className="close-btn" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
        <button className="delete-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
