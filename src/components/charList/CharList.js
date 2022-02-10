import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        chars: []
    }

    marvelService = new MarvelService()

    onLoadedChars = (chars) => {
        this.setState({chars, loading: false})
    }

    updateChars = () => {
        // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
                        .getAllCharacters()
                        .then(this.onLoadedChars)
                        // .catch(this.onError)
    }

    componentDidMount() {
        this.updateChars();  
    }

    updateActiveChar = (id) => {
        this.props.onSetActiveChar(id)
    }

    render() {
        const {chars} = this.state;
        
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
        return (
        <div className="char__list">
            <ul className="char__grid">
                {charItems}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

export default CharList;