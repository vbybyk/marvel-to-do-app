import { useState, useEffect } from 'react';

import useComicsService from '../../services/ComicsService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';

import './comicsList.scss';

const ComicsList = (props) => {
    const [comics, setComics] = useState([]);
    const [requestLoading, setRequestLoading] = useState(false);
    const [offset, setOffset] = useState(250);
    const [comicsLoaded, setComicsLoaded] = useState(false);
    // const [selected, setSelected] = useState(null)

    const {loading, error, getAllComics} = useComicsService()

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setRequestLoading(false) : setRequestLoading(true);
        getAllComics(offset)
                    .then(onLoadedComics)
    }

    const onLoadedComics = (newComics) => {
        let loaded = false
        if (newComics.length < 7) {
            loaded = true
        }

        setComics(comics => [...comics, ...newComics]);
        setRequestLoading(requestLoading => false);
        setOffset(offset => offset + 8);
        setComicsLoaded(comicsLoaded => loaded);
    }

    const comicsItems = comics.map(({title, thumbnail, prices, id}) => {
        let imgStyle = {'objectFit': 'cover'}
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit': 'contain'}
        }

        return(
            <li className="comics__item"
                key={id}
                tabIndex={0}
                // onClick={() => updateActiveChar(id)}
                // onKeyPress={(e) => {
                //         if (e.key === ' ' || e.key === "Enter") {
                //             updateActiveChar(id);
                //         }
                //     }}
                >
                <a href="#">
                    <img src={thumbnail} alt={`picture of ${title}`} style={imgStyle} className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{`${prices}$`}</div>
                </a>
                </li>
        )
    })

    const errorMessage = error ? <ErrorPage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {comicsItems}
            </ul>
            <button className="button button__main button__long"
                    disabled={requestLoading}
                    style={{'display': comicsLoaded? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;