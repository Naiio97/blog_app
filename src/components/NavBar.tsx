import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';


import '../style/nav_bar.scss';
import logo from '../assets/logo.jpeg';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const logout = (): void => {
    localStorage.removeItem('access_token');
    navigate('/Login');
  };

  const responsiveMenu = (): void => {
    let iconS: Element | null = document.querySelector('.nav-links');

    if (iconS && iconS.className === 'nav-links') {
      iconS.className += ' responsive-menu';
    } else {
      iconS?.setAttribute('class', 'nav-links');
    }
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
        <button className="menu-icon" onClick={responsiveMenu}>
          <GiHamburgerMenu />
        </button>
        <NavLink to="/">
          <img width="40px" src={logo} />
        </NavLink>
        <div className="nav-links">
          <div className="left">
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
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
