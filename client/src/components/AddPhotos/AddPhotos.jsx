import React, {useState, useEffect} from 'react'
import '../AddPhotos/addPhotos.scss';
import fire from '../../config/fire';
import {storage} from '../../config/fire';


function AddPhotos({id}) {

  const db = fire.firestore();
  let [image, setImage] = useState([]);
  const [url, setURL] = useState("");
  let [dishes, setDishes] = useState([]);
  

  useEffect(() => {
    db.doc(`chefs/${id}`)
        .collection("photos")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setDishes(data);
        });
    }, []);

    
    //Upload image
    const handleImage = e => {
        setImage(e.target.files[0])
        };

        const handleUpload = e => {
        e.preventDefault();

        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on("state_changed", console.log, console.error, () => {
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
                setImage(url);
                setURL(url);
            });
        });
        };
   
  return (
    <section className="add-photos">
      <h4 className="add-photos__title">Your Dishes</h4>
      <div className="add-photos__all">
        <div className="add-photos__wage-container">
            <form onSubmit={handleUpload}>
                <label className="add-photos__image-input">
                    Choose File
                    <input className="add-photos__input-button" type="file" onChange={handleImage} />
                </label>
                <button className="add-photos__image-button" disabled={!image}>Upload</button>
            </form>
        </div>
            {dishes.map(dish => 
              <img className="add-photos__single" key={dish.id} src={dish.image} alt="Chef's Dish"/>
              )} 
        </div>
      </section>
      );
    };
    

export default AddPhotos