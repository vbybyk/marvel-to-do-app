import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {
    
    state = {
        char: {},
    /*  name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null */
       
        loading: true,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }

    componentWillUnmount() {

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
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

        this.onCharLoading()
        this.marvelService
                        .getCharacter(id)
                        .then(this.onLoadedChar)
                        .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;
        
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorPage/> : null;
        const content = !(loading || error) ? <CharView char={char}/> : null;

        return (
        <div className="randomchar">
            {spinner}
            {errorMessage}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={this.updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
    }
}

const CharView = ({char}) => {
    let {name, description, thumbnail, homepage, wiki} = char;
    
    let imgStyle = {"objectFit" : "cover"}
        if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            imgStyle = {"objectFit" : "contain"}
        }
        
    const noDescription = 'This info is updaining ...'
        if(description === ''){
            description = noDescription
        }
    return(
        <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">{description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default RandomChar;