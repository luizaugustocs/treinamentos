import React, {Component} from 'react';
import {connect} from 'react-redux';

class WeatherList extends Component {

    constructor(props) {
        super(props);

    }

    renderWeather(cityData) {
        const name = cityData.city.data;
        return (
            <tr key={name}>
                <td>{name}</td>
            </tr>
        )
    }


    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                </tr>
                </thead>
                <tbody>
                {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }


}

function linkState({weather}) {
    console.log(weather)
    return {weather};
}

// function linkState(state) {
//     return {weather : state.weather};
// }


export default connect(linkState)(WeatherList);