import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PostService from '../services/PostService';

export default function AddPost() {
    const [newPost, setNewPost] = useState({ title: '', text: '' });
    const history = useHistory();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await PostService.edit(id, newPost);
        } else {
            await PostService.add(newPost);
        }
        history.push('/posts');
    };

    const handleReset = () => {
        setNewPost({ title: '', text: '' });
    };

    useEffect(() => {
        async function retrievePost() {
            const { id: _, ...restData } = await PostService.get(id);
            setNewPost(restData);
        };

        if (id) {
            retrievePost();
        }
    }, [id]);

    return (
        <div>
            <h1>{id ? 'Edit' : 'Add new'} post</h1>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                <input
                    value={newPost.title}
                    placeholder='Title'
                    onChange={({ target }) =>
                        setNewPost({ ...newPost, title: target.value })
                    }
                    required
                    minLength={2}
                />
                <input
                    value={newPost.text}
                    placeholder='Text'
                    onChange={({ target }) =>
                        setNewPost({ ...newPost, text: target.value })
                    }
                    required
                    maxLength={300}
                />
                <button>{id ? 'Edit' : 'Add'} post</button>
                <button type='button' onClick={handleReset}>Reset</button>
            </form>
        </div>
    )
}