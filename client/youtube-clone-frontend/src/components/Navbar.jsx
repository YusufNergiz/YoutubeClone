import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import UploadVideo from "./UploadVideo";

const Container = styled.div`
    position: sticky;
    top: 0;
    background: ${({theme}) => theme.bgLighter};
    color: ${({theme}) => theme.textSoft};
    height: 56px;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0px 20px;
    justify-content: flex-end;
    position: relative;
`

const Search = styled.label`
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: 40%;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px;
    color: ${({theme}) => theme.text};
`

const Input = styled.input`
    border: none;
    background-color: transparent;
    color: ${({theme}) => theme.text};
    width: 100%;
    outline: none;
`

const LoginButton = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`

const UserDashContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    color: ${({theme}) => theme.text};
    font-weight: 500;
`

const Avatar = styled.img`
    border-radius: 50%;
    width: 36px;
    height: 36px;
    background-color: #999;
`

const LogoutButton = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`

const Navbar = () => {

    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Video Upload Button State
    const [uploadVideoTabOpen, setUploadVideoTabOpen] = useState(false);

    const signout = () => {
        console.log("Sign out CLicked")
        dispatch(logout);
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Search htmlFor="search">
                        <Input placeholder="Search" id="search" name="search"/>
                        <Link to="/video/searchedVideo" style={{textDecoration: "none", color: "inherit"}}>
                            <SearchOutlinedIcon />
                        </Link>
                    </Search>
                    {currentUser ? (
                        <UserDashContainer>
                            <VideoCallOutlinedIcon style={{color: "inherit", cursor: "pointer"}} onClick={() => setUploadVideoTabOpen(!uploadVideoTabOpen)}/>
                            <LogoutButton onClick={signout}>Sign-Out</LogoutButton>
                            <Link to="/"><Avatar src={currentUser.img}/></Link>
                        </UserDashContainer>
                    ) : <Link to="/signin"><LoginButton><AccountCircleOutlinedIcon />SIGN IN</LoginButton></Link>}
                </Wrapper>
            </Container>
            {uploadVideoTabOpen && <UploadVideo toggleUploadVideoTab={setUploadVideoTabOpen}/>}
        </>
    );
}

export default Navbar;