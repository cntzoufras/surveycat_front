import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
// import Cookie from './utils/cookie';

// import * as React from 'react';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const fetchPosts = async () => {
    const response = await Axios('http://localhost/api/posts');

    setPosts(response.data.data);
  };
  return (
    <div className='App'>
      {posts &&
        posts.map(post => {
          return (
            <div key={post.id} style={{ alignItems: 'center', margin: '20px 60px' }}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <p>{post.created_at}</p>
              <p>{post.updated_at}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
