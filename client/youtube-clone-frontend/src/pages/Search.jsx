import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Card from "../components/Card";

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`

const Search = () => {

    const query = useLocation().search // -->  {pathname: ‘/products/school/’, search: ‘?bags’, hash: ‘’, state: undefined}
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        
        const fetchVideos = async () => {
            try {
                const req = await axios.get(`http://localhost:3000/api/videos/search${query}`)
                setVideos(req.data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchVideos();

    }, [query])

    return (
        <Container>
            {videos.map(video => (
                <Card key={video._id} videoData={video}/>
            ))}
        </Container>
    );
}

export default Search;