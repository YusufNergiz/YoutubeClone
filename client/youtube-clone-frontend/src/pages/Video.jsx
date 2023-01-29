import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import Comments from "../components/Comments";
import { useLoaderData, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { likeVideo, dislikeVideo, fetchingFailure, fetchingSuccess, startFetching } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";

import Cookies from 'js-cookie';
import Recommendation from "../components/Recommendation";


const Container = styled.div`
    display: flex;
    gap: 24px;
`

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme}) => theme.soft};
`

const Content = styled.div`
    flex: 5;
`

const VideoWrapper = styled.div`
`

const VideoDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Info = styled.span`
    color: ${({theme}) => theme.textSoft};
`

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({theme}) => theme.text};
` 

const Buttons = styled.div`
    display: flex;
    gap: 20px;
    color: ${({theme}) => theme.text};
`

const Button = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`

const Channel = styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
`

const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.text};
`

const ChannelName = styled.span`
    font-weight: 500;
`

const ChannelCounter = styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.textSoft};
    font-size: 12px;
`

const Description = styled.p`
    font-size: 14px;
`
const Subscribe = styled.button`
    background-color: #cc1a00;
    font-weight: 500;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const VideoFrame = styled.video`
    position: relative;
    overflow: hidden;
    max-height: 720px;
    height: 450px;
    width: 100%;
    object-fit: cover;
`

const Video = () => {

    const randomVideos = useLoaderData();
    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();

    const [currentChannel, setCurrentChannel] = useState();

    const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));

    // The current video ID asbtracted from the URL
    const videoId = useLocation().pathname.split('/video/')[1];

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(startFetching)
                const videoData = await axios.get(`http://localhost:3000/api/videos/find/${videoId}`);
                const channelData = await axios.get(`http://localhost:3000/api/users/find/${videoData.data.userId}`);
                setCurrentChannel(channelData.data);
                dispatch(fetchingSuccess(videoData.data));
            } catch (error) {
                dispatch(fetchingFailure);
                console.log(error)
            }
        }
        fetchData();
    }, [videoId, dispatch])


    const dislike = async () => {
        await axios.put(`http://localhost:3000/api/users/dislike/${currentVideo._id}`, {
            withCredentials: true,
            headers: {
                access_token: accessToken
            }
        });
        dispatch(dislikeVideo(currentUser._id));
    }

    const like = async () => {
        await axios.put(`http://localhost:3000/api/users/like/${currentVideo._id}`, {
            withCredentials: true,
            headers: {
                access_token: accessToken
            }
        })
        dispatch(likeVideo(currentUser._id));
    }

    const handleSubscription = async () => {
        if (currentUser.subscribedUsers?.includes(currentVideo.userId)) {
            await axios.put(`http://localhost:3000/api/users/unsub/${currentVideo.userId}`, {
                withCredentials: true,
                headers: {
                    access_token: accessToken
                }
            });
            dispatch(subscription(currentVideo.userId));
        }
        else {
            await axios.put(`http://localhost:3000/api/users/sub/${currentVideo.userId}`, {
                withCredentials: true,
                headers: {
                    access_token: accessToken
                }
            });
            dispatch(subscription(currentVideo.userId));
        }
    }

    return (
        <Container className="row">
            <Content className="col-xl-8 col-12">
                <VideoWrapper>
                    <VideoFrame src={currentVideo?.videoUrl} controls/>
                </VideoWrapper>
                <Title>{currentVideo?.title}</Title>
                <VideoDetails>
                    <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
                    <Buttons>
                        <Button onClick={like}>
                            {currentVideo?.likes.includes(currentUser?._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} {currentVideo?.likes.length}
                        </Button>
                        <Button onClick={dislike}>
                            {currentVideo?.dislikes.includes(currentUser?._id) ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />} {currentVideo?.dislikes.length}
                        </Button>
                        <Button>
                            <ReplyOutlinedIcon /> Share
                        </Button>
                        <Button>
                            <AddTaskOutlinedIcon /> Save
                        </Button>
                    </Buttons>
                </VideoDetails>
                <Channel>
                    <ChannelInfo>
                        <Image src={currentChannel?.img} />
                        <ChannelDetail>
                            <ChannelName>{currentChannel?.name}</ChannelName>
                            <ChannelCounter>{currentChannel?.subscribedUsers?.length} subscribers</ChannelCounter>
                            <Description>
                                {currentVideo?.description}
                            </Description>
                        </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={handleSubscription}>{currentUser?.subscribedUsers?.includes(currentVideo?.userId) ? "UNSUBSCRIBE" : "SUBSCRIBE"}</Subscribe>
                </Channel>
                <Hr />
                <Comments videoId={currentVideo?._id}/>
            </Content>
            <Recommendation tags={currentVideo.tags}/>
        </Container>     
    );
}

export default Video;

export const loader = () => {
    const fetchRandomVideos = async () => {
        const randomVideos = await axios.get("http://localhost:3000/api/videos/random");
        return randomVideos;
    }

    return fetchRandomVideos();
}