import React from 'react';
import '../ChefCard/chefCard.scss';
import {Link} from 'react-router-dom';
import Star from '../../assets/icons/star.png';

function ChefCard({name, image, cuisine, restaurant, id}) {
    return (
        <Link to={`/chefs/${id}`}>
        <div className="card">
            <div className="card__top-container">
                <img className="card__chef-image" src={image} alt="Chef Headshot"/>
                <h3 className="card__name">Chef {name}</h3>
            </div>
            <div className="card__chef-info">
                <h5 className="card__restaurant">{restaurant}</h5>
                <h5 className="card__cuisine">Favourite Cuisine: {cuisine}</h5>
            </div>
            <div className="card__chef-rating">
                <img src={Star} alt="Star" className="card__star"/>
                <img src={Star} alt="Star" className="card__star"/>
                <img src={Star} alt="Star" className="card__star"/>
                <img src={Star} alt="Star" className="card__star"/>
                <img src={Star} alt="Star" className="card__star"/>
            </div>
        </div>
        </Link>
    )
}

export default ChefCard
