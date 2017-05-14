import React, {Component} from 'react'
import {connect} from 'react-redux';
import {selectBook} from '../actions/index'
import {bindActionCreators} from 'redux';

class BookList extends Component {

    renderList() {
        return this.props.books.map((book) => {
            return (
                <li
                    onClick={() => this.props.selectBookAction(book)}
                    key={book.title}
                    className="list-group-item">
                    {book.title}
                    </li>
            )
        });

    }

    render() {
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books
    }
}

// A funcao retornada vai para o componente dentro do props
function mapDispatchToProps(dispatch){
    // passa o resultado das ações para todos os reducers
    return bindActionCreators({selectBookAction: selectBook}, dispatch);
}

// Passar coisas do state do redux e as actions para as props do componente
export default  connect(mapStateToProps, mapDispatchToProps)(BookList);