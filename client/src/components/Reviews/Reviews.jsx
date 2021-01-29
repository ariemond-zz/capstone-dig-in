import React, {useRef, useState, useEffect} from 'react'
import '../Reviews/reviews.scss';
import {useParams, useHistory} from 'react-router-dom';
import fire from '../../config/fire';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function Reviews({amount, name}) {
  let [reviews, setReviews] = useState([]);

  const db = fire.firestore();
  let {id} = useParams();
  const history = useHistory();
  const ref = db.collection('chefs').doc(id);

  console.log(reviews)

  
  const review = useRef();
  
  const reviewSubmit = (event) => {
    event.preventDefault();
    db.doc(`chefs/${id}`).collection("reviews").add({
      reviews: review.current.value
    })
  }

  useEffect(() => {
    db.doc(`chefs/${id}`)
      .collection("reviews")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => (
          doc.data()
        ));
        setReviews(data);
        console.log(data)
      });
  }, []);

  

  //mandatory props for carousel component
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 1,
      slidesToSlide: 1 
    },
    tablet: {
      breakpoint: { max: 1200, min: 768 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1 
    }
  };
  
  return (
    <section className="reviews">
    <h4 className="reviews__title">{amount} Reviews for Chef {name}</h4>
    <div className="reviews__all">
    <Carousel 
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} 
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px">

         {reviews.map(review => <p className="reviews__single">{review.reviews}</p>)} 

    </Carousel>
    </div>

      <div className="reviews__form-section">
        <form className="reviews__form" action="" onSubmit={reviewSubmit}>
              <label htmlFor="name" className="reviews__form-label">Add a Review</label>
              <textarea 
              className="reviews__form-review-input"
              name="review" 
              id="review" 
              rows="5"
              wrap="hard"
              placeholder="Write review here"
              ref={review}
              required></textarea>
            <button className="reviews__form-button" type="submit">SUBMIT</button>
          </form>
      </div>
    </section>
  );
};


export default Reviews


// <Carousel 
// swipeable={false}
// draggable={false}
// showDots={true}
// responsive={responsive}
// ssr={true} // means to render carousel on server-side.
// infinite={true}
// autoPlay={false}
// autoPlaySpeed={1000}
// keyBoardControl={true}
// customTransition="all .5"
// transitionDuration={500}
// containerClass="carousel-container"
// removeArrowOnDeviceType={["tablet", "mobile"]}
// dotListClass="custom-dot-list-style"
// itemClass="carousel-item-padding-40-px">

// {reviews.map(review => <p>{review}</p>)}      


// </Carousel>