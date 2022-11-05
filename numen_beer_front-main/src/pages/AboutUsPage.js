import React from 'react';
import AboutUsCard from '../components/cards/AboutUsCard/AboutUsCard';
import "../styles/AboutUs.css";

const AboutUsPage = (props) => {
    return (
        <>
        <h1 className='title'>Este proyecto fue desarrollado por:</h1>
        
        <div className='AboutUsContainer'>
            
            <AboutUsCard/>
        </div>
       </>
    )
}

export default AboutUsPage;