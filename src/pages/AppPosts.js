import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostService from "../services/PostService";

export default function AppPosts() {
    const [posts, setPosts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function retrievePosts() {
            const data = await PostService.getAll();
            setPosts(data);
        };
        retrievePosts();
    }, []);

    const handleDelete = async (id) => {
        const data = await PostService.delete(id);
        if (data.count) {
            setPosts(posts.filter((post) => post.id !== id));
        }
    };

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div style={{ display: 'flex', flexDirection: 'column', }} key={post.id}>
                    <p>Title: {post.title}</p>
                    <p>Text: {post.text}</p>
                    <Link to={`/posts/${post.id}`}>View post</Link>
                    <button onClick={() => history.push(`/edit/${post.id}`)}>Edit post</button>
                    <button onClick={() => handleDelete(post.id)}>Delete post</button>
                </div>
            ))}
        </div>
    );
}