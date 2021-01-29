import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import '../ChefProfile/chefProfile.scss';
import GF from '../../assets/icons/glutenfree.png';
import Vegan from '../../assets/icons/vegan.png';
import MessageForm from '../MessageForm/MessageForm';
import fire from '../../config/fire';
import BookingCalendar from 'react-booking-calendar';
import Reviews from '../Reviews/Reviews';


function ChefProfile({user}){
    let [chef, setChef] = useState({});
    let {id} = useParams();
    let [reviews, setReviews] = useState([]);
    const db = fire.firestore();

    console.log(user)
    
    function getChef() {
        db.doc(`chefs/${id}`)
        .get()
        .then((document) => {
          setChef(document.data());
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        });
    };
    
    useEffect(() => {
        getChef();
    }, []);

    useEffect(() => {
        db.doc(`chefs/${id}`)
          .collection("reviews")
          .onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => (
              doc.data()
            ));
            setReviews(data);
          });
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
                    <div className="chef-profile__rest-container">
                        <h4 className="chef-profile__restaurant">Restaurant</h4>
                        <p className="chef-profile__about">{chef.restaurant}</p>
                    </div>
                </div>
                <div className={chef.allergy === true ? 'chef-profile__allergies' : 'chef-profile__no-allergies'}>
                    <img src={GF} alt="GF" className="chef-profile__allergy"/>
                    <img src={Vegan} alt="GF" className="chef-profile__allergy"/>
                </div>
                    {!!reviews ? <Reviews reviews={reviews} amount={reviews.length} name={chef.name} id={chef.id}/> : null}
            </div>
        </div>
        );
    };
                

export default ChefProfile