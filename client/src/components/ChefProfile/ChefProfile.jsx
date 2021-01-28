import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import '../ChefProfile/chefProfile.scss';
import GF from '../../assets/icons/glutenfree.png';
import Vegan from '../../assets/icons/vegan.png';
import MessageForm from '../MessageForm/MessageForm';
import fire from '../../config/fire';
import BookingCalendar from 'react-booking-calendar';
import Reviews from '../Reviews/Reviews';


function ChefProfile(){
    let [chef, setChef] = useState({});
    let {id} = useParams();
    const ref = fire.firestore().collection('chefs').where("id", "==", id);

    
    console.log(ref)
    //Initial Firebase call to get all chefs
    function getChef(){
        ref.onSnapshot((querySnapshot) => {
            let chefSnapshot = {};
            querySnapshot.forEach((doc) => {
                chefSnapshot = doc.data();
            })
            setChef(chefSnapshot);
        });
    }
    
    useEffect(() => {
        (fire.firestore().collection('chefs').where("id", "==", id).get().then(
            (querySnapshot) => {
                let chefSnapshot = {};
                querySnapshot.forEach((doc) => {
                    chefSnapshot = doc.data();
                    console.log(doc.data())
                })
                setChef({...chefSnapshot});
            }));
        // getChef();
    }, [setChef]);
    
    console.log(chef);
    // console.log(chef.dates);
    // console.log(chef.reviews);

    
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
                    {console.log(!!chef.reviews)}
                    {!!chef.reviews ? <Reviews reviews={chef.reviews} amount={chef.reviews.length} name={chef.name}/> : null}
                    </div>
                    </div>
                    </div>
                    )
                }
                

export default ChefProfile