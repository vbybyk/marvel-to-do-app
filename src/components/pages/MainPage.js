import {useState} from "react";
import {Helmet} from "react-helmet";
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
  console.log('main page render')
  return(
    <>
      <Helmet>
        <meta
            name="description"
            content="Marvel information portal"
        />
        <title>Marvel information portal</title>
      </Helmet>
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
            <ErrorBoundary>
              <CharForm/>
            </ErrorBoundary>
          </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;