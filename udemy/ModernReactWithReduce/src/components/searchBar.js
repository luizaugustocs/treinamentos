import React, {Component, PropTypes} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {searchText: ''}
        // this.onInputChange = this.onInputChange.bind(this)
    }

    render() {
        return (
            <div>
                <input onChange={(event) => this.setState({searchText: event.target.value})}/>
                {/*<input onChange={this.onInputChange}/>*/}
                Valor do input : {this.state.searchText}
            </div>
        )
    }

    onInputChange(event) {
        this.setState({searchText: event.target.value});
    }
}

export default SearchBar;