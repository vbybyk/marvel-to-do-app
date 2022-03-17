class MarvelService {
  _ApiBase = 'https://gateway.marvel.com:443/v1/public';
  _ApiKey = 'apikey=c0f7aa699e78f7dd434a9b1612278a6b';
  _BasicOffset = 210;

  getResource = async (url) => {
      let res = await fetch(url)

      if (!res.ok){
        return console.log(`Couldn't get fetch ${url} Status: ${res.status}`)
      }
      return await res.json()
  }

  getAllCharacters = async (offset = this._BasicOffset) => {
    const res = await this.getResource(`${this._ApiBase}/characters?limit=9&offset=${offset}&${this._ApiKey}`);
    return res.data.results.map(this._transformCharacter)
  }
  getCharacter = async (id) => {
    const res = await this.getResource(`${this._ApiBase}/characters/${id}?&${this._ApiKey}`);
    return this._transformCharacter(res.data.results[0])
  }
  _transformCharacter = (char) => {
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
}

export default MarvelService;