import React, { useState, useMemo } from 'react';
import { ChangeEvent, FormEvent } from "react";
import './StoryPreview.css';
import { useAuth } from "../../contexts/AuthProvider";
import { FiEdit } from 'react-icons/fi';
import 'react-quill/dist/quill.snow.css';
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { useLocation } from 'react-router-dom';
import { FaRegFlag } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';
import { ApiError } from '../../types/apiError';
import { story } from '../../types/story';
import axios from 'axios';
import Dots from '../../common/components/dots';
import ModalDialog from "../../common/components/ModalDialog";
import { MdVisibility } from 'react-icons/md';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const StoryPreview = () => {

  console.log("story preview rendered")

  const [dataStory, setDataStory] = React.useState<story | null>(null);
  const [episodes, setEpisodes] = React.useState<any>([]);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const location = useLocation();
  const [isAddNewVersion, setIsAddNewVersion] = useState(false);
  const [newVAt, setNewVAt] = useState<any | null>(null)
  const { user } = useAuth();
  const [showNewEpisodeForm, setShowNewEpisodeForm] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const paramvalue = queryParams.get('storyId');
  const [varChangeAt, setVarChangeAt] = React.useState<any>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [likedepisodes, setLikedEpisodes] = useState<number[]>([]);

  const [addNewEpisodeObject, setAddNewEpisodeObject] = React.useState<any>({
    title: "title of story",
    content: "",
  });

  const [updateEpisodeObject, setUpdateEpisodeObject] = React.useState<any>({
    title: "title of story",
    content: "",
  });

  const [updateStoryObject, setUpdateStoryObject] = React.useState<any>({
    title: "title of story",
    description: "story description",
    visibility: "public",
    // cover_image: ""
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
      setBannerFile(file);
    }
  }

  const getStoryDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const StoryApi_response = await axios.get(`${API_BASE_URL}/api/stories/stories/${paramvalue}/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(StoryApi_response);
      setDataStory(StoryApi_response.data);
      setUpdateStoryObject({
        ...updateStoryObject,
        title: StoryApi_response.data.title,
        visibility: StoryApi_response.data.visibility,
        // cover_image: StoryApi_response.data.cover_image
      })
      if (StoryApi_response.data.versions.length > 0) {
        setEpisodes(StoryApi_response.data.versions[0].episodes)

      }

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }
  }

  const getEpisodes = async (ver: number) => {
    try {
      const token = sessionStorage.getItem("token");
      const EpisodesApi_response = await axios.get(`${API_BASE_URL}/api/stories/stories/${paramvalue}/?versions=${ver}`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(EpisodesApi_response);
      // setEpisodes(EpisodesApi_response.data);
      return EpisodesApi_response.data;

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }

    return null;
  }

  React.useEffect(() => {
    console.log(`sending req to recieve story data for story id:${paramvalue} for user:${user.username}`)
    getStoryDetails();
  }, [paramvalue]);

  const handleNewEpisode = () => {
    setAddNewEpisodeObject({
      ...addNewEpisodeObject, content: "",
    })
    setShowNewEpisodeForm(true);
  };

  const handleSubmitNewEpisode = async () => {
    // Add the new episode (this is just for demonstration purposes)

    if (addNewEpisodeObject.title.trim().length === 0 || addNewEpisodeObject.content.trim().length === 0) {
      alert("title and content cannot be empty");
      return;
    }


    let version;
    if (episodes.length === 0)
      version = null;
    else if (episodes.length > 0) {
      version = episodes[episodes.length - 1].version;
    }
    let temp_obj = { ...addNewEpisodeObject };
    console.log(temp_obj)
    if (version !== null) {
      // do some other stuff
      temp_obj.version_id = version;
    }
    console.log('New episode added:', temp_obj);

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const createNewEpisode_response = await axios.post(`${API_BASE_URL}/api/stories/${paramvalue}/episodes/ `, temp_obj, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(createNewEpisode_response);
      setLoading(false);
      setEpisodes([...episodes, createNewEpisode_response.data])

    } catch (err: any) {
      setLoading(false);

      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }

    setShowNewEpisodeForm(false);
  };

  const handleSubmitNewVersion = async () => {

    if (addNewEpisodeObject.title.trim().length === 0 || addNewEpisodeObject.content.trim().length === 0) {
      alert("title and content cannot be empty");
      return;
    }


    console.log(newVAt)
    console.log(addNewEpisodeObject)

    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");
      const createNewEpisodeVersion_response = await axios.post(`${API_BASE_URL}/api/stories/episodes/${newVAt.id}/branch/`, addNewEpisodeObject, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(createNewEpisodeVersion_response);

      const targetId = newVAt.id;
      const index = episodes.findIndex((ep: any) => ep.id === targetId);

      if (index !== -1) {
        const updatedEpisodes = [
          ...episodes.slice(0, index),
          createNewEpisodeVersion_response.data
        ];
        setLoading(false);


        setEpisodes(updatedEpisodes);
      }

    } catch (err: any) {
      setLoading(false);

      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }

    cancelVersion();
  }

  const handleUpdateEpisode = async () => {
    // Add the new episode (this is just for demonstration purposes)

    if (updateEpisodeObject.title.trim().length === 0 || updateEpisodeObject.content.trim().length === 0) {
      alert("title and content cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");
      const updateEpisode_response = await axios.put(`${API_BASE_URL}/api/stories/episodes/${currentEditId}/`, updateEpisodeObject, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(updateEpisode_response);
      let newresult = episodes.map((ep: any) => {
        if (ep.id !== updateEpisode_response.data.id)
          return ep;
        else
          return updateEpisode_response.data;
      })
      setLoading(false);

      setEpisodes(newresult);
      setUpdateEpisodeObject({
        ...updateEpisodeObject,
        content: ''
      });
      setCurrentEditId(null);

    } catch (err: any) {
      setLoading(false);

      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }

  }

  const nextVariation = async (ep: any) => {
    console.log(ep)
    setVarChangeAt(ep);
    const mres = await getEpisodes(ep.next_version.version)
    //console.log(mres);

    if (mres.versions.length > 0 && mres.versions[0].episodes.length > 0) {
      let toadd = [...mres.versions[0].episodes];
      let result = [];
      for (let i = 0; i < episodes.length; i++) {
        if (episodes[i].id !== ep.id) {
          result.push(episodes[i]);
        } else {
          break;
        }
      }
      result = [...result, ...toadd]
      console.log("new episodes:", result)
      setVarChangeAt(null);
      setEpisodes(result)
    }

  }

  const prevVariation = async (ep: any) => {
    console.log(ep)
    setVarChangeAt(ep);
    const mres = await getEpisodes(ep.previous_version.version)
    console.log(mres)

    if (mres.versions.length > 0 && mres.versions[0].episodes.length > 0) {
      let toadd = [...mres.versions[0].episodes];
      let result = [];
      for (let i = 0; i < episodes.length; i++) {
        if (episodes[i].version !== mres.versions[0].episodes[0].version && episodes[i].id !== ep.id) {
          result.push(episodes[i]);
        } else {
          break;
        }
      }
      result = [...result, ...toadd]
      console.log("new episodes:", result)
      setVarChangeAt(null);

      setEpisodes(result)
    }

  }

  const addVersion = (ep: any) => {
    setIsAddNewVersion(true);
    console.log(ep)
    setNewVAt(ep);
    setAddNewEpisodeObject({
      ...addNewEpisodeObject,
      content: "",
    })
  }

  const cancelVersion = () => {
    setIsAddNewVersion(false);
    setNewVAt(null);
    setAddNewEpisodeObject({
      ...addNewEpisodeObject,
      content: "",
    })
  }

  const cancelNewEpisode = () => {
    setIsAddNewVersion(false);
    setNewVAt(null);
    setAddNewEpisodeObject({
      ...addNewEpisodeObject,
      content: "",
    })
    setShowNewEpisodeForm(false);
  }

  const reportEpisode = async (eid: number) => {

    try {
      const token = sessionStorage.getItem('token');
      const reportEpisode_response = await axios.post(`${API_BASE_URL}/api/stories/episode-reports/`, {
        episode: eid,
        reason: "inappropriate"

      }, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(reportEpisode_response);
      alert('reported successfully')
      if (true || reportEpisode_response.data?.reports_count && reportEpisode_response.data?.reports_count >= 3) {
        let result = episodes.map((ep: any) => {
          if (ep.id === eid) {
            return { ...ep, status: "quarantined", is_reported: true };
          } else
            return ep;
        })

        setEpisodes(result);
      }

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
        alert(errorMessage);
      }
    } finally {
    }
  };

  const deleteEpisode = async (eid: number) => {
    //  /api/stories/episodes/<episode_id>/delete/

    try {
      const token = sessionStorage.getItem("token");
      const DelEpisodesApi_response = await axios.put(`${API_BASE_URL}/api/stories/episodes/${eid}/delete/`, {}, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(DelEpisodesApi_response);


      let result = episodes.map((ep: any) => {
        if (ep.id === eid) {
          return { ...ep, status: "deleted" };
        } else
          return ep;
      })

      setEpisodes(result);

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }
  }

  const confirmReport = (eid: number) => {
    const confirmed = window.confirm("Are you sure you want to report this?");
    if (confirmed) {
      reportEpisode(eid);
    }
  }

  const confirmDelete = (eid: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      deleteEpisode(eid);
    }
  }

  const handleLikeEpisode = async (ep: any) => {
    console.log(ep)
    try {
      const token = sessionStorage.getItem('token');
      const likeEpisode_response = await axios.post(`${API_BASE_URL}/api/episodes/${ep.id}/like/`, {}, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(likeEpisode_response);

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
        alert(errorMessage);
      }
    } finally {
    }
  }

  const checkIfInLiking = (eid: number, ep: any) => {
    if (likedepisodes.includes(eid))
      return true;
    return false;
  }

  const handleUpdateStoryInfo = async (e: any) => {
    e.preventDefault();
    console.log(updateStoryObject)
    if (updateStoryObject.title.trim() === "") {
      alert("title cannot be empty")
      return;
    }

    if (dataStory !== null) {

      const formData = new FormData();
      formData.append('title', updateStoryObject.title);      // your other fields
      formData.append('description', updateStoryObject.description);
      formData.append('visibility', updateStoryObject.visibility);
      // Append the actual file
      if (bannerFile !== null)
        formData.append('cover_image', bannerFile); // payload.file should be a File object

      try {
        setLoading1(true);
        const token = sessionStorage.getItem('token');
        const updateStory_response = await axios.put(`${API_BASE_URL}/api/stories/stories/${dataStory.id}/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
          }
        });
        console.log(updateStory_response);
        setDataStory(updateStory_response.data);
        setOpen(false)
        setLoading1(false);
      } catch (err: any) {
        setLoading1(false);
        console.log(err)
        const apiError = err as ApiError;
        if (apiError.response) {
          const status = apiError.response.status;
          const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
          alert(errorMessage);
        }
      } finally {
      }
    }
  }

  return (
    <>
      {dataStory === null ? (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Dots />
        </div>
      ) : (
        <div className="story-preview">
          <div className="story-header">
            <img src={dataStory.cover_image} alt="Story Preview" className="story-image" />
            {user.id === dataStory.creator && (
              <button className='story-edit-btn' onClick={() => {
                setOpen(prev => !prev);
                setUpdateStoryObject({ ...updateStoryObject, title: dataStory.title })
              }}><FiEdit style={{ color: "white", height: "16px", width: "16px" }} /></button>)}
            <div className="story-info">
              <h2 className="story-title">{dataStory.title}</h2>
            </div>
          </div>

          <div className="episodes-list" style={{ paddingTop: "0px", marginTop: "0px" }}>
            {episodes.map((episode: any, index: number) => (
              (varChangeAt !== null && varChangeAt.id <= episode.id) ? (
                <>
                  {varChangeAt.id === episode.id ? (
                    <div key={episode.id} style={{ width: "100%", backgroundColor: "#F1F1F1", borderRadius: "10px", marginTop: "10px", marginBottom: "10px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Dots />
                    </div>
                  ) : (<></>)}
                </>) : (
                <>
                  {(newVAt === null || (episode.id < newVAt.id)) && (
                    <div key={episode.id} className="episode">
                      <div className="episode-content">
                        {episode.id === currentEditId ? (
                          <div className="new-episode-form">
                            <textarea placeholder='content' onChange={(e) => {
                              setUpdateEpisodeObject((prev: any) => ({ ...prev, content: e.target.value }));
                            }}>{updateEpisodeObject.content}</textarea>
                            {loading ? (
                              <div key={episode.id} style={{ width: "100%", borderRadius: "10px", marginTop: "10px", marginBottom: "10px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Spinner animation="grow" role="status" style={{ color: "blue", fontSize: "20px", background: "#ACA6FF" }}>
                                  <span className="visually-hidden">Loading...</span>
                                </Spinner>
                              </div>) : (<div style={{ display: "flex", justifyContent: "center" }}>
                                <button className="new-episode-submit" style={{ margin: "5px" }} onClick={handleUpdateEpisode}>save</button>
                                <button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                                  setCurrentEditId(null)
                                }} >Cancel</button>
                              </div>)}

                          </div>
                        ) : (
                          <p>{(!episode.is_reported && (episode.status === "public" || episode.status === "private")) ? (episode.content) : (<>under review</>)} <div className="episode-options">
                            {index !== 0 && (
                              <button className="tooltip1" onClick={() => {
                                addVersion(episode)
                              }}><IoAddCircleOutline /><span className="tooltiptext1">Add Version</span></button>
                            )}

                            {(!episode.is_reported && (episode.status === "public" || episode.status === "private")) && episode.creator === user.id && (<button onClick={() => {
                              setCurrentEditId(episode.id);
                              setUpdateEpisodeObject({
                                title: episode.title,
                                content: episode.content
                              });
                            }}><FiEdit /></button>)}
                            {(!episode.is_reported && (episode.status === "public" || episode.status === "private")) && (
                              <button className="tooltip1" onClick={() => {
                                handleLikeEpisode(episode)
                              }}>
                                <div className="heart-icon from-preview">
                                  <svg
                                    className={`heart ${checkIfInLiking(episode.id, likedepisodes) ? 'clicked' : ''}`}
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 541 471">
                                    <path d="M531.74 179.384C523.11 207.414 507.72 237.134 485.99 267.714V267.724C430.11 346.374 362.17 413.124 284.06 466.134C279.83 469.004 274.93 470.444 270.03 470.444C265.12 470.444 260.23 469.004 255.99 466.134C177.88 413.134 109.94 346.374 54.05 267.724C32.32 237.134 16.93 207.414 8.30003 179.384C-3.38997 141.424 -2.73 106.594 10.27 75.8437C23.4 44.7837 49.2 20.9136 82.91 8.61363C114.03 -2.73637 149.33 -2.87637 179.77 8.23363C213.87 20.6836 244.58 45.1136 270.02 79.7436C295.46 45.1136 326.16 20.6836 360.27 8.23363C390.71 -2.87637 426.02 -2.73637 457.13 8.61363C490.84 20.9136 516.64 44.7837 529.77 75.8437C542.77 106.594 543.431 141.424 531.74 179.384Z" />
                                  </svg>

                                </div>
                                <span className="tooltiptext1">Like</span></button>)}
                            {(!episode.is_reported && (episode.status === "public" || episode.status === "private")) && (
                              <button className="tooltip1" onClick={() => {
                                confirmReport(episode.id)
                              }}><FaRegFlag /><span className="tooltiptext1">Report</span></button>)}
                            {episode.previous_version !== null && (<button className="tooltip1" onClick={() => {
                              prevVariation(episode);
                            }}><FiArrowLeftCircle /><span className="tooltiptext1">Prev Version</span></button>)}
                            {episode.next_version !== null && (<button className="tooltip1" onClick={() => {
                              nextVariation(episode);
                            }}><FiArrowRightCircle /><span className="tooltiptext1">Next Version</span></button>)}
                            {/* <button className="tooltip1"><MdOutlineReportProblem /><span className="tooltiptext1">Quarantine</span></button> */}
                            {((!episode.is_reported && (episode.status === "public" || episode.status === "private")) && episode.creator === user.id) && (
                              <button className="tooltip1" onClick={() => {
                                confirmDelete(episode.id)
                              }}><TiDeleteOutline /><span className="tooltiptext1">Delete</span></button>)}
                          </div></p>)}

                      </div>
                    </div>)}
                </>)
            ))}
          </div>


          <div className="add-episode">
            {showNewEpisodeForm || isAddNewVersion ? (
              <div className="new-episode-form">
                <textarea required placeholder='content' value={addNewEpisodeObject.content} onChange={(e) => {
                  setAddNewEpisodeObject((prev: any) => ({ ...prev, content: e.target.value }));
                }}></textarea>
                <div style={{ display: "flex", justifyContent: "center" }}>

                  {loading ? (
                    <Spinner animation="grow" role="status" style={{ color: "blue", fontSize: "20px", background: "#ACA6FF" }}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (<>
                    {isAddNewVersion ? (<>
                      <button className="new-episode-submit" style={{ margin: "5px" }} onClick={() => {
                        console.log("submit new version")
                        handleSubmitNewVersion();
                      }}>Submit New Version</button>
                      <button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                        cancelVersion()
                      }}>Cancel</button>
                    </>) : (
                      <>
                        <button className="new-episode-submit" style={{ margin: "5px" }} onClick={handleSubmitNewEpisode}>Submit New Episode</button>
                        <button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                          cancelNewEpisode();
                        }}>Cancel</button>
                      </>
                    )}
                  </>)}

                </div>
              </div>
            ) : (
              <button className="new-episode-btn" onClick={handleNewEpisode}>
                Add New Episode
              </button>
            )}
          </div>

        </div>)}

      <ModalDialog isOpen={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleUpdateStoryInfo} className="create-story-form">

          <div >
            <div >
              <h2 id='story-title-edit-id'>Edit Story Details</h2>
              <label style={{ fontSize: "14px" }}>Title</label>
              <input
                type="text"
                id="story-title-id"
                name="story-title"
                value={updateStoryObject !== null ? (updateStoryObject.title) : ("")}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdateStoryObject({ ...updateStoryObject, title: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="banner-image"  style={{ fontSize: "14px" ,marginTop:"10px"}}>Upload Banner Image</label>
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

            {!loading1 ? (
              <div style={{width:"fit-content", marginLeft:"auto",marginRight:"auto"}}>
                <button type="submit"
                style={{  fontSize: "14px",
                  width:"120px",
                  padding:"8px",
                  margin:"0"
                }}>Save</button>
                <button type="button" style={{  fontSize: "14px",
                width:"120px",
                padding:"8px",
                margin:"0",
                border:"1px solid",
                borderRadius:"22px",
                marginLeft:"5px",
                borderColor:"#e54646",color:"#e54646"
              }} onClick={() => setOpen(false)}>
                  Cancel
                </button>
              </div>) : (
              <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spinner animation="grow" role="status" style={{ color: "blue", fontSize: "20px", background: "#ACA6FF" }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </div>
        </form>
      </ModalDialog>
    </>
  );
};

export default StoryPreview;
