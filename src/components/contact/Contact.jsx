import React from 'react'
import './contact.css'
import contacts from './contacts';
import Section from '../../section/Section'

function Contact({ contactPosition, setContactPosition }) {
    return (
        <div className='contact sliderCard' style={{ transform: `translateX(${contactPosition})` }}>
            <p className='closeButton' onClick={() => setContactPosition('100vw')}>X</p>
            
            <Section header='Contact'>
                <div className='contacts'>
                    <DisplayContacts />
                </div>
            </Section>
        </div>
    )
}

const DisplayContacts = () => contacts.map((x, index) => (
    <a key={index} target='_blank' href={x.adress}>
        <img src={require(`./images/${x.image}`).default} />
    </a>    
))

export default Contact
