import React from "react";
import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Trash2, Upload } from "lucide-react";
import { User } from "../../types/user";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";
import { ApiError } from "../../types/apiError";
import "./AccountPage.css";

type FormData = {
  first_name: string;
  last_name: String;
  username: string;
};

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Account() {
  console.log("account rendered");

  const { register, handleSubmit } = useForm<FormData>();
  const { user,setUser }: any = useAuth();


  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>(user.avatar);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
  //   try {
  //     const token = sessionStorage.getItem("token");
  //     const updateUserInfoApi_response = await axios.put(`${API_BASE_URL}/api/accounts/profile/`,data, {
  //         headers: {
  //             Authorization: `Token ${token}`,
  //         }
  //     });
  //     console.log(updateUserInfoApi_response);
  //     setUser(updateUserInfoApi_response.data);
  //     localStorage.setItem('user', JSON.stringify(updateUserInfoApi_response.data));

  // } catch (err: any) {
  //     console.log(err)
  //     const apiError = err as ApiError;
  //     if (apiError.response) {
  //         const status = apiError.response.status;
  //         const errorMessage = apiError.response.data?.username || 'could not update user info';
  //         if(Array.isArray(errorMessage)){
  //           alert(errorMessage[0])
  //         }else{
  //           alert(errorMessage)
  //         }
  //     }
  // }
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
          {/* <img src={user.profile_picture!==null && user.profile_picture.startsWith('http')
            ? user.profile_picture
            : `${API_BASE_URL}${user.profile_picture}`} alt="Profile" className="avatar-img" /> */}
                        <img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} className="avatar-img"/>

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
                />
                <label>UserName</label>
                <input
                required
                  {...register("username")}
                  defaultValue={user.username}
                  type="text"
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
        {/* <button className="delete-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button> */}
      </div>
    </div>
  );
}
