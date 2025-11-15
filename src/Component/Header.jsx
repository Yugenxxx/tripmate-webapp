import React, { useEffect, useState } from 'react';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user info
  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setUserInfo(null);

    try {
      const res = await axios.get('http://localhost:8080/api/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserInfo(res.data);
    } catch (err) {
      console.error(err);
      setUserInfo(null);
    }
  };

  useEffect(() => { fetchUserInfo(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <header>
      {/* Top Header */}
      <div id="top-header" className={`top-header ${isScrolled ? 'hide' : 'show'}`}>
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <ul className="list-inline mb-0 d-flex gap-3 contact-info">
            {userInfo && (
              <>
                <li><i className="fa fa-phone me-1"></i> {userInfo.phone}</li>
                <li><i className="fa fa-envelope-o me-1"></i> {userInfo.email}</li>
                <li><i className="fa fa-map-marker me-1"></i> {userInfo.address}</li>
              </>
            )}
          </ul>
          <ul className="list-inline mb-0 d-flex gap-3 account-links">
            <li><NavLink to="/AlbumByTrip">Album</NavLink></li>
            {userInfo ? (
              <li>
                <button className="btn btn-link p-0 text-decoration-none" onClick={handleLogout} style={{ cursor: 'pointer', color: 'white' }}>Logout</button>
              </li>
            ) : (
              <li><NavLink to="/login"><i className="fa fa-user-o me-1"></i> Sign In</NavLink></li>
            )}
            <li>
              <NavLink to="/editprofile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Menu */}
      <nav className={`navbar navbar-expand-lg main-navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src="/assets/img/logo.png" alt="TripMate" width="80" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Menu items */}
              <li className="nav-item"><NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink></li>
              <li className="nav-item"><NavLink to="/trippage" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>My Trip</NavLink></li>
              <li className="nav-item"><NavLink to="/hotel" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Hotel</NavLink></li>
              <li className="nav-item"><NavLink to="/budget" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Budget</NavLink></li>
              <li className="nav-item"><NavLink to="/Blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Blog</NavLink></li>
              <li className="nav-item"><NavLink to="/feel" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Feels</NavLink></li>
              <li className="nav-item"><NavLink to="/prediction" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>PredictionAI</NavLink></li>
              <li className="nav-item"><NavLink to="/feedback" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Feedback</NavLink></li>
              <li className="nav-item"><NavLink to="/safety" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Safety</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

