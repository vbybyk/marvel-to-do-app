import { useParams, Link} from 'react-router-dom';
import {useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';

import './singleChar.scss';
import xMen from '../../resources/img/x-men.png';

const SingleChar = () => {
    const {charId} = useParams();
    
    const [char, setChar] = useState(null);
    
    const {loading, error, getCharacter, clearError} = useMarvelService()
    
    useEffect(() => {
        updateChar();
    }, [charId])


    const onLoadedChar = (char) => {
        clearError();
        setChar(char);
    }

    const updateChar = () => {

       getCharacter(charId)
                    .then(onLoadedChar)
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorPage/> : null;
    const content = !(loading || error || !char) ? <ViewChar char={char}/> : null;

    return (
    <div className="char__info">
        {spinner}
        {errorMessage}
        {content}
    </div>
    )  
}

const ViewChar = ({char}) => { 
    
    const {name, thumbnail, description} = char;
    
    return (
        <div className="single-char">
            <img src={thumbnail} alt="x-men" className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to="/" className="single-char__back">Back to all</Link>
        </div>
    )
}

export default SingleChar;
