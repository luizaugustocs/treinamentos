import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {searchText: 'Inicial'}
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    value={this.state.searchText}
                    onChange={event => this.onInputChange(event.target.value)}
                />
            </div>
        )
    }

    onInputChange(searchText) {
        this.setState({searchText: searchText});
        this.props.onSearchTextChange({searchText})
    }
}

export default SearchBar;