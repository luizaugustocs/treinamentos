import React from 'react'; // React é pra gerenciar a criação dos componentes
import ReactDOM from 'react-dom'; // ReactDOM é pra mandar pro DOM

const App = () => {
    return <div> Hey!</div>;
};

// O primeiro parametro é o que renderizar, o segundo é onde vai colocar o componente renderizado
ReactDOM.render(<App />, document.querySelector('.container'));