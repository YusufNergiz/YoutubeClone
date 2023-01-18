import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

import { useLoaderData } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

const Home = () => {

    const randomVideos = useLoaderData();

    return (
        <Container>
            {randomVideos?.data.map(video => (
                <Card videoData={video} key={video._id}/>
            ))}
        </Container>
    );
}

export default Home;

export const loader = (type) => {
    const fetchRandomVideos = async () => {
        const randomVideos = await axios.get(`http://localhost:3000/api/videos/${type}`, {
            withCredentials: true
        });
        return randomVideos;
    }
    return fetchRandomVideos();
}