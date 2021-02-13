import React, {useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import '../ChefProfile/chefProfile.scss';
import GF from '../../assets/icons/glutenfree.png';
import Vegan from '../../assets/icons/vegan.png';
import fire from '../../config/fire';
import Reviews from '../Reviews/Reviews';
import Dishes from '../Dishes/Dishes';
import Modal from 'react-modal';
import Modal2 from 'react-responsive-modal';
import Payment from '../PaymentPage/Payment';
import MessageModal from '../MessageModal/MessageModal';
import Star from '../../assets/icons/star.png';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import {toast} from 'react-toastify';

toast.configure();

function ChefProfile({user}){
    const [chef, setChef] = useState({});
    const {id} = useParams();
    const [reviews, setReviews] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [isOpen, setOpenModal] = useState(false);
    const [isPaymentOpen, setPaymentOpen] = useState(false);
    const db = fire.firestore();
    
    function getChef() {
        db.doc(`chefs/${id}`)
        .get()
        .then((document) => {
            console.log(db.doc(`chefs/${id}`))
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


    useEffect(() => {
    db.doc(`chefs/${id}`)
        .collection("photos")
        .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => (
            doc.data()
        ));
        setDishes(data);
        });
    }, []);

      const handleOpenModal = () => {
        setOpenModal(true);
      };

      const handleCloseModal = () => {
          setOpenModal(false)
      };

      const handlePaymentModal = () => {
        setPaymentOpen(true);
      };

      const handleClosePayment = () => {
        setPaymentOpen(false)
    };

    const product = {
        name: chef.name,
        price: ((chef.wage * 100) / 2)
    }

    async function handleToken(token, addresses) {
        const response = await axios.post('http://localhost:8000/checkout', {
            token,
            product
        });
        const {status} = response.data;
        if (status === 'success') {
            toast('Success! Check email for details.', {type: 'success'})
        } else {
            toast('Something went wrong. Please try again', {type: 'error'})
        };
    };
    

    return (
        <div className="chef-profile">
            <div className="chef-profile__card">
                <img src={chef.image} alt="Chef" className="chef-profile__image"/>
                <div className="chef-profile__top-container"></div>
                <div className="chef-profile__info">
                    <div className="chef-profile__chef-container">
                        <h1 className="chef-profile__name">Chef {chef.name}</h1>
                        <button onClick={handleOpenModal} className="chef-profile__connect-button">Message</button>
                        <StripeCheckout
                            stripeKey="pk_test_51IJgZCGQO6SRRWlIQysuM4pjKjmvYoYfoWCkjNGuUiU11r4Y8IBowrEN2NgJGuKqynOhUKFq773Doervs1akG8f1004IUuoOJs"
                            token={handleToken}
                            amount={(chef.wage * 100) / 2}
                            name={chef.name}
                            billingAddress
                            shippingAddress
                            className="chef-profile__stripe"/>                   
                            <div className="chef-profile__chef-rating">
                                    <img src={Star} alt="Star" className="chef-profile__star"/>
                                    <img src={Star} alt="Star" className="chef-profile__star"/>
                                    <img src={Star} alt="Star" className="chef-profile__star"/>
                                    <img src={Star} alt="Star" className="chef-profile__star"/>
                                    <img src={Star} alt="Star" className="chef-profile__star"/>
                            </div>
                                <a href="#reviews" className="chef-profile__top-reviews">{reviews.length} reviews</a>
                        </div>
                        <div className="chef-profile__about-container">
                            <h4 className="chef-profile__about">About Me</h4>
                            <p className="chef-profile__about">{chef.description}</p>
                        </div>
                        <div className="chef-profile__wage-container">
                            <h4 className="chef-profile__wage">Pricing</h4>
                            <p className="chef-profile__about">Starting at ${chef.wage} a head.</p>
                        </div>
                        <div className="chef-profile__rest-container">
                            <h4 className="chef-profile__restaurant">Restaurant</h4>
                            <p className="chef-profile__about">{chef.restaurant}</p>
                        </div>
                        <div className="chef-profile__cuisine-container">
                            <h4 className="chef-profile__cuisine">Cuisine</h4>
                            <p className="chef-profile__about">{chef.cuisine}</p>
                        </div>
                </div>
                <div className={chef.allergy === "true" ? 'chef-profile__allergies' : 'chef-profile__no-allergies'}>
                    <img src={GF} alt="GF" className="chef-profile__allergy"/>
                    <img src={Vegan} alt="GF" className="chef-profile__allergy"/>
                </div>
                {!!dishes ? <Dishes dishes={dishes} user={user} name={chef.name} key={chef.id}/> : null}
                {!!reviews ? <Reviews key='3454565' reviews={reviews} amount={reviews.length} name={chef.name} key={chef.id} user={user}/> : null}
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
                    <MessageModal closeModal={handleCloseModal} name={chef.name} user={user}/>
            </Modal>

            <Modal2
                open={isPaymentOpen}
                onClose={handleClosePayment}
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
                    <Payment closeModal={handleClosePayment}/>
            </Modal2>
        </div>
    );
};
                

export default ChefProfile