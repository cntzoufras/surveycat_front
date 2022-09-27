import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
// import Cookie from './utils/cookie';

// import * as React from 'react';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchComments();
  }, []);
  useEffect(() => {
    console.log(comments);
  }, [comments]);
  const fetchComments = async () => {
    const response = await Axios('http://localhost/api/posts');
    console.log(response.data);

    setComments(response.data);
  };
  return (
    <div className='App'>
      {{ comments } &&
        { comments }.map(comment => {
          return (
            <div key={comment.id} style={{ alignItems: 'center', margin: '20px 60px' }}>
              <h4>{comment.title}</h4>
              <p>{comment.body}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
