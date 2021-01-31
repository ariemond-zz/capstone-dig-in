import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import '../EditProfile/editProfile.scss';
import fire from '../../config/fire';
import Modal from 'react-modal';
import ChefMessages from '../ChefMessages/ChefMessages';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


function EditProfile({user}){
    let [currentChef, setCurrentChef] = useState({});
    let [isOpen, setOpenModal] = useState(false);
    const [description, setDescription] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [wage, setWage] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [allergy, setAllergy] = useState("");
    const [currentDoc, setCurrentDoc] = useState();

    const history = useHistory();
    const db = fire.firestore();
    const newID = user.uid;
    const ref = db.collection('chefs').where('id', '==', newID);     //need to target the logged in user with the id field in chef collection that has matching uid


    function getCurrentChef() {
        ref.onSnapshot((querySnapshot) => {
            const chefSnapshot = [];
            let docID;
            querySnapshot.forEach((doc) => {
                chefSnapshot.push({...doc.data(), id: doc.id});
                docID = doc.id;
                console.log(doc.id)
            });
            setCurrentChef(chefSnapshot[0]);
            setDescription(chefSnapshot[0].description);
            setRestaurant(chefSnapshot[0].restaurant);
            setCuisine(chefSnapshot[0].cuisine);
            setWage(chefSnapshot[0].wage);
            setAllergy(chefSnapshot[0].allergy);
            setCurrentDoc(docID);
        });
    };
    
    console.log(currentDoc);

    useEffect(() => {
        if(user) {
            getCurrentChef(); 
        }
     }, []);



     function editProfile(e){
        e.preventDefault();
        db.doc(`chefs/${currentDoc}`).update({
                description,
                wage,
                cuisine,
                restaurant,
                allergy
            })
        .then(res => {
            history.push(`/chefs/${currentDoc}`);
            window.scrollTo(0, 0);
        })
     };

    const handleDescription = e => {
        setDescription(e.target.value);
    };

     const handleWage = e => {
        setWage(e.target.value);
    };

    const handleRestaurant = e => {
        setRestaurant(e.target.value);
    };

    const handleCuisine = e => {
        setCuisine(e.target.value);
    };

    const handleAllergy = e => {
        setAllergy(e.target.value);
    };


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
                        <h2>Edit Your Profile:</h2>
                    </div>
                <form className="edit-profile__form" onSubmit={editProfile}>
                <div className="edit-profile__about-container">
                    <h4 className="edit-profile__about">About Me</h4>
                    <textarea 
                        className="edit-profile__about-input"
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleDescription}
                        />
                </div>
                <div className="edit-profile__wage-container">
                    <h4 className="edit-profile__wage">Pricing Per Head</h4>
                    <input 
                    className="edit-profile__wage-input"
                    type="text"
                    name="wage"
                    value={wage}
                    onChange={handleWage}/>
                </div>
                <div className="edit-profile__rest-container">
                    <h4 className="edit-profile__restaurant">Restaurant</h4>
                    <input 
                    className="edit-profile__rest-input"
                    type="text"
                    name="restaurant"
                    value={restaurant}
                    onChange={handleRestaurant}/>
                </div>
                <div className="edit-profile__cuisine-container">
                    <h4 className="edit-profile__cuisine">Cuisine</h4>
                    <input 
                    className="edit-profile__cuisine-input"
                    type="text"
                    name="cuisine"
                    value={cuisine}
                    onChange={handleCuisine}/>
                </div>
                
                <div className="edit-profile__allergies">
                <h4 className="edit-profile__allergy">Allergy Friendly</h4>
                    <select 
                        className="edit-profile__allergy-input" 
                        name="allergy"
                        id="allergy"
                        onChange={handleAllergy}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div className="edit-profile__calendar-section">
                <h4 className="edit-profile__availability">Update Availability:</h4>
                <DayPicker
                        initialMonth={new Date(2021, 1)}
                        selectedDays={[
                            new Date(2021, 1, 12),
                            new Date(2021, 1, 2),
                            {
                            after: new Date(2021, 1, 20),
                            before: new Date(2021, 1, 25),
                            },
                        ]}
                        />
                        <button className="edit-profile__button">SUBMIT</button>
                </div>
                </form>
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
                    <ChefMessages id={currentDoc} closeModal={handleCloseModal} name={currentChef.name} user={user}/>
            </Modal>
        </div>
        );
    };
                

export default EditProfile