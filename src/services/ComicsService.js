import {useHttp} from '../hooks/http.hooks'

const useComicsService = () => {
  
  const {loading, request, error, clearError} = useHttp();

  const _ApiBase = 'https://gateway.marvel.com:443/v1/public';
  const _ApiKey = 'apikey=c0f7aa699e78f7dd434a9b1612278a6b';
  const _BasicOffset = 150;

  const getAllComics = async (offset = _BasicOffset) => {
    const res = await request(`${_ApiBase}/comics?limit=8&offset=${offset}&${_ApiKey}`);
    return res.data.results.map(_transformComics)
  }
  const getSingleComic = async (id) => {
    const res = await request(`${_ApiBase}/comics/${id}?&${_ApiKey}`);
    return _transformComics(res.data.results[0])
  }
  const _transformComics = (com) => {
    return {
        id: com.id,
        title: com.title,
        // description: com.description,
        thumbnail: com.thumbnail.path + '.' + com.thumbnail.extension,
        homepage: com.urls[0].url,
        // wiki: com.urls[1].url,
        prices: com.prices[0].price
    }
  }
  return {loading, error, getAllComics, getSingleComic, clearError}
}

export default useComicsService;