import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';

import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false);
    const [offset, setOffset] = useState(1530);
    const [charsLoaded, setCharsLoaded] = useState(false);
    const [selected, setSelected] = useState(null)

    const marvelService = new MarvelService()

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onRequestLoading()
        marvelService
                    .getAllCharacters(offset)
                    .then(onLoadedChars)
                    .catch(onError)
    }

    const onRequestLoading = () => {
       setRequestLoading(true);
    }

    const onLoadedChars = (newChars) => {
        let loaded = false
        if (newChars.length < 9) {
            loaded = true
        }

        setChars(chars => [...chars, ...newChars]);
        setLoading(loading => false);
        setRequestLoading(requestLoading => false);
        setOffset(offset => offset + 9);
        setCharsLoaded(charsLoaded => loaded);
    }

    const onError = () => {
       setError(true);
       setLoading(false);
    }

    const updateActiveChar = (id) => {
        props.onSetActiveChar(id);
        setSelected(id);
    }

    const charItems = chars.map(({name, thumbnail, id}) => {
        let imgStyle = {'objectFit': 'cover'}
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit': 'contain'}
    }
        return (
           <li className={(id === selected)? "char__item_selected" : "char__item"} 
                     key={id}
                     tabIndex={0}
                     onClick={() => updateActiveChar(id)}
                     onKeyPress={(e) => {
                         if (e.key === ' ' || e.key === "Enter") {
                             updateActiveChar(id);
                         }
                     }}>
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
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )      
}

CharList.propTypes = {
    onSetActiveChar: PropTypes.func.isRequired
}

export default CharList;