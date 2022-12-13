import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { darkTheme, lightTheme } from "../utils/Themes";

// Styled Components

const Container = styled.div`
  display: flex;
`

const Main = styled.div`
  flex: 7;
  background-color: ${({theme}) => theme.bg}
`

const Wrapper = styled.div`
    padding: 22px 20px;
`
const RootLayout = () => {

    const [darkMode, setDarkMode] = useState(true);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Container>
                <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
                <Main>
                    <Navbar />
                    <Wrapper>
                        <Outlet />
                    </Wrapper>
                </Main>
            </Container>
        </ThemeProvider>
    );
}

export default RootLayout;