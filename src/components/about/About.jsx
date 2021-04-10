import React from 'react'
import './about.css'
import skills from './skills'
import Section from '../../section/Section'

function About({ aboutPosition, setAboutPosition}) {
    return (
        <div className='about sliderCard' style={{ transform : `translateX(${aboutPosition})` }}>
            <div className="closeButton" onClick={() => setAboutPosition('100vw')}>X</div>

            <Section header='MERN Stack Web Developer'>
                <p>MERN Stack Developer based in Georgia, Europe</p>
                <br/>
                <p>Timezone GMT+4</p>
                <br/>
                <p>3 Years experience of writing code</p>
            </Section>

            <Section header='skills'>
                <div className="skills">
                    <DisplaySkills />
                </div>
            </Section>
        </div>
    )
}


const DisplaySkills = () => skills.map((x, index) => (
    <div key={index} className="skill">
        <img src={require(`../../icons/${x}.svg`).default} alt={x} />
    </div>
))

export default About
