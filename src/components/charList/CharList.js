import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';

import './charList.scss';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        requestLoading: false,
        offset: 1540,
        charsLoaded: false
    }

    marvelService = new MarvelService()

    onLoadedChars = (newChars) => {
        let loaded = false
        if (newChars.length < 9) {
            loaded = true
        }

        this.setState(({chars, offset}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            requestLoading: false,
            offset: offset + 9,
            charsLoaded: loaded}))
    }

    updateChars = () => {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onRequestLoading()
        this.marvelService
                        .getAllCharacters(offset)
                        .then(this.onLoadedChars)
                        .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    onRequestLoading = () => {
        this.setState({
            requestLoading: true,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    componentDidMount() {
        this.onRequest()
    }

    updateActiveChar = (id) => {
        this.props.onSetActiveChar(id)
    }

    render() {
        const {chars, offset, loading, error, requestLoading, charsLoaded} = this.state;
        
        const charItems = chars.map(({name, thumbnail, id}) => {
            let imgStyle = {'objectFit': 'cover'}
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            imgStyle = {'objectFit': 'contain'}
        }
            return (
                <li className="char__item" 
                    key={id}
                    onClick={() => this.updateActiveChar(id)}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        }) 

        const errorMessage = error ? <ErrorPage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? charItems : null;

        return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <ul className="char__grid"> 
                {content}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={requestLoading}
                style={{'display': charsLoaded? 'none' : 'block'}}
                onClick={() => this.onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

export default CharList;