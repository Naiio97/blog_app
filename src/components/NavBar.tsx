import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';

import '../style/nav_bar.scss';
import logo from '../assets/logo.jpeg';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const logout = (): void => {
    localStorage.removeItem('access_token');
    navigate('/Login');
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      setIsLogged(true);
    }
  }, []);
  return (
    <div className="nav-background">
      <nav className="nav-bar">
        <div className="left">
          <NavLink to="/">
            <img width="40px" src={logo} />
          </NavLink>
          <NavLink to="/">Recent Articles</NavLink>
          <NavLink to="" className="inactive-link">
            About
          </NavLink>
        </div>
        <div className="right">
          {isLogged ? (
            <div className="is-logged">
              <NavLink to="/MyArticles">My articles</NavLink>
              <NavLink to="/editArticle">Create Article</NavLink>
              <FiLogOut onClick={logout} className="log-out"></FiLogOut>
            </div>
          ) : (
            <NavLink to="/login" className="log-in">
              Log in <HiArrowNarrowRight />
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
