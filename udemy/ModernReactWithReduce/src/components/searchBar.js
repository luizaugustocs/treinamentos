import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {searchText: 'Inicial'}
        // this.onInputChange = this.onInputChange.bind(this)
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    value={this.state.searchText}
                    onChange={(event) => this.setState({searchText: event.target.value})}
                />
                {/*<input onChange={this.onInputChange}/>*/}
            </div>
        )
    }

    onInputChange(event) {
        this.setState({searchText: event.target.value});
    }
}

export default SearchBar;