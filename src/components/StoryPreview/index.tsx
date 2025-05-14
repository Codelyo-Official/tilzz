import React, { useState, useMemo } from 'react';
import './StoryPreview.css';
import { useAuth } from "../../contexts/AuthProvider";
import { FiEdit } from 'react-icons/fi';
import 'react-quill/dist/quill.snow.css';
import { FiArrowDownCircle, FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineReportProblem } from "react-icons/md";

import { FaRegHeart } from "react-icons/fa";
import { FiArrowUpCircle } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { FaRegFlag } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';
import { ApiError } from '../../types/apiError';
import { story } from '../../types/story';
import axios from 'axios';

// type episode = {
//   current_variation_number: number;
//   variations: string[],
//   id: number,
//   episode: number,
//   title: string,
//   content: string;
//   creator: string;
// }

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const StoryPreview = () => {

  console.log("story preview rendered")

  const [dataStory, setDataStory] = React.useState<story | null>(null);
  const [episodes, setEpisodes] = React.useState<any>([]);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isAddNewVersion, setIsAddNewVersion] = useState(false);
  const [newVAt, setNewVAt] = useState<any | null>(null)
  const { user } = useAuth();
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [showNewEpisodeForm, setShowNewEpisodeForm] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const paramvalue = queryParams.get('storyId');

  const [addNewEpisodeObject, setAddNewEpisodeObject] = React.useState<any>({
    title: "",
    content: "",
  });

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
      if(StoryApi_response.data.versions.length>0){
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

  const getEpisodes = async (ver:number) => {
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
    setShowNewEpisodeForm(true);
  };

  const handleSubmitNewEpisode = async () => {
    // Add the new episode (this is just for demonstration purposes)

    if (addNewEpisodeObject.title.trim().length === 0 || addNewEpisodeObject.content.trim().length === 0)
    {
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
      const token = sessionStorage.getItem("token");
      const createNewEpisode_response = await axios.post(`${API_BASE_URL}/api/stories/${paramvalue}/episodes/ `, temp_obj, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(createNewEpisode_response);
      setEpisodes([...episodes, createNewEpisode_response.data])

    } catch (err: any) {
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

    if (addNewEpisodeObject.title.trim().length === 0 || addNewEpisodeObject.content.trim().length === 0)
      {
        alert("title and content cannot be empty");
        return;
      }
  

    console.log(newVAt)
    console.log(addNewEpisodeObject)

    try {
      const token = sessionStorage.getItem("token");
      const createNewEpisodeVersion_response = await axios.post(`${API_BASE_URL}/api/stories/episodes/${newVAt.id}/branch/`, addNewEpisodeObject, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(createNewEpisodeVersion_response);

      const targetId = newVAt.id;
      const index = episodes.findIndex((ep:any) => ep.id === targetId);

      if (index !== -1) {
        const updatedEpisodes = [
          ...episodes.slice(0, index),  
          createNewEpisodeVersion_response.data                
        ];

        setEpisodes(updatedEpisodes);
      }

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }

    cancelVersion();
  }

  const nextVariation = async (ep:any) => {
    console.log(ep)
    const mres = await getEpisodes(ep.next_version.version)
    //console.log(mres);
    if(mres.versions.length>0 && mres.versions[0].episodes.length>0){
      let toadd = [...mres.versions[0].episodes];
      let result = [];
      for(let i = 0; i< episodes.length;i++){
        if(episodes[i].id!==ep.id){
          result.push(episodes[i]);
        }else{
          break;
        }
      }
      result=[...result,...toadd]
      console.log("new episodes:",result)
      setEpisodes(result)
    }

  }

  const prevVariation = async (ep:any) => {
    console.log(ep)
    const mres = await getEpisodes(ep.previous_version.version)
    console.log(mres)

    if(mres.versions.length>0 && mres.versions[0].episodes.length>0){
      let toadd = [...mres.versions[0].episodes];
      let result = [];
      for(let i = 0; i< episodes.length;i++){
        if(episodes[i].version!==mres.versions[0].episodes[0].version && episodes[i].id!==ep.id){
          result.push(episodes[i]);
        }else{
          break;
        }
      }
      result=[...result,...toadd]
      console.log("new episodes:",result)
      setEpisodes(result)
    }

  }

  const addVersion = (ep: any) => {
    setIsAddNewVersion(true);
    console.log(ep)
    setNewVAt(ep);
    setAddNewEpisodeObject({
      title: "",
      content: "",
    })
  }

  const cancelVersion = () => {
    setIsAddNewVersion(false);
    setNewVAt(null);
    setAddNewEpisodeObject({
      title: "",
      content: "",
    })
  }

  const cancelNewEpisode = () =>{
    setIsAddNewVersion(false);
    setNewVAt(null);
    setAddNewEpisodeObject({
      title: "",
      content: "",
    })
    setShowNewEpisodeForm(false);
  }

  return (
    <>
      {dataStory === null ? (
        <div>loading</div>
      ) : (
        <div className="story-preview">
          <div className="story-header">
            <img src={dataStory.cover_image} alt="Story Preview" className="story-image" />
            <div className="story-info">
              <h2 className="story-title">{dataStory.title}</h2>
            </div>
          </div>

          <div className="episodes-list" style={{ paddingTop: "0px", marginTop: "0px" }}>
            {episodes.map((episode: any) => (
              (episode.number >= activeEpisode && loading) ? (<div key={episode.id} style={{ width: "100%", backgroundColor: "#F1F1F1", borderRadius: "10px", marginTop: "10px", marginBottom: "10px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spinner animation="grow" role="status" variant="light" style={{ color: "white", fontSize: "20px" }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>) : (
                <>
                  {(newVAt === null || (episode.id < newVAt.id)) && (
                    <div key={episode.id} className="episode">
                      <div className="episode-content">
                        {episode.id === currentEditId ? (
                          <div className="new-episode-form">
                            <textarea>{episode.content}</textarea>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <button className="new-episode-submit" style={{ margin: "5px" }}>save</button>
                              <button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                                setCurrentEditId(null)
                              }} >Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <p>{episode.title} <span className="episode-options">
                            {episode.next_version===null && (
                              <button className="tooltip1" onClick={() => {
                                addVersion(episode)
                              }}><IoAddCircleOutline /><span className="tooltiptext1">Add Version</span></button>
                            )}
                            {episode.author_id === user.id && (<button onClick={() => { setCurrentEditId(episode.id) }}><FiEdit /></button>)}
                            <button className="tooltip1"><FaRegHeart /><span className="tooltiptext1">Like</span></button>
                            <button className="tooltip1"><FaRegFlag /><span className="tooltiptext1">Report</span></button>
                            {episode.previous_version!==null && (<button className="tooltip1" onClick={() => {
                              prevVariation(episode);
                            }}><FiArrowLeftCircle /><span className="tooltiptext1">Prev Version</span></button>)}
                            {episode.next_version!==null && (<button className="tooltip1" onClick={() => {
                              nextVariation(episode);
                            }}><FiArrowRightCircle /><span className="tooltiptext1">Next Version</span></button>)}
                            <button className="tooltip1"><MdOutlineReportProblem /><span className="tooltiptext1">Quarantine</span></button>
                            <button className="tooltip1"><TiDeleteOutline /><span className="tooltiptext1">Delete</span></button>
                          </span></p>)}

                      </div>
                    </div>)}
                </>)
            ))}
          </div>


          <div className="add-episode">
            {showNewEpisodeForm || isAddNewVersion ? (
              <div className="new-episode-form">
                <input required type="text" placeholder='chapter title' value={addNewEpisodeObject.title} onChange={(e) => {
                  setAddNewEpisodeObject((prev: any) => ({ ...prev, title: e.target.value }));
                }} />
                <textarea required placeholder='content' value={addNewEpisodeObject.content} onChange={(e) => {
                  setAddNewEpisodeObject((prev: any) => ({ ...prev, content: e.target.value }));
                }}></textarea>
                <div style={{ display: "flex", justifyContent: "center" }}>
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

                </div>
              </div>
            ) : (
              <button className="new-episode-btn" onClick={handleNewEpisode}>
                Add New Episode
              </button>
            )}
          </div>

        </div>)}
    </>
  );
};

export default StoryPreview;
