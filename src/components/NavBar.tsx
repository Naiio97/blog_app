import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiArrowNarrowRight } from "react-icons/hi"

import '../style/nav_bar.scss';
import logo from '../assets/logo.jpeg';


const NavBar = () => {
    return (
        <div className="nav-background">
            <nav className="nav-bar">
                <div className="left">
                    <NavLink to="/"><img width="40px" src={logo} /></NavLink>
                    <NavLink to='/'>Recent Articles</NavLink>
                    <NavLink to='' className="inactive-link">About</NavLink>
                </div>
                <div className="right">
                    <NavLink to='/login'>Log in <HiArrowNarrowRight /></NavLink>
                </div>
            </nav>
        </div>

    )
}

export default NavBar;