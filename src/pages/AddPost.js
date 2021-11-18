import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PostService from '../services/PostService';

export default function AddPost() {
    const [newPost, setNewPost] = useState({ title: '', text: '' });
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await PostService.add(newPost);
        history.push('/posts');
    };

    return (
        <div>
            <h1>Add new post</h1>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                <input
                    value={newPost.title}
                    placeholder='Title'
                    onChange={({ target }) =>
                        setNewPost({ ...newPost, title: target.value })
                    }
                />
                <input
                    value={newPost.text}
                    placeholder='Text'
                    onChange={({ target }) =>
                        setNewPost({ ...newPost, text: target.value })
                    }
                />
                <button>Add</button>
            </form>
        </div>
    )
}