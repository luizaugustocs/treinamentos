import React from 'react';

import DocumentTitle from 'react-document-title';

import Header from './Header';

import Footer from './Footer';

export default class Layout extends React.Component {
    render(){
        return (
            <DocumentTitle title="Meu app">
                <div className="ui container">
                    <Header />
                    { this.props.children}
                    <Footer />
                </div>
            </DocumentTitle>
        )
    }
}