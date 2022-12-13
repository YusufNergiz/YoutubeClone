import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    gap: 10px;   
    margin: 30px 0px;
    color: ${({theme}) => theme.text}
`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
`

const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.textSoft};
    margin-left: 5px;
`

const Text = styled.span`
    font-size: 14px;
`

const Comment = () => {
    return (
        <Container>
            <Avatar src="https://i.guim.co.uk/img/media/28533e565bb4c54c399e162ab306b19c541994f9/0_97_3158_1895/master/3158.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=33de91116039176f3b67a6d3232cdf30"/>
            <Details>
                <Name>Yussuf Nergiz <Date>1 month ago</Date></Name>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quo a accusamus molestiae quia dolore culpa ullam quae dolorum nisi aut vitae esse quam, aspernatur expedita ratione porro dicta explicabo!</Text>
            </Details>
        </Container>
    );
}

export default Comment;