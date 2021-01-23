import React from 'react';
import { Link } from 'react-router-dom';
import '../ChefProfile/chefProfile.scss';
import Chef from '../../assets/images/joe.jpg';
import '../ChefProfile/chefProfile.scss';
import GF from '../../assets/icons/glutenfree.png';
import Vegan from '../../assets/icons/vegan.png';
import Form from '../MessageForm/MessageForm';


function ChefProfile(){


        return (
            <div className="chef-profile">
            <div className="chef-profile__card">
            <img src={Chef} alt="Chef" className="chef-profile__image"/>
                    <div className="chef-profile__top-container">
                        <h1 className="chef-profile__name">Chef Joe</h1>
                    </div>
                    <div className="chef-profile__info">
                        <h5 className="chef-profile__about">About Me</h5>
                        <p>I have been all over Eastern and Central 
                        Europe, the Caribbean, Mediterranean and beyond, 
                        in order to bring my clients the best of what I 
                        have found on my culinary travels. I have sought 
                        out the best tasting foods while traveling around 
                        the world, and am equipped and excited to share 
                        it with, and inspire my clients.</p>
                        <h5 className="chef-profile__wage">Pricing</h5>
                        <p className="chef-profile__about">Starting at $65 a head.</p>
                    </div>
                    <div className="chef-profile__allergies">
                        <img src={GF} alt="GF" className="chef-profile__allergy"/>
                        <img src={Vegan} alt="GF" className="chef-profile__allergy"/>
                    </div>
                    <div className="chef-profile__form-section">
                        <h5 className="chef-profile__connect-header">Connect with Chef Joe</h5>
                        <Form className="chef-profile__form"/>
                    </div>
                </div>
            </div>
        )
}


export default ChefProfile