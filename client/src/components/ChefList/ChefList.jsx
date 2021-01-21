import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../ChefList/chefList.scss';
import ChefCard from '../ChefCard/ChefCard';
import fire from '../../config/fire';


function ChefList() {

    //Initial Firebase call to get all chefs
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


    //Search Bars
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const handleChange = e => {
        setSearchTerm(e.target.value);
        console.log(e.target.value)
    };

    useEffect(() => {
        const results = chefs.filter(chef => 
            chef.restaurant.includes(searchTerm)
        );
        console.log(chefs)
        setSearchResults(results);
    }, [searchTerm]);


    
        return (
            <section className="chefs">
                <h2 className="chefs__title">Select a Chef:</h2>
                <input 
                    type="text" 
                    placeholder="Search by restaurant" 
                    className="chefs__search"
                    value={searchTerm}
                    onChange={handleChange}/>
                <input 
                type="text" 
                placeholder="Search by cuisine" 
                className="chefs__search"/>
                <div className="chefs__list">
                {searchResults.map((chef) => 
                    <ChefCard 
                            id={chef.id}
                            key={chef.id}
                            name={chef.name}
                            image={chef.image}
                            location={chef.location}
                            cuisine={chef.cuisine}
                            restaurant={chef.restaurant}
                            allergy={chef.allergy}
                            wage={chef.wage}/>)}
                </div>
                <div className="chefs__list">
                    {chefs.map((chef) => 
                        <ChefCard 
                            id={chef.id}
                            key={chef.id}
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
