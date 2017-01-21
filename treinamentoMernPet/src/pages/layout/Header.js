import React from 'react';

import { Link } from 'react-router'


export default class Header extends React.Component {
    render(){
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="item" activeClassName="active">Home </Link>
                <Link to="/" className="item" >Contato </Link>
                <Link to="/" className="item" >Sobre </Link>
            </div>
        )
    }
}