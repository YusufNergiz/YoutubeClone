import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';


const Container = styled.div`
    z-index: 10;
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
    const [videoTags, setVideoTags] = useState([]);
    const [videoInputs, setVideoInputs] = useState({});

    // Uploading Percentages
    const [imagePercentage, setImgPercentage] = useState(0);
    const [videoPercentage, setVideoPercentage] = useState(0);

    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));

    useEffect(() => {
        // Hides the scroll bar so that the modal fills the whole page.
        document.body.style.overflow = "hidden";
    })

    const handleInputChange = (e) => {
        setVideoInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const currentDate = new Date();
        const storageRef = ref(storage, `${currentDate}` + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            {urlType === "videoUrl" ? setVideoPercentage(progress) : setImgPercentage(progress)};
            switch (snapshot.state) {
            case 'paused':
                {urlType === "videoUrl" ? setVideoPercentage("Paused") : setImgPercentage("Paused")};
                break;}
        }, 
        (error) => {
            switch (error.code) {
            case 'storage/unauthorized':
                {urlType === "videoUrl" ? setVideoPercentage("User don't have permission!") : setImgPercentage("User don't have permission!")};

                break;
            case 'storage/canceled':
                {urlType === "videoUrl" ? setVideoPercentage("Upload Cancelled") : setImgPercentage("Upload Cancelled")};
                break;
            case 'storage/unknown':
                {urlType === "videoUrl" ? setVideoPercentage("Oops.. Something went wrong") : setImgPercentage("Oops.. Something went wrong")};
                break;
            }
        }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setVideoInputs((prev) => {
                    return {...prev, [urlType] : downloadURL}
                })
                });
            }
            );
    }

    useEffect(() => {
        video && uploadFile(video, "videoUrl")
    }, [video])

    useEffect(() => {
        videoImage && uploadFile(videoImage, "imgUrl")
    }, [videoImage])


    const uploadVideo = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/videos/", {...videoInputs, tags: videoTags }, {
                withCredentials: true
            })
            toggleUploadVideoTab(false);
            res.status === 200 && navigate(`/video/${res.data._id}`);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => toggleUploadVideoTab(false)}>X</Close>
                <Title>Upload a New Video</Title>
                {videoPercentage > 0 ? `Uploading ${Math.round(videoPercentage)}%` : <Input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])}/>}
                <Input type="text" placeholder="Title" onChange={handleInputChange} name="title"/>
                <Description placeholder="Description" rows={8} onChange={handleInputChange} name="description"></Description>
                <Input type="text" placeholder="Seperate the tags with commas" onChange={(e) => setVideoTags(e.target.value.split(','))}/>
                <Label>Image:</Label>
                {imagePercentage > 0 ? `Uploading ${Math.round(imagePercentage)}%` : <Input type="file" accept="image/*" onChange={(e) => setVideoImage(e.target.files[0])}/>}
                <Button onClick={uploadVideo}>Upload</Button>
            </Wrapper>
        </Container>
    );
}

export default UploadVideo;