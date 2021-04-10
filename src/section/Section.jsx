import React from 'react'
import './section.css'

function Section({ children, header, extra, ...props }) {
    return (
        <div className='section' {...props}>
            <div className="sectionHeader">
                <h1>{ header }</h1>
                { extra }
            </div>
            
            { children }
        </div>
    )
}

export default Section
