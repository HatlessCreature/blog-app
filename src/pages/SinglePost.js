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