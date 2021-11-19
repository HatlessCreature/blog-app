import React, { useState } from 'react';
import PostService from '../services/PostService';

export default function AddComment({ postId, addCommentFunction }) {
    const [newComment, setNewComment] = useState({ text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await PostService.addComment(newComment, postId);

        if (data) {
            addCommentFunction(data);
        }
        setNewComment({ text: '' });
    };

    return (
        <div>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newComment.text}
                    onChange={({ target }) => setNewComment({ text: target.value })}
                />
                <button>Add Comment</button>
            </form>
        </div>
    );
}