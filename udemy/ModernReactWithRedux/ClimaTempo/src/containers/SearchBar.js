import React, {Component} from 'react';


export default class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {searchText: ''};
        this.onInputChange = this.onInputChange.bind(this);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
    };

    onInputChange = (event) => {
        this.setState({searchText: event.target.value});
    };


    render() {
        return (
            <form className="input-group" onSubmit={this.onFormSubmit}>
                <input
                    placeholder="Get a five-day forecast for any city"
                    className="form-control"
                    value={this.state.searchText}
                    onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                <button type="submit" className="btn btn-secondary">Search</button>
                </span>
            </form>
        )
    }
}