import React from 'react';
import preloader from '../../assecs/images/peloader.gif'

export const Preloader = () => {
    return (
        <img src={preloader} alt="preloader" style={{width: '60px', height:'60px', margin: '20px 300px'}}/>
    )
}