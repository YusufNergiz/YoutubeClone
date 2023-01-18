import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
    display: flex;
    gap: 10px;   
    margin: 30px 0px;
    color: ${({theme}) => theme.text};
`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
`

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.textSoft};
    margin-left: 5px;
`

const Text = styled.span`
    font-size: 14px;
`

const Comment = ({commentData}) => {

    const [commentOwner, setCommentOwner] = useState();

    useEffect(() => {
        const fetchCommentOwner = async () => {
            try {
                const currentCommentOwner = await axios.get(`http://localhost:3000/api/users/find/${commentData.userId}`, {
                    withCredentials: true
                })
                setCommentOwner(currentCommentOwner.data);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchCommentOwner();
    })

    return (
        <Container>
            <Avatar src={commentOwner?.img}/>
            <Details>
                <Name>{commentOwner?.name} <Date>{format(commentData?.createdAt)}</Date></Name>
                <Text>{commentData?.message}</Text>
            </Details>
        </Container>
    );
}

export default Comment;