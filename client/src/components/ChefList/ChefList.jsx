import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../ChefList/chefList.scss';
import ChefCard from '../ChefCard/ChefCard';
import fire from '../../config/fire';


function ChefList() {

   const [chefs, setChefs] = useState([]);

   const ref = fire.firestore().collection('chefs');

    function getChefs() {
        ref.onSnapshot((querySnapshot) => {
            const chefs = [];
            querySnapshot.forEach((doc) => {
                chefs.push(doc.data());
            });
            setChefs(chefs);
        });
    }

    useEffect(() => {
       getChefs(); 
    }, []);

    
        return (
            <section className="chefs">
                <h2 className="chefs__title">Select a Chef:</h2>
                <div className="chefs__list">
                    {chefs.map((chef) => 
                        <ChefCard 
                            name={chef.name}
                            image={chef.image}
                            location={chef.location}
                            cuisine={chef.cuisine}
                            restaurant={chef.restaurant}
                            allergy={chef.allergy}
                            wage={chef.wage}/>)}
                </div>
            </section>
        )
    
}

export default ChefList
