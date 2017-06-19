import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions'
import {Link} from "react-router-dom";


class PostsShow extends Component {


    componentDidMount() {
        const {id} = this.props.match.params; // this.props.match é um objeto setado pelo router
                                              // com os matchs dos parametros da rota
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.match.params.id, () => {
            this.props.history.push('/');
        })
    };

    render() {
        const {post} = this.props;

        if (!post) {
            return <div>Loading</div>
        }

        return (
            <div>
                <Link to="/" className="btn btn-warning"> Back To Index</Link>
                <button type="button" className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick.bind(this)}>
                    Delete post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) { // o segundo parametro são os parametros do componente
    return {post: state.posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);