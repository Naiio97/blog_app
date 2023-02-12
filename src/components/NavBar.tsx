import React from 'react'
import { Link } from 'react-router-dom'
import { HiArrowNarrowRight } from "react-icons/hi"

import '../style/nav_bar.scss'


const NavBar = () => {
    return (
        <div className="background">
            <div className="nav-bar">
                <div className="left">
                    <Link to='/'>Recent Articles</Link>
                    <Link to=''>About</Link>
                </div>
                <div className="right">
                    <Link to='/login'>Log in <HiArrowNarrowRight className='narrow' /></Link>
                </div>
            </div>
        </div>

    )
}

export default NavBar;