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



function EditProfile({user}){
    let [currentChef, setCurrentChef] = useState({});
    let [isOpen, setOpenModal] = useState(false);
    let {id} = useParams();

    const db = fire.firestore();

    console.log(id)

    const newID = user.uid;

    console.log(newID)

    const ref = db.collection('chefs').where('id', '==', newID);

 
    // function getCurrentChef() {
    //     ref
    //     .onSnapshot((querySnapshot))
    //     .then((document) => {
    //         console.log(document.data())
    //     //   setCurrentChef(document.data());
    //     })
    //     .catch((error) => {
    //         console.log(`Error: ${error}`);
    //     });
    // };

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
                <div className="edit-profile__top-container">
                </div>
                <div className="edit-profile__info">
                <div className="edit-profile__chef-container">
                    <h1 className="edit-profile__name">Chef {currentChef.name}</h1>
                    <button onClick={handleOpenModal} className="edit-profile__connect-button">Message</button>
                        <div className="edit-profile__chef-rating">
                            <img src={Star} alt="Star" className="edit-profile__star"/>
                            <img src={Star} alt="Star" className="edit-profile__star"/>
                            <img src={Star} alt="Star" className="edit-profile__star"/>
                            <img src={Star} alt="Star" className="edit-profile__star"/>
                            <img src={Star} alt="Star" className="edit-profile__star"/>
                        </div>
                    </div>
                <div className="edit-profile__about-container">
                    <h4 className="edit-profile__about">About Me</h4>
                    <p className="edit-profile__about">{currentChef.description}</p>
                </div>
                <div className="edit-profile__wage-container">
                    <h4 className="edit-profile__wage">Pricing</h4>
                    <p className="edit-profile__about">Starting at {currentChef.wage} a head.</p>
                </div>
                <div className="edit-profile__rest-container">
                    <h4 className="edit-profile__restaurant">Restaurant</h4>
                    <p className="edit-profile__about">{currentChef.restaurant}</p>
                </div>
                <div className="edit-profile__cuisine-container">
                    <h4 className="edit-profile__cuisine">Cuisine</h4>
                    <p className="edit-profile__about">{currentChef.cuisine}</p>
                </div>
                </div>
                    <div className={currentChef.allergy === true ? 'edit-profile__allergies' : 'edit-profile__no-allergies'}>
                        <img src={GF} alt="GF" className="edit-profile__allergy"/>
                        <img src={Vegan} alt="GF" className="edit-profile__allergy"/>
                    </div>
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