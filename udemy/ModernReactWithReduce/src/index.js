import React from 'react'; // React é pra gerenciar a criação dos componentes
import ReactDOM from 'react-dom'; // ReactDOM é pra mandar pro DOM
import Keys from '../keys'
import YTSearch from 'youtube-api-search';

import SearchBar from './components/searchBar';

const API_KEY = Keys.googleApiKey;

YTSearch({key: API_KEY, term: 'dogs'}, function(response){
    console.log(response)
})

const App = () => {
    return (<div>
        <SearchBar/>
    </div>);
};

// O primeiro parametro é o que renderizar, o segundo é onde vai colocar o componente renderizado
ReactDOM.render(<App />, document.querySelector('.container'));