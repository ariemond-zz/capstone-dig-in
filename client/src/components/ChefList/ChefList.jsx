import React, { useState, useEffect } from 'react';
import '../ChefList/chefList.scss';
import ChefCard from '../ChefCard/ChefCard';
import fire from '../../config/fire';
import {useParams, searchParams} from 'react-router-dom';

function ChefList({match, location}) {

  
    let params = (new URL(document.location)).searchParams;
    let city = params.get('location');
    console.log(city);
    let date = params.get('date');
    console.log(date);

    const uppercaseCity = (city) => {
        let splitCity = city.split(" ")
        let newCity = splitCity.map(word => {
            word = word.split("")
            word[0] = word[0].toUpperCase()
            return word.join("")
        }) 
        return newCity.join(" ")
    }
    console.log(uppercaseCity(city))

    //Initial Firebase call to get all chefs
   const [chefs, setChefs] = useState([]);
   const [allChefs, setAllChefs] = useState([]);
   const ref = fire.firestore().collection('chefs').where("location", "==", uppercaseCity(city));

   function getChefs() {
       ref.onSnapshot((querySnapshot) => {
           const chefsSnapshot = [];
           querySnapshot.forEach((doc) => {
               chefsSnapshot.push(doc.data());
           });
           setChefs(chefsSnapshot);
           setAllChefs(chefsSnapshot);
       });
   }
   
   useEffect(() => {
       getChefs(); 
    }, []);


    //Restaurant Search Bar
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const handleChange = e => {
        console.log("handleChange")
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const results = allChefs.filter(chef => 
            chef.restaurant.toLowerCase().includes(searchTerm)
        );
        setChefs(results);
    }, [searchTerm]);


    //Cuisine Search Bar
    const [cuisineSearchTerm, setCuisineSearchTerm] = useState("");
    const [cuisineSearchResults, setCuisineSearchResults] = useState([]);
    
    const handleCuisineChange = e => {
        console.log("handleCuisineChange")
        setCuisineSearchTerm(e.target.value);
    };

    useEffect(() => {
        const results = allChefs.filter(chef => 
            chef.cuisine.toLowerCase().includes(cuisineSearchTerm)
        );
        console.log(cuisineSearchTerm)
        setChefs(results); 

    }, [cuisineSearchTerm]);


    
        return (
            <section className="chefs">
                <h2 className="chefs__title">Select a Chef</h2>
                <div className="chefs__search-container">
                <input 
                    type="text" 
                    placeholder="Search by restaurant" 
                    className="chefs__search-rest"
                    value={searchTerm}
                    onChange={handleChange}/>
                <input 
                type="text" 
                placeholder="Search by cuisine" 
                className="chefs__search"
                value={cuisineSearchTerm}
                onChange={handleCuisineChange}/>
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

// <div className="chefs__list">
// {searchResults.map((chef) => 
//     <ChefCard 
//     id={chef.id}
//     key={chef.id}
//     name={chef.name}
//     image={chef.image}
//     location={chef.location}
//     cuisine={chef.cuisine}
//     restaurant={chef.restaurant}
//     allergy={chef.allergy}
//     wage={chef.wage}/>)}
//     </div>
    
// <div className="chefs__list">
// {cuisineSearchResults.map((chef) => 
//     <ChefCard 
//     id={chef.id}
//     key={chef.id}
//     name={chef.name}
//     image={chef.image}
//     location={chef.location}
//     cuisine={chef.cuisine}
//     restaurant={chef.restaurant}
//     allergy={chef.allergy}
//     wage={chef.wage}/>)}
//     </div>

// <div className="chefs__list">
//                 {searchResults.map((chef) => 
//                     <ChefCard 
//                     id={chef.id}
//                     key={chef.id}
//                     name={chef.name}
//                     image={chef.image}
//                     location={chef.location}
//                     cuisine={chef.cuisine}
//                     restaurant={chef.restaurant}
//                     allergy={chef.allergy}
//                     wage={chef.wage}/>)}
//                     </div>
                    
//                 <div className="chefs__list">
//                 {cuisineSearchResults.map((chef) => 
//                     <ChefCard 
//                     id={chef.id}
//                     key={chef.id}
//                     name={chef.name}
//                     image={chef.image}
//                     location={chef.location}
//                     cuisine={chef.cuisine}
//                     restaurant={chef.restaurant}
//                     allergy={chef.allergy}
//                     wage={chef.wage}/>)}
//                     </div>