import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../services/PostService';
import AddComment from '../components/AddComment';

export default function SinglePost() {
    const [post, setPost] = useState({});
    const { id } = useParams();

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

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <AddComment
                postId={post.id}
                addCommentFunction={handleAddComment}
            />

            {post.comments && post.comments.length ? (
                <ul>
                    {post.comments.map((comment) => (
                        <li key={comment.id}>{comment.text}</li>
                    ))}
                </ul>
            ) : (
                <p>No comments</p>
            )}
        </div>
    );
}