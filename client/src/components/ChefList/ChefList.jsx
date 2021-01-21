import axios from 'axios';
import React from 'react';
import '../ChefList/chefList.scss';
import ChefCard from '../ChefCard/ChefCard';

const URL = "http://localhost:8080/chefs";

class ChefList extends React.Component {

    state = {
        chefs: []
    }

    componentDidMount(){
        axios.get(URL)
        .then(res => {
            this.setState({
                chefs: res.data
            })
        })
    }

    render(){
        return (
            <section className="chefs">
                <h2 className="chefs__title">Select a Chef:</h2>
                <div className="chefs__list">
                    {this.state.chefs.map((chef) => 
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
}

export default ChefList
