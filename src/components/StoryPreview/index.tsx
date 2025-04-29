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

type episode = {
  current_variation_number: number;
  variations: string[],
  id: number,
  episode: number,
  title: string,
  content: string;
  creator: string;
}

const API_BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';

const StoryPreview = () => {

  console.log("story preview rendered")

  const [dataStory, setDataStory] = React.useState<story | null>(null);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isAddNewVersion, setIsAddNewVersion] = useState(false);
  const [newVAt, setNewVAt] = useState<episode | null>(null)
  const { user } = useAuth();
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [showNewEpisodeForm, setShowNewEpisodeForm] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const paramvalue = queryParams.get('storyId');

  const [addNewEpisodeObject, setAddNewEpisodeObject] = React.useState<any>({
    title: "",
    content: "",
    number: 1
  });

  const getStoryDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const StoryApi_response = await axios.get(`${API_BASE_URL}/api/stories/${paramvalue}/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(StoryApi_response);
      setDataStory(StoryApi_response.data);

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }
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
    console.log('New episode added:', addNewEpisodeObject);

    if (dataStory && dataStory.episodes.length > 1) {
      setAddNewEpisodeObject((prev: any) => ({ ...prev, number: dataStory.episodes.length + 1 }))
    }

    try {
      const token = sessionStorage.getItem("token");
      const createNewEpisode_response = await axios.post(`${API_BASE_URL}/api/stories/${paramvalue}/episodes/`, addNewEpisodeObject, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(createNewEpisode_response);

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

  const nextVariation = (ep: episode) => {


  }

  const prevVariation = (ep: episode) => {

  }

  const addVersion = (ep: episode) => {
    setIsAddNewVersion(true);

  }

  const cancelVersion = () => {
    setIsAddNewVersion(false);
    setNewVAt(null);
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
            {dataStory.episodes.map((episode: any) => (
              (episode.number >= activeEpisode && loading) ? (<div key={episode.id} style={{ width: "100%", backgroundColor: "#F1F1F1", borderRadius: "10px", marginTop: "10px", marginBottom: "10px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spinner animation="grow" role="status" variant="light" style={{ color: "white", fontSize: "20px" }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>) : (
                <>
                  <div key={episode.id} className="episode">
                    <div className="episode-content">
                      {episode.id === currentEditId ? (
                        <div className="new-episode-form">
                          <textarea>{episode.title}</textarea>
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <button className="new-episode-submit" style={{ margin: "5px" }}>save</button>
                            <button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                              setCurrentEditId(null)
                            }} >Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p>{episode.title} <span className="episode-options">
                          {episode.number > 1 && (
                            <button className="tooltip1" onClick={() => {
                              addVersion(episode)
                            }}><IoAddCircleOutline /><span className="tooltiptext1">Add Version</span></button>
                          )}
                          {/* {episode.creator === user.username && (<button onClick={() => { setCurrentEditId(episode.id) }}><FiEdit /></button>)} */}
                          <button className="tooltip1"><FaRegHeart /><span className="tooltiptext1">Like</span></button>
                          <button className="tooltip1"><FaRegFlag /><span className="tooltiptext1">Report</span></button>
                          {episode.has_previous_version && (<button className="tooltip1" onClick={() => {
                            prevVariation(episode);
                          }}><FiArrowLeftCircle /><span className="tooltiptext1">Prev Version</span></button>)}
                          {episode.has_next_version && (<button className="tooltip1" onClick={() => {
                            nextVariation(episode);
                          }}><FiArrowRightCircle /><span className="tooltiptext1">Next Version</span></button>)}
                          <button className="tooltip1"><MdOutlineReportProblem /><span className="tooltiptext1">Quarantine</span></button>
                          <button className="tooltip1"><TiDeleteOutline /><span className="tooltiptext1">Delete</span></button>
                        </span></p>)}

                    </div>
                  </div>
                </>)
            ))}
          </div>


          <div className="add-episode">
            {showNewEpisodeForm || isAddNewVersion ? (
              <div className="new-episode-form">
                <form >
                  <input required type="text" placeholder='chapter title' value={addNewEpisodeObject.title} onChange={(e) => {
                    setAddNewEpisodeObject((prev: any) => ({ ...prev, title: e.target.value }));
                  }} />
                  <textarea required placeholder='content' value={addNewEpisodeObject.content} onChange={(e) => {
                    setAddNewEpisodeObject((prev: any) => ({ ...prev, content: e.target.value }));
                  }}></textarea>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button type="submit" className="new-episode-submit" style={{ margin: "5px" }} onClick={handleSubmitNewEpisode}>{isAddNewVersion ? (<>Submit New Version</>) : (<>Submit New Episode</>)}</button>
                    {isAddNewVersion && (<button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                      cancelVersion()
                    }}>Cancel</button>)}

                  </div>
                </form>
              </div>
            ) : (
              <button className="new-episode-btn" onClick={handleNewEpisode}>
                {isAddNewVersion ? (<>Add Version</>) : (<>Add New Episode</>)}
              </button>
            )}
          </div>

        </div>)}
    </>
  );
};

export default StoryPreview;
