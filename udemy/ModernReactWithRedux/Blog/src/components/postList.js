import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPosts} from '../actions'

class PostList extends Component {
    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        return (
            <div>
                List
            </div>
        )
    }
}


export default connect(null, {getPosts})(PostList);