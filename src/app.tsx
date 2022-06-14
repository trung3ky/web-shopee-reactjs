import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
    LandingPage,
    ContentListPage,
    ContentPage,
    NotFoundPage,
} from './page';
import './style/index.scss';

export function App() {
    return (
        <div className='app'>
            <div className='header'></div>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <LandingPage />
                    </Route>
                    <Route path='/content-list'>
                        <ContentListPage />
                    </Route>
                    <Route path='/content-view'>
                        <ContentPage />
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
