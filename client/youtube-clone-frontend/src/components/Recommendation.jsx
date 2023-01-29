import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
    flex: 2;
`

const Recommendation = ({tags}) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/videos/tags?tags=${tags}`);
                setVideos(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchVideos();
    }, [tags])

    return (
        <Container>
            {videos.map(video => (
                <Card type="sm" videoData={video} key={video._id}/>
            ))}
        </Container>
    );
}

export default Recommendation;