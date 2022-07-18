import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ChatLists from './components/ChatLists';
import Chat from './components/Chat';

// 1. Router 경로 설정
const App = () => (
  <Router>
    <Route path="/list/" exact component={ChatLists} />
    <Route path="/room/:room_id" component={Chat} />
  </Router>
);

export default App;
