import React from "react";
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



const Comments = () => {
    return (
        <Container>
            <NewComment>
                <Avatar src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg"/>
                <Input placeholder="Add a comment..."/>
            </NewComment>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </Container>
    );
}

export default Comments;