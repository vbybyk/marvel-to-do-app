import {useState} from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharForm from "../form/CharForm";
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
          <div>
            <ErrorBoundary>
              <CharInfo charId={activeChar}/>
            </ErrorBoundary>
            <CharForm/>
          </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;