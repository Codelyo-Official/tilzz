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


const dummyData = {
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
    },
  ],
};

const dummyData1 = {
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
    },

    {
      id: 3,
      episode: 3,
      title: 'the start of new era 2',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      creator: 'johndoe',
    },
  ],
};

const Reports = ({ userId }) => {

  const location = useLocation();
  console.log("story preview rendered")
  const { getUser } = useAuth();
  const user = useMemo(() => getUser(), []);
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [showNewEpisodeForm, setShowNewEpisodeForm] = useState(false);
  const [newEpisode, setNewEpisode] = useState({ title: '', content: '' });
  const [value, setValue] = useState('');
  const queryParams = new URLSearchParams(location.search);
  const paramvalue = queryParams.get('storyId');
  //console.log(paramvalue)

  const modules = {
    toolbar: true ? [] : [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': [] }],
      ['image'],
    ]
  };

  const handleEpisodeToggle = (episodeId) => {
    setActiveEpisode(activeEpisode === episodeId ? null : episodeId);
  };

  const handleNewEpisode = () => {
    setShowNewEpisodeForm(true);
  };

  const handleSubmitNewEpisode = () => {
    // Add the new episode (this is just for demonstration purposes)
    console.log('New episode added:', newEpisode);
    setShowNewEpisodeForm(false);
    setNewEpisode({ title: '', content: '' });
  };

  const nextEp = () => {
    console.log(activeEpisode)
    if (activeEpisode !== null)
      setActiveEpisode(activeEpisode + 1);
  }

  const prevEp = () => {
    console.log(activeEpisode)
    if (activeEpisode !== null)
      setActiveEpisode(activeEpisode - 1);
  }

  return (
    <>
      <div className="story-preview">
        <div className="story-header">
          <img src={dummyData.storyImage} alt="Story Preview" className="story-image" />
          <div className="story-info">
            <h2 className="story-title">{dummyData.title}</h2>
            {/* <p className="story-description">{dummyData.description}</p> */}
          </div>
        </div>

        <div className="episodes-list">
          <h3>Episodes to Review</h3>
          {dummyData.episodes.map((episode) => (
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
                <div className="episode-content" style={{marginTop:"20px"}}>
                  {/* <p>{episode.content}</p> */}
                  <div className="new-episode-form">
                    <textarea>{episode.content}</textarea>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button className="new-episode-submit" style={{ margin: "5px" }}>submit for approval</button>
                      <button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                      }} >Cancel</button>
                    </div>
                  </div>
                  <div className="episode-options">
                   
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>


        {/* <div className="add-episode">
          <button className="new-episode-btn" onClick={handleNewEpisode}>
            Submit revision
          </button>
        </div> */}

      </div>
      <div className="story-preview">
        <div className="story-header">
          <img src={dummyData1.storyImage} alt="Story Preview" className="story-image" />
          <div className="story-info">
            <h2 className="story-title">{dummyData1.title}</h2>
            {/* <p className="story-description">{dummyData1.description}</p> */}
          </div>
        </div>

        <div className="episodes-list">
          <h3>Episodes to Review</h3>
          {dummyData1.episodes.map((episode) => (
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
                <div className="episode-content"  style={{marginTop:"20px"}}>
                  <div className="new-episode-form">
                    <textarea>{episode.content}</textarea>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button className="new-episode-submit" style={{ margin: "5px" }}>submit for approval</button>
                      <button style={{ margin: "5px" }} className="new-version-cancel" onClick={() => {
                      }} >Cancel</button>
                    </div>
                  </div>
                  <div className="episode-options">

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>


        {/* <div className="add-episode">
          <button className="new-episode-btn" onClick={handleNewEpisode}>
            Submit revision
          </button>
        </div> */}

      </div>
    </>
  );
};

export default Reports;
