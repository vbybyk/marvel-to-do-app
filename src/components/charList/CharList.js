import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';

import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [requestLoading, setRequestLoading] = useState(false);
    const [offset, setOffset] = useState(1530);
    const [charsLoaded, setCharsLoaded] = useState(false);
    const [selected, setSelected] = useState(null);

    const {loading, error, getAllCharacters} = useMarvelService()

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setRequestLoading(false) : setRequestLoading(true);
        getAllCharacters(offset)
                    .then(onLoadedChars)
                    // .then(() => setInProp(true))
    }

    const onLoadedChars = (newChars) => {
        let loaded = false
        if (newChars.length < 9) {
            loaded = true
        }

        setChars(chars => [...chars, ...newChars]);
        setRequestLoading(requestLoading => false);
        setOffset(offset => offset + 9);
        setCharsLoaded(charsLoaded => loaded);
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
           <CSSTransition key={id} timeout={400} classNames="char__item">
               <li className={(id === selected)? "char__item_selected" : "char__item"} 
                     
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
           </CSSTransition>
        )
    }) 

    const errorMessage = error ? <ErrorPage/> : null;
    const spinner = loading ? <Spinner/> : null;
    
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            <ul className="char__grid"> 
                <TransitionGroup className="transition-group" component={null}>
                    {charItems}
                </TransitionGroup>
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