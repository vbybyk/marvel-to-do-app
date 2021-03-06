import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = (props) => {
    
    const [char, setChar] = useState({});

    const {loading, error, getCharacter, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateChar();
    }, [])

    const onLoadedChar = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

        getCharacter(id)
                    .then(onLoadedChar)
                    .then(() => setProcess('confirmed'));  // !! State-Machine
    }
        
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorPage/> : null;
        const content = !(loading || error) ? <CharView char={char}/> : null;

    return (
        <div className="randomchar">
            {/* {spinner}
            {errorMessage}
            {content} */}
            {setContent(process, CharView, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
        )
}

const CharView = ({data}) => {
    let {name, description, thumbnail, homepage, wiki} = data;
    
    let imgStyle = {"objectFit" : "cover"}
        if (data.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
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