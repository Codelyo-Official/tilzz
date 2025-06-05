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
import { story } from '../../types/story';
import Dots from "../../common/components/dots";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const Reports = () => {

  console.log("story preview rendered")
  const { user } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(true);

  const [activeEpisode, setActiveEpisode] = useState<number | null>(null);
  const [tabselected, setTabselected] = React.useState("quarantined")
  const [reports, setReports] = React.useState<any>([]);
  const [updateEpisodeObject, setUpdateEpisodeObject] = React.useState<any>({
    title: "",
    content: "",
  });

  const handleEpisodeToggle = (episode: any) => {
    setActiveEpisode(activeEpisode === episode.id ? null : episode.id);
    setUpdateEpisodeObject({
      title: episode.title,
      content: episode.content,
    })
  };

  const cancel = () => {
    setActiveEpisode(null);
  }

  const checkifanyepisodehasstatus = (report: any, tempstatus: string) => {
    for (let i = 0; i < report.quarantined_episodes.length; i++) {
      if (report.quarantined_episodes[i].status === tempstatus)
        return true;
    }
    return false;
  }

  const getAllQuarantinedStories = async () => {
    setLoading(true)
    try {
      const token = sessionStorage.getItem("token");
      const QEpisodesApi_response = await axios.get(`${API_BASE_URL}/api/stories/api/quarantined-episodes/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(QEpisodesApi_response);
      setLoading(false);
      setReports(QEpisodesApi_response.data);
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



  const handleUpdateEpisode = async (ep: any) => {
    // Add the new episode (this is just for demonstration purposes)

    try {
      const token = sessionStorage.getItem("token");
      const updateEpisode_response = await axios.put(`${API_BASE_URL}/api/stories/episodes/${ep.id}/`, { ...updateEpisodeObject, title: ep.title }, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(updateEpisode_response);
      console.log('episdoe updated')
      setUpdateEpisodeObject({
        title: '',
        content: ''
      });
    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
      }
    }

  }

  const submitforapproval = async (ep: any, st: any) => {
    console.log(st)
    // /api/stories/api/episodes/{episode_id}/submit-for-approval/
    if (updateEpisodeObject.content.trim().length === 0) {
      alert("content cannot be empty");
      return;
    }

    await handleUpdateEpisode(ep);

    try {
      const token = sessionStorage.getItem("token");
      const QEpisodesApi_response = await axios.post(`${API_BASE_URL}/api/stories/api/episodes/${ep.id}/submit-for-approval/`, {
        title: ep.title,
        content: ep.content
      }, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(QEpisodesApi_response);
      alert("report submitted for approval")

      let result = reports.map((r: any) => {
        if (r.id === st.id) {
          let temp_eps = r.quarantined_episodes.filter((e: any) => e.id !== ep.id)
          return { ...r, quarantined_episodes: temp_eps }
        } else
          return r;
      })
      setReports(result);

      setActiveEpisode(null);
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
    if (reports.length === 0)
      getAllQuarantinedStories();
  }, [])

  return (
    <>
      {loading ? (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Dots />
        </div>) : (<>
          {reports.map((report: any) => {
            if (checkifanyepisodehasstatus(report, tabselected))
              return (
                <div className="story-preview">
                  <div className="story-header">
                    <img src={`${API_BASE_URL}/${report.story.cover_image}`} alt="Story Preview" className="story-image" />
                    <div className="story-info">
                      <h2 className="story-title">{report.story.title}</h2>
                    </div>
                  </div>

                  <div className="episodes-list">
                    <h3>Episodes to Review</h3>
                    {report.quarantined_episodes.map((episode: any) => {
                      if (episode.status === tabselected)
                        return (
                          <div key={episode.id} className="episode">
                            <div className="episode-header" onClick={() => handleEpisodeToggle(episode)}>
                              {/* <h4>episode {episode.episode} : {episode.title}</h4> */}
                              <h4 className='episode-title-ok-al'> {episode.content}</h4>
                              <button className="edit-episode-btn"><FiEdit style={{ height: "14px", width: "14px", display: "inline-block", margin: "0", color: "black", marginRight: "5px", marginTop: "-2px" }} /></button>
                              <span>{activeEpisode === episode.id ? <FiArrowUpCircle /> : <FiArrowDownCircle />}</span>
                            </div>
                            {activeEpisode === episode.id && (
                              <div className="episode-content" style={{ marginTop: "20px" }}>
                                <div className="new-episode-form">
                                  {episode.status === "quarantined" ? (<textarea onChange={(e: any) => {
                                    setUpdateEpisodeObject({ ...updateEpisodeObject, content: e.target.value })
                                  }}>{episode.content}</textarea>) : (<p>{episode.content}</p>)}
                                  {episode.status === "quarantined" ? (<div style={{ display: "flex", justifyContent: "center" }}>
                                    <button className="new-episode-submit" style={{ margin: "5px" }} onClick={() => {
                                      submitforapproval(episode, report);
                                    }}>submit for approval</button>
                                    <button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                                      cancel();
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
        </>)
      }

    </>
  );
};

export default Reports;
