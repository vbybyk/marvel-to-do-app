import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

// import { MainPage, ComicsPage, Error404, SingleComic} from '../pages';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const Error404 = lazy(() => import('../pages/404'));
const SingleComic = lazy(() => import('../pages/SingleComic'));

const App = () => {
    
    return (
    <Router>
        <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComic/>}/>
                        <Route path="*" element={<Error404/>}/>
                    </Routes>
                </Suspense>
            </main>
        </div>
    </Router>
)
}

export default App;