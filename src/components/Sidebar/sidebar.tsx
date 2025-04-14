import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { links } from '../../data/dummy';
import { useSelector } from 'react-redux';
import { FiAlignLeft } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../state/store"; // adjust path



const Sidebar = () => {

  console.log("sidebar component rendered");

  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
  const activeMenu = useSelector(((state:RootState) => state.activeTab.activeTab));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 780);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const handleActiveMenu = (name:string) => {
    if (name === "user-logout") {
      const res = logout();
      if (res.success) {

        navigate("/login");
      }
    } else {
      if (isMobile)
        setIsOpen(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <>
          <button className="menu-btn" onClick={toggleSidebar}>
            {/* {isOpen ? 'Close' : 'Open'} */}<FiAlignLeft style={{ width: "20px", height: "20px" }} />
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
                      onClick={() => { handleActiveMenu(link.slug) }}
                      className={activeMenu === link.slug ? "active-leftbar" : ""}
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
      ) : (
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
                        onClick={() => { handleActiveMenu(link.slug) }}
                        className={activeMenu === link.slug ? "active-leftbar" : ""}
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