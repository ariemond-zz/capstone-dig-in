import React, {useState} from 'react';
import '../DinerForm/dinerForm.scss';
import DatePicker from '../DatePicker/DatePicker';
import {Link} from 'react-router-dom';
import fire from '../../config/fire';


class DinerForm extends React.Component {
    state = {
        location: ""
    }

    updateLocation = e => {
        this.setState({
            location: e.target.value
        })
    };

    handleClick = () => {
        this.props.history.push('/chefs');
    }

    logout = () => {
        fire.auth().signOut();
    }

    render(){
        return (
            <section className="diner">
                <div className="diner__form-div">
                    <form className="diner__form">
                    <h5 className="diner__location-header">Where are you located?</h5>
                        <input 
                            className="diner__input-location"
                            name="location"
                            type="text"
                            placeholder="City"
                            value={this.state.location}
                            onChange={this.updateLocation}/>
                        <h5 className="diner__date-header">When would you like your meal?</h5>
                        <div className="diner__day-picker">
                        <DatePicker/>
                        </div>
                        <Link to='/chefs' className="diner__link"><button className="diner__button">Submit</button></Link>
                        </form>
                        </div>
                        
                        </section>
                        )
                    }
                }
                
                export default DinerForm
                
// <button onClick={this.logout}>Log Out</button>


// {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
// {!selectedDay && <p>Choose a day:</p>}