import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from "../components/Chart";

class WeatherList extends Component {

    constructor(props) {
        super(props);

    }

    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map((weather) => weather.main.temp - 273 );
        const pressures = cityData.list.map((weather) => weather.main.pressure );
        const humidities = cityData.list.map((weather) => weather.main.humidity );
        return (
            <tr key={name}>
                <td>{name}</td>
                <td> <Chart data={temps} color="orange" unit="ºC" /> </td>
                <td> <Chart data={pressures} color="green" unit="hPa" /> </td>
                <td> <Chart data={humidities} color="black" unit="%" /> </td>
            </tr>
        )
    }


    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature (ºC)</th>
                    <th>Pressure (hPa)</th>
                    <th>Humidity (%)</th>
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
    return {weather};
}

// function linkState(state) {
//     return {weather : state.weather};
// }


export default connect(linkState)(WeatherList);