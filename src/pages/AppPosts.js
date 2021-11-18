import React, { useState, useEffect } from 'react';
import PostService from "../services/PostService";

export default function AppPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function retrievePosts() {
            const data = await PostService.getAll();
            setPosts(data);
        };
        retrievePosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div style={{ display: 'flex', flexDirection: 'column', }} key={post.id}>
                    <p>Title: {post.title}</p>
                    <p>Text:{post.text}</p>
                </div>
            ))}
        </div>
    );
}