import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({theme}) => theme.text};
    color: ${({theme}) => theme.textSoft};
    outline: none;
    background: transparent;
    width: 100%;
`



const Comments = ({videoId}) => {

    const [allComments, setAllComments] = useState();

    useEffect(() => {
        const fetchVideoComments = async () => {
            try {
                const allVideoComments = await axios.get(`http://localhost:3000/api/comments/${videoId}`, {
                    withCredentials: true
                });
                setAllComments(allVideoComments.data);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchVideoComments();
        console.log(allComments)
    }, [])

    return (
        <Container>
            <NewComment>
                <Avatar src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg"/>
                <Input placeholder="Add a comment..."/>
            </NewComment>
            {allComments?.map(comment => (
                <Comment key={comment._id} commentData={comment}/>
            ))}
        </Container>
    );
}

export default Comments;