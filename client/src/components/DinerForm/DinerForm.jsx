import React from 'react';
import '../DinerForm/dinerForm.scss';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import "react-day-picker/lib/style.css";
import {Link} from 'react-router-dom';
import fire from '../../config/fire';

class DinerForm extends React.Component {
    state = {
        location: "",
        selectedDay: undefined,
        submitEnabled: false
    }

    updateLocation = e => {
        this.setState({
            location: e.target.value
        }, this.checkSubmitEnabled())
    };

    handleDayChange = (day) => {
        this.setState({
            selectedDay: day
        }, this.checkSubmitEnabled())
    };

    handleClick = () => {
        this.props.history.push('/chefs');
    }

    logout = () => {
        fire.auth().signOut();
    }

    render(){
        const {selectedDay} = this.state;
        return (
            <section className="diner">
                <div className="diner__form-div">
                    <form className="diner__form">
                    <h5 className="diner__location-header">Where are you located?</h5>
                        <input 
                            className="diner__input-location"
                            name="location"
                            type="text"
                            placeholder="Enter location"
                            value={this.state.location}
                            onChange={this.updateLocation}/>
                        <h5 className="diner__date-header">When would you like your meal?</h5>
                        <div className="diner__day-picker">
                        {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
                        {!selectedDay && <p>Choose a day:</p>}
                        <DayPickerInput onDayChange={this.handleDayChange} className="diner__input-calendar"/>
                        </div>
                        <Link to='/chefs' className="diner__link"><button className="diner__button">Submit</button></Link>
                        <button onClick={this.logout}>Log Out</button>
                    </form>
                </div>
    
            </section>
        )
    }
}

export default DinerForm
