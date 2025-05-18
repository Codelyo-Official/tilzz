import React, { useState, useMemo } from 'react';
import { useAuth } from "../../contexts/AuthProvider";
import { FiEdit } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FiArrowDownCircle, FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FiArrowUpCircle } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { FaRegFlag } from "react-icons/fa";
import { ApiError } from '../../types/apiError';
import axios from 'axios';

type episode = {
  id: number,
  episode: number,
  title: string,
  content: string;
  creator: string;
  status:string;
}

type story = {
  storyId: string;
  storyImage: string;
  title: string;
  description: string;
  creator: string;
  episodes: episode[]
}


const mastories:story[] = [
  {
    storyId: "5bhja9",
    storyImage: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
      "&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: 'The Mysterious Journey',
    description: 'Follow the journey of a young explorer seeking the hidden treasures of the ancient world.',
    creator: 'user123',
    episodes: [

      {
        id: 2,
        episode: 2,
        title: 'The Forbidden Temple',
        content: 'A forbidden temple stands in their path, filled with puzzles and dangers',
        creator: 'johndoe',
        status: "review"
      },
    ],
  },
  {
    storyId: "5b09hja9",
    storyImage: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
      "&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: 'New Era',
    description: 'this is another story here',
    creator: 'user123',
    episodes: [

      {
        id: 2,
        episode: 2,
        title: 'the start of new era',
        content: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
  
  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
        creator: 'johndoe',
        status: "approval"

      },

      {
        id: 3,
        episode: 3,
        title: 'the start of new era 2',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        creator: 'johndoe',
        status: "review"
      },
    ],
  }
]

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const Reports = () => {

  console.log("story preview rendered")
  const { user } = useAuth();
  const [activeEpisode, setActiveEpisode] = useState<number | null>(null);
  const [tabselected, setTabselected] = React.useState("review")

  const handleEpisodeToggle = (episodeId:number) => {
    setActiveEpisode(activeEpisode === episodeId ? null : episodeId);
  };

  const checkifanyepisodehasstatus = (st:story, tempstatus:string) => {
    for (let i = 0; i < st.episodes.length; i++) {
      if (st.episodes[i].status === tempstatus)
        return true;
    }
    return false;
  }

  const getAllQuarantinedStories = async () =>{
    try {
      const token = sessionStorage.getItem("token");
      const QEpisodesApi_response = await axios.get(`${API_BASE_URL}/api/stories/episode-reports/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(QEpisodesApi_response);

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }

  }

  React.useEffect(()=>{
    getAllQuarantinedStories();
  },[])

  return (
    <>
      <div style={{ width: "100%", height: "60px", display: "flex", justifyContent: "flex-end", paddingRight: "40px", }}>
        <button className={`tabs-select ${tabselected === "review" ? "tab-selected" : ""}`} onClick={() => {
          setTabselected('review')
        }}>To Review</button>
        <button className={`tabs-select ${tabselected === "approval" ? "tab-selected" : ""}`} onClick={() => {
          setTabselected('approval')
        }}>Approval Pending</button>
      </div>
      {mastories.map(st => {
        if (checkifanyepisodehasstatus(st, tabselected))
          return (
            <div className="story-preview">
              <div className="story-header">
                <img src={st.storyImage} alt="Story Preview" className="story-image" />
                <div className="story-info">
                  <h2 className="story-title">{st.title}</h2>
                  {/* <p className="story-description">{st.description}</p> */}
                </div>
              </div>

              <div className="episodes-list">
                <h3>Episodes to Review</h3>
                {st.episodes.map((episode) => {
                  if (episode.status === tabselected)
                    return (
                      <div key={episode.id} className="episode">
                        <div className="episode-header" onClick={() => handleEpisodeToggle(episode.id)}>
                          {/* <h4>episode {episode.episode} : {episode.title}</h4> */}
                          <h4 className='episode-title-ok-al'> {episode.content}</h4>
                          {episode.creator === user.username && (
                            <button className="edit-episode-btn"><FiEdit style={{ height: "14px", width: "14px", display: "inline-block", margin: "0", color: "black", marginRight: "5px", marginTop: "-2px" }} /></button>
                          )}
                          <span>{activeEpisode === episode.id ? <FiArrowUpCircle /> : <FiArrowDownCircle />}</span>
                        </div>
                        {activeEpisode === episode.id && (
                          <div className="episode-content" style={{ marginTop: "20px" }}>
                            <div className="new-episode-form">
                              {episode.status === "review" ? (<textarea>{episode.content}</textarea>) : (<p>{episode.content}</p>)}
                              {episode.status === "review" ? (<div style={{ display: "flex", justifyContent: "center" }}>
                                <button className="new-episode-submit" style={{ margin: "5px" }}>submit for approval</button>
                                <button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                                }} >Cancel</button>
                              </div>) : (<p>Pending for approval</p>)}

                            </div>
                            <div className="episode-options">

                            </div>
                          </div>
                        )}
                      </div>);
                  else
                    return (<div></div>)
                })}
              </div>

            </div>);

      })}

    </>
  );
};

export default Reports;
