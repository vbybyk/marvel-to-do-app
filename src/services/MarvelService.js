import {useHttp} from '../hooks/http.hooks'

const useMarvelService = () => {
  
  const {loading, request, error, clearError, process, setProcess} = useHttp();

  const _ApiBase = 'https://gateway.marvel.com:443/v1/public';
  const _ApiKey = 'apikey=c0f7aa699e78f7dd434a9b1612278a6b';
  const _BasicOffset = 210;

  const getAllCharacters = async (offset = _BasicOffset) => {
    const res = await request(`${_ApiBase}/characters?limit=9&offset=${offset}&${_ApiKey}`);
    return res.data.results.map(_transformCharacter)
  }
  const getCharacter = async (id) => {
    const res = await request(`${_ApiBase}/characters/${id}?&${_ApiKey}`);
    return _transformCharacter(res.data.results[0])
  }
  const getCharacterByName = async (name) => {
    const res = await request(`${_ApiBase}/characters?name=${name}&${_ApiKey}`);
    return res.data.results.map(_transformCharacter)
  }
  const _transformCharacter = (char) => {
    return {
        id: char.id,
        name: char.name,
        description: char.description,
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
    }
  }
  return {
      loading, 
      error, 
      getAllCharacters, 
      getCharacter, 
      getCharacterByName, 
      clearError,
      process,
      setProcess
    }
}

export default useMarvelService;