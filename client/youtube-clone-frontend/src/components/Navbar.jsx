import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom";

const Container = styled.div`
    position: sticky;
    top: 0;
    background: ${({theme}) => theme.bgLighter};
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

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Search for="search">
                    <Input placeholder="Search" id="search" name="search"/>
                    <Link to="/video/searchedVideo" style={{textDecoration: "none", color: "inherit"}}>
                        <SearchOutlinedIcon />
                    </Link>
                </Search>
                <LoginButton><AccountCircleOutlinedIcon />SIGN IN</LoginButton>
            </Wrapper>
        </Container>
    );
}

export default Navbar;