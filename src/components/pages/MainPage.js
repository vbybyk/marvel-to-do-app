import {useState} from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [activeChar, setChar] = useState(null);

  const onSetActiveChar = (id) => {
        setChar(id);
  }

  return(
    <>
      <ErrorBoundary>
      <RandomChar/>
      </ErrorBoundary>
      <div className="char__content">
          <ErrorBoundary>
              <CharList onSetActiveChar={onSetActiveChar}/>
          </ErrorBoundary>
          <ErrorBoundary>
              <CharInfo charId={activeChar}/>
          </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;