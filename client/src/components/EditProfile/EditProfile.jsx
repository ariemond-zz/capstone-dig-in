import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import '../EditProfile/editProfile.scss';
import GF from '../../assets/icons/glutenfree.png';
import Vegan from '../../assets/icons/vegan.png';
import fire from '../../config/fire';
import Reviews from '../Reviews/Reviews';
import Modal from 'react-modal';
import MessageModal from '../MessageModal/MessageModal';
import Star from '../../assets/icons/star.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function EditProfile({user}){
    let [currentChef, setCurrentChef] = useState({});
    let [isOpen, setOpenModal] = useState(false);
    const db = fire.firestore();
    const newID = user.uid;

    const ref = db.collection('chefs').where('id', '==', newID);     //need to target the logged in user with the id field in chef collection that has matching uid

    function getCurrentChef() {

        ref.onSnapshot((querySnapshot) => {
            console.log(querySnapshot)
            const chefSnapshot = [];
            querySnapshot.forEach((doc) => {
                chefSnapshot.push({...doc.data(), id: doc.id});
            });
            setCurrentChef(chefSnapshot[0]);
            console.log(currentChef)
        });
    };
    
    useEffect(() => {
        if(user) {
            getCurrentChef(); 
        }
     }, []);


      const handleOpenModal = () => {
        setOpenModal(true);
      };

      const handleCloseModal = () => {
          setOpenModal(false)
      };
    
      if (!user) {
          return <div></div>
      }

    return (
        <div className="edit-profile">
            <div className="edit-profile__card">
                <img src={currentChef.image} alt="Chef" className="edit-profile__image"/>
                <div className="edit-profile__top-container"></div>
                <div className="edit-profile__info">
                    <div className="edit-profile__chef-container">
                        <h1 className="edit-profile__name">Welcome Back, Chef {currentChef.name}!</h1>
                        <button onClick={handleOpenModal} className="edit-profile__connect-button">View Messages</button>
                        <h3>Edit your Profile:</h3>
                    </div>
                <form>
                <div className="edit-profile__about-container">
                    <h4 className="edit-profile__about">About Me</h4>
                    <textarea 
                        className="edit-profile__about-input"
                        type="text"
                        value={currentChef.description}/>
                </div>
                <div className="edit-profile__wage-container">
                    <h4 className="edit-profile__wage">Pricing Per Head</h4>
                    <input 
                    className="edit-profile__wage-input"
                    type="text"
                    value={currentChef.wage}/>
                </div>
                <div className="edit-profile__rest-container">
                    <h4 className="edit-profile__restaurant">Restaurant</h4>
                    <input 
                    className="edit-profile__rest-input"
                    type="text"
                    value={currentChef.restaurant}/>
                </div>
                <div className="edit-profile__cuisine-container">
                    <h4 className="edit-profile__cuisine">Cuisine</h4>
                    <input 
                    className="edit-profile__cuisine-input"
                    type="text"
                    value={currentChef.cuisine}/>
                </div>
                
                <div className="edit-profile__allergies">
                <h4 className="edit-profile__cuisine">Allergy Friendly</h4>
                    <select className="edit-profile__allergy-input">
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                </form>
                </div>
                    <Calendar/>
                    <button className="edit-profile__button">SUBMIT</button>
            </div>

            <Modal
                isOpen={isOpen}
                onRequestClose={handleCloseModal}
                ariaHideApp={false}
                style={{
                    content: {
                    top: "40%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    },
                }}>
                    <MessageModal closeModal={handleCloseModal} name={currentChef.name} user={user}/>
            </Modal>
        </div>
        );
    };
                

export default EditProfile