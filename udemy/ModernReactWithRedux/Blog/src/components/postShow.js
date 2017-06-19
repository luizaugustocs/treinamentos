import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions'
import {Link} from "react-router-dom";


class PostsShow extends Component {

    componentDidMount() {
        const {id} = this.props.match.params; // this.props.match é um objeto setado pelo router
                                              // com os matchs dos parametros da rota
        this.props.fetchPost(id);
    }

    render() {
        const {post} = this.props;

        if (!post){
            return <div>Loading</div>
        }

        return (
            <div>
                <Link to="/" className="btn btn-warning"> Back To Index</Link>
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

export default connect(mapStateToProps, {fetchPost})(PostsShow);