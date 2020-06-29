import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home';
import './App.css';
import ContactDetails from './components/contact-details';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/contacts/new" component={ContactDetails} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
