import React, { useState } from 'react'
import './projects.css'
import projectList from './projectList';
import { pageVariants, pageTransition } from "../../pageTransition";
import { motion } from "framer-motion";

import OpenProject from '../../components/openProject/OpenProject'
import About from '../../components/about/About';
import Contact from '../../components/contact/Contact';

function Projects({ aboutPosition, setAboutPosition, contactPosition, setContactPosition }) {
    const [projectIndex, setProjectIndex] = useState(null);
    const [projectPosition, setProjectPosition] = useState('100vw');

    return (
        <>
            <motion.div 
                className="projects" 
                exit="out"
                animate="in"
                initial="initial"
                transition={pageTransition} 
                variants={pageVariants}
            >   
                <ProjectsMap 
                    setProjectIndex={setProjectIndex}
                    setProjectPosition={setProjectPosition}
                />

            </motion.div>
            
            <OpenProject 
                projectIndex={projectIndex}
                projectPosition={projectPosition}
                setProjectPosition={setProjectPosition}
            />

            <About 
                aboutPosition={aboutPosition}
                setAboutPosition={setAboutPosition}
            />

            <Contact 
                contactPosition={contactPosition}
                setContactPosition={setContactPosition}
            />
        </>
    )
}

function ProjectsMap({ setProjectIndex, setTranslateY, setProjectPosition }) {
    return projectList.map((x, index) => (
        <Project 
            name={x.name}
            image={x.image}
            index={index}
            key={index}
            setProjectIndex={setProjectIndex}
            setTranslateY={setTranslateY}
            setProjectPosition={setProjectPosition}
        />
    ))
}


function Project({ name, image, setProjectIndex, index, setProjectPosition }) {
    const img = require(`./images/${image}`).default;

    function clickHandler() {
        setProjectIndex(index);

        setProjectPosition(0)

        document.body.style.overflow = 'hidden';
    }

    return (
        <div onClick={clickHandler} to={name} className='project'>
            <img src={img} alt=""/>

            <p className='projectName'>{name}</p>
        </div>
    )
}

export default Projects
