import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  max-width: 360px;
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  height: ${(props) => props.type === "sm" && "100px"};
`;

const Image = styled.img`
  width: ${(props) => props.type === "sm" && "168px"};
  height: ${(props) => (props.type === "sm" ? "94px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;



const Card = ({videoData, type}) => {

  const [channelData, setChannelData] = useState({});

  useEffect(() => {
    const fetchUserChannelData = async () => {
      const userChannelData = await axios.get(`http://localhost:3000/api/users/find/${videoData.userId}`);
      setChannelData(userChannelData.data);
    }
    fetchUserChannelData();

  }, [videoData.userId])

    return (
        <Link to={`/video/${videoData._id}`} style={{textDecoration: "none"}}>
            <Container type={type}>
                <Image src={videoData.imgUrl} type={type}/>
                <Details type={type}>
                    <ProfileImage src={channelData.img} type={type}/>
                    <Texts>
                        <Title>{videoData.title}</Title>
                        <ChannelName>{channelData.name}</ChannelName>
                        <Info>{`${videoData.views} views • ${format(videoData.createdAt)}`}</Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    );
}

export default Card;
