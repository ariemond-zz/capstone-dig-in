import React from 'react'
import ChefProfile from '../ChefProfile/ChefProfile';
import '../Reviews/reviews.scss';
import fire from '../../config/fire';

function Reviews({amount, reviews, name}) {




  return (
    <section className="reviews">
      <h4 className="reviews__title">{amount} Reviews for Chef {name}</h4>
      <div className="">
        {reviews.length <= 0 ? null : reviews.map(review => <p>{review}</p>)}      
      </div>
      <div className="reviews__form-section">
        <div className="reviews__image"></div>
        <form className="reviews__form" action="">
            <div className="reviews__user-info">
              <label htmlFor="name" className="reviews__form-label">Add a Review</label>
              <textarea 
              className="reviews__form-comment-input"
              name="comment" 
              id="comment" 
              rows="5"
              wrap="hard"
              placeholder="Write review here"
              required></textarea>
            </div> 
            <button className="reviews__form-button" type="submit">SUBMIT</button>
          </form>
      </div>
    </section>
  );
};


export default Reviews
