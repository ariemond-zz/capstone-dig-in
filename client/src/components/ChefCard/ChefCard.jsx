import React from 'react';
import '../ChefCard/chefCard.scss';


function ChefCard({name, image, location, cuisine, restaurant, allergy, wage}) {
    return (
        <div className="card">
            <div className="card__top-container">
                <img className="card__chef-image" src={image} alt="Chef Headshot"/>
                <h3 className="card__name">{name}</h3>
            </div>
            <div className="card__chef-info">
                <h5 className="card__restaurant">Chef At: {restaurant}</h5>
                <h5 className="card__cuisine">Favourite Cuisine: {cuisine}</h5>
            </div>
        </div>
    )
}

export default ChefCard
