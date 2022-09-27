import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function List() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost/api/posts');
    setPosts(response.data);
  };

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return <div className='PostList'></div>;
}
