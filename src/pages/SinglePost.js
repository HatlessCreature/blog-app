import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../services/PostService';
import AddComment from '../components/AddComment';
import useFormattedDate from '../hooks/useFormattedDate’';

export default function SinglePost() {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const formattedDate = useFormattedDate(post.createdAt, "dd-MM-yyyy");

    useEffect(() => {
        async function retrievePost() {
            const data = await PostService.get(id);
            setPost(data);
        };
        retrievePost();
    }, [id]);

    const handleAddComment = (comment) => {
        setPost({ ...post, comments: [...post.comments, comment] });
    };

    const handleEditComment = async (id, text) => {
        console.log(id);
        console.log(text);
        let data = await PostService.editComment(id, { text: text });
        console.log(data);
    };

    const handleEditPost = (id, text) => {
        const index = post.comments.findIndex(com => com.id === id)
        setPost({
            ...post, comments: [...post.comments.slice(0, index),
            { id: id, text: text },
            ...post.comments.slice(index + 1)]
        });
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            {formattedDate === "unknown" ? (
                <p>Date unknown</p>
            ) : (
                <p>Created at: {formattedDate}</p>
            )}
            <AddComment
                postId={post.id}
                addCommentFunction={handleAddComment}
            />

            {post.comments && post.comments.length ? (
                <div>
                    <h2>Comments:</h2>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {post.comments.map((comment) => (
                            < div key={comment.id} >

                                <input
                                    type='text'
                                    value={comment.text}
                                    onChange={({ target }) => handleEditPost(comment.id, target.value)}
                                />
                                <button type='button' onClick={() => handleEditComment(comment.id, comment.text)}>Save</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No comments</p>
            )
            }
        </div >
    );
}