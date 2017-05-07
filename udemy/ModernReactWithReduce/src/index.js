import _ from 'lodash';
import React, {Component} from 'react'; // React é pra gerenciar a criação dos componentes
import ReactDOM from 'react-dom'; // ReactDOM é pra mandar pro DOM
import Keys from '../keys'
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchBar';
import VideoList from './components/videoList'
import VideoDetail from './components/videoDetail';

const API_KEY = Keys.googleApiKey;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: []
            , selectedVideo: null
        };

        this.videoSearch('dogs');


    }

    videoSearch(searchText) {
        YTSearch({key: API_KEY, term: searchText}, (videos) => {
            this.setState({
                videos: videos
                , selectedVideo: videos[0]
            })
        });
    }

    render() {
        const videoSearch = _.debounce((searchText) => {
            this.videoSearch(searchText)
        }, 300)
        return (
            <div>
                <SearchBar onSearchTextChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}

// O primeiro parametro é o que renderizar, o segundo é onde vai colocar o componente renderizado
ReactDOM.render(<App />, document.querySelector('.container'));