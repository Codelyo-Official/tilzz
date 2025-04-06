import React,{useEffect,useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { links } from '../../data/dummy';
import { useSelector, useDispatch } from 'react-redux';
import {setActiveTab} from "../../features/tabSlice";
import { FiAlignLeft } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();
  const {logout} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
  console.log("sidebar component rendered");
  // const activeMenu = useSelector(((state) => state.activeTab.activeTab));
  // console.log(activeMenu)
  // const dispatch = useDispatch();
  const [activeMenu,setActiveMenu] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 780);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleActiveMenu = (name) => {
    if(name==="user-logout"){
        const res = logout();
        if (res.success) {
            
            navigate("/login");
        }
    }else{
      setActiveMenu(name)
      //dispatch(setActiveTab(name));
      setIsOpen(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          <button className="menu-btn" onClick={toggleSidebar}>
            {/* {isOpen ? 'Close' : 'Open'} */}<FiAlignLeft style={{width:"20px",height:"20px"}}/>
          </button>
          <div className={`sidebar ${isOpen ? 'open' : ''}`}>
              {links.map((item) => (
                      <div key={item.title}>
                        <h4 className="leftbar-heading">
                          {item.title}
                        </h4>
                        <div className="leftbar-items">
                          {item.links.map((link) => (
                              <NavLink
                              to={`/dashboard?activeTab=${link.slug}`}
                                key={link.name}
                                onClick={()=>{handleActiveMenu(link.slug)}}
                                className={activeMenu===link.slug ? "active-leftbar" : ""}
                              >
                                {link.icon} {link.name}
                              </NavLink>
                          ))}
                        </div>
                      </div>
                ))}
          </div>
          <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      </>
      ):(
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            <>
              <div>
                {links.map((item) => (
                  <div key={item.title}>
                    <h4 className="leftbar-heading">
                      {item.title}
                    </h4>
                    <div className="leftbar-items">
                      {item.links.map((link) => (
                          <NavLink
                            to={`/dashboard?activeTab=${link.slug}`}
                            key={link.name}
                            onClick={()=>{handleActiveMenu(link.slug)}}
                            className={activeMenu===link.slug ? "active-leftbar" : ""}
                          >
                            {link.icon} {link.name}
                          </NavLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
        </div>
      )}
    </>
  );
};

export default Sidebar;