import { Component } from 'react/cjs/react.development';
import MarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

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
                {/* <li className="char__comics-item">
                    Alpha Flight (1983) #50
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #503
                </li>
                <li className="char__comics-item">
                    Amazing Spider-Man (1999) #504
                </li>
                <li className="char__comics-item">
                    AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                </li>
                <li className="char__comics-item">
                    Vengeance (2011) #4
                </li>
                <li className="char__comics-item">
                    Avengers (1963) #1
                </li>
                <li className="char__comics-item">
                    Avengers (1996) #1
                </li> */}
            </ul>
        </>
    )
}

export default CharInfo;