import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import '../CreateChef/createChef.scss';
import GF from '../../assets/icons/glutenfree.png';
import Vegan from '../../assets/icons/vegan.png';
import MessageForm from '../MessageForm/MessageForm';
import fire from '../../config/fire';
import BookingCalendar from 'react-booking-calendar';
import ChatForm from '../ChatForm/ChatForm';


function CreateChef({user}){
    let [chef, setChef] = useState([]);
    const ref = fire.firestore().collection('users').where("id", "==", user.id);


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
    }, []);

    
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
                    <div className={chef.allergy === true ? 'chef-profile__allergies' : 'chef-profile__no-allergies'}>
                        <img src={GF} alt="GF" className="chef-profile__allergy"/>
                        <img src={Vegan} alt="GF" className="chef-profile__allergy"/>
                    </div>
                    <div className="chef-profile__form-section">
                        <h4 className="chef-profile__connect-header">Connect with Chef {chef.name}</h4>
                        <MessageForm/>
                    </div>
                    <div className="conversation__form-section">
                    <div className="conversation__image"></div>
                  </div>
                </div>
            </div>
        )
}


export default CreateChef