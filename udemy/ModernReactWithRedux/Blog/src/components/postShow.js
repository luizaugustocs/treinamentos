import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions'


class PostsShow extends Component {

    componentDidMount() {
        const {id} = this.props.match.params; // this.props.match é um objeto setado pelo router
                                              // com os matchs dos parametros da rota
        this.props.fetchPost(id);
    }

    render() {
        return (
            <div>
                Post Show
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) { // o segundo parametro são os parametros do componente
    return {post: state.posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost})(PostsShow);