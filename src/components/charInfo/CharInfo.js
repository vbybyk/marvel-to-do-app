import { Component } from 'react/cjs/react.development';
import PropTypes from 'prop-types';

import MarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

class CharInfo extends Component {
   
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService()
    
    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.charId !== this.props.charId){
            this.updateChar()
        }
    }

    onLoadedChar = (char) => {
        this.setState({char, loading: false})
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {

        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading()
        this.marvelService
                        .getCharacter(charId)
                        .then(this.onLoadedChar)
                        .catch(this.onError)
    }
    
    render() {
        const {char, loading, error} = this.state;
        
        const skeleton = char || loading || error ? null : <Skeleton/>
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorPage/> : null;
        const content = !(loading || error || !char) ? <CharInfoView char={char}/> : null;

        return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
    }
}

const CharInfoView = ({char}) => {

    const {name, thumbnail, description, wiki, homepage, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    

    const comicsList = comics.map((item, id) => {
        
        return(
            <li className="char__comics-item" key={id}>
                   {item.name}
            </li>
        )
    }) 

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {comicsList}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;