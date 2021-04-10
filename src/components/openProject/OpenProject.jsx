import React from 'react'
import projectList from '../../pages2/projects/projectList'
import './openProject.css'

import Section from '../../section/Section'

function OpenProject({ projectIndex, projectPosition, setProjectPosition }) {
    const project = projectIndex === null ? {} : projectList[projectIndex];

    function clickHandler() {
        setProjectPosition('100vw');

        document.body.style.overflow = 'scroll'
    }

    const links = () => (
        <>
            {  project.url && <a target='_blank' href={project.url}>visit</a> }
            {  project.github && <a target='_blank' href={project.github}>github</a> }
        </>
    )

    return (
        <div className="openProject sliderCard" style={{ transform : `translate(${projectPosition})` }}>
            <div className="closeButton" onClick={clickHandler}>X</div>
            
            <Section header={project.name} extra={links()}>
                <p className='description'>{project?.description}</p>
            </Section>

            <Section header='Techologies Used'>
                <div className="technologyImages">
                    <DisplayTechnologies project={project} />
                </div> 
            </Section>
        </div>
    )
}


const DisplayTechnologies = ({ project }) => project.technologies ? project.technologies.map((x, index) => {
    const image = require(`../../icons/${x}.svg`).default;

    return (
        <div key={index} className='icon'>
            <img src={image} alt=""/>
        </div>
    )
}) : false;

export default OpenProject
