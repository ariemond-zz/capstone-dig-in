import React, {useState, useEffect} from 'react';
import { Link , useParams} from 'react-router-dom';
import '../ChefProfile/chefProfile.scss';
import Chef from '../../assets/images/joe.jpg';
import '../ChefProfile/chefProfile.scss';
import GF from '../../assets/icons/glutenfree.png';
import Vegan from '../../assets/icons/vegan.png';
import Form from '../MessageForm/MessageForm';
import fire from '../../config/fire';


function ChefProfile(){
    let [chef, setChef] = useState({});
    let {id} = useParams();
    const ref = fire.firestore().collection('chefs').where("id", "==", id);

    //Initial Firebase call to get all chefs
    function getChef(){
        ref.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            chef = doc.data();
        })
            setChef(chef);
        });
    }

    useEffect(() => {
        getChef();
    }, {});

    
        return (
            <div className="chef-profile">
            <div className="chef-profile__card">
            <img src={chef.image} alt="Chef" className="chef-profile__image"/>
                    <div className="chef-profile__top-container">
                        <h1 className="chef-profile__name">Chef {chef.name}</h1>
                    </div>
                    <div className="chef-profile__info">
                        <div className="chef-profile__about-container">
                            <h4 className="chef-profile__about">About Me</h4>
                            <p className="chef-profile__about">{chef.description}</p>
                        </div>
                        <div className="chef-profile__wage-container">
                            <h4 className="chef-profile__wage">Pricing</h4>
                            <p className="chef-profile__about">Starting at {chef.wage} a head.</p>
                        </div>
                        <div className="chef-profile__wage-container">
                            <h4 className="chef-profile__wage">Restaurant</h4>
                            <p className="chef-profile__about">{chef.restaurant}</p>
                        </div>
                    </div>
                    <div className="chef-profile__allergies">
                        <img src={GF} alt="GF" className="chef-profile__allergy"/>
                        <img src={Vegan} alt="GF" className="chef-profile__allergy"/>
                    </div>
                    <div className="chef-profile__form-section">
                        <h4 className="chef-profile__connect-header">Connect with Chef {chef.name}</h4>
                        <Form className="chef-profile__form"/>
                    </div>
                </div>
            </div>
        )
}


export default ChefProfile