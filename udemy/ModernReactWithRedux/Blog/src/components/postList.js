import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPosts} from '../actions';
import _ from 'lodash';

class PostList extends Component {
    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        return (
            <div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.mountPosts()}
                </ul>
            </div>
        )
    }

    mountPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    {post.title}
                </li>
            );
        });
    };
}


function mapStateToProps(state){
    return {posts: state.posts}
}


export default connect(mapStateToProps, {getPosts})(PostList);