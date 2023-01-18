import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    overflow-y: hidden;
    height: 100vh;
    width: 100%;
    background-color: #000000a6;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    position: relative;
    width: 600px;
    height: 600px;
    background-color: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.text};
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`

const Title = styled.h1`
    color: ${({theme}) => theme.text};
`

const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`

const Input = styled.input`
    border: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
`

const Label = styled.label`
    font-size: 14px;
`

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.textSoft};
`

const Description = styled.textarea`
    border: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
`

const UploadVideo = ({toggleUploadVideoTab}) => {

    const [videoImage, setVideoImage] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [videoTitle, setVideoTitle] = useState("");
    const [videoTags, setVideoTags] = useState([]);
    const [videoDescription, setVideoDescription]= useState("");

    useEffect(() => {
        // Hides the scroll bar so that the modal fills the whole page.
        document.body.style.overflow = "hidden";
    })

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => toggleUploadVideoTab(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])}/>
                <Input type="text" placeholder="Title" onChange={(e) => setVideoTitle(e.target.value)}/>
                <Description placeholder="Description" rows={8} onChange={(e) => setVideoDescription(e.target.value)}></Description>
                <Input type="text" placeholder="Seperate the tags with commas" onChange={(e) => setVideoTags(e.target.value.split(','))}/>
                <Label>Image:</Label>
                <Input type="file" accept="image/*" onChange={(e) => setVideoImage(e.target.files[0])}/>
                <Button>Upload</Button>
            </Wrapper>
        </Container>
    );
}

export default UploadVideo;