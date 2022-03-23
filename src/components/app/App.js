import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

import decoration from '../../resources/img/vision.png';

const App = () => {
    
    const [activeChar, setChar] = useState(null);

    const onSetActiveChar = (id) => {
        setChar(id);
    }

    return (
    <div className="app">
        <AppHeader/>
        <main>
            <AppBanner/>
            <ComicsList/>
            {/* <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSetActiveChar={onSetActiveChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={activeChar}/>
                </ErrorBoundary>
            </div> */}
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
    </div>
)
}

export default App;