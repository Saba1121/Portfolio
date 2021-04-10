import React from 'react'
import './header.css'

import { Link } from 'react-router-dom'

function Header({ setAboutPosition, setContactPosition }) {
    return (
        <div className='header'>
            <div className="left">
                <h2 className='name'>Saba Silagadze</h2>
            </div>

            <div className="right">
                <p onClick={() => setAboutPosition('0')}>ABOUT</p>

                <p onClick={() => setContactPosition('0')}>CONTACT</p>
            </div>
        </div>
    )
}

export default Header
