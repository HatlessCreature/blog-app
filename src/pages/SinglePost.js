import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../services/PostService';

export default function SinglePost() {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function retrievePost() {
            const data = await PostService.get(id);
            setPost(data);
        };
        retrievePost();
    }, []);

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
        </div>
    );
}