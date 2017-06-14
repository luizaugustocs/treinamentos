import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostNew extends Component {
    renderField(field) {
        const {meta: {touched, error}, input, label} = field;
        const className = `form-group ${touched && error ? 'has-danger' : '' }`;
        return (
            <div className={className}>
                <label className="text-help">{label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...input}
                />
                {touched && <p className="text-help">{error}</p>}
            </div>
        )
    };

    onSubmit(values) {
        this.props.createPost(values);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="title" label="Title" component={this.renderField}/>
                <Field name="categories" label="Categories" component={this.renderField}/>
                <Field name="content" label="Post Content" component={this.renderField}/>
                <button type="submit" className="btn btn-success">Save</button>
                <Link to="/" className="btn btn-warning">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    if (!values.title) {
        errors.title = 'Enter a title!'
    }
    if (!values.categories) {
        errors.categories = 'Enter some categories!'
    }
    if (!values.content) {
        errors.content = 'Enter some content!'
    }
    return errors;
}

export default reduxForm({
    form: 'PostsCreateForm',
    validate
})(
    connect(null, {createPost})(PostNew)
);