import { useParams, Link} from 'react-router-dom';
import {useState, useEffect } from 'react';
import {Helmet} from 'react-helmet';

import useComicsService from '../../services/ComicsService';
import Spinner from '../spinner/Spinner';
import ErrorPage from '../error/Error404';

import './singleComic.scss';

const SingleComic = () => {
    const {comicId} = useParams();
    
    const [comic, setComic] = useState(null);
    
    const {loading, error, getSingleComic, clearError} = useComicsService()
    
    useEffect(() => {
        updateComic();
    }, [comicId])


    const onLoadedComic = (comic) => {
        clearError();
        setComic(comic);
    }

    const updateComic = () => {

       getSingleComic(comicId)
                    .then(onLoadedComic)
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorPage/> : null;
    const content = !(loading || error || !comic) ? <ViewComic comic={comic}/> : null;

    return (
    <div className="char__info">
        {spinner}
        {errorMessage}
        {content}
    </div>
    )  
}

const ViewComic = ({comic}) => { 
    
    const {title, thumbnail, description, prices, pageCount, language} = comic;
    
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`Page about ${title} comics`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{prices}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;
