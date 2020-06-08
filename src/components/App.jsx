import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MKSelectFighter from './MKSelectFighter/MKSelectFighter';
import MKVSScreen from './MKVSScreen/MKVSScreen';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/vs">
                    <MKVSScreen />
                </Route>
                <Route path="/">
                    <MKSelectFighter />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
