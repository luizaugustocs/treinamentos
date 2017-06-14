import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPosts} from '../actions';
import _ from 'lodash';
import {Link} from 'react-router-dom';

class PostList extends Component {
    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        return (
            <div>
                <h3>Posts</h3>
                <div className="text-xs-right">
                    <Link className="btn btn-primary"
                          to="/posts/new">
                        New Post
                    </Link>
                </div>
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