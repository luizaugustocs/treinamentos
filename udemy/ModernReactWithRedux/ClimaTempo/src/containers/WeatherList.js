import React, {Component} from 'react';
import {connect} from 'react-redux';

class WeatherList extends Component {

    constructor(props) {
        super(props);

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