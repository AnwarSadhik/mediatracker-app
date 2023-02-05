import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [words, setWords] = useState(["Movies", "Media", "Shows"]);

  return (
    <Wrapper>
      <Container>
        <h1>One place to Track</h1>
        <div className="scroller">
          Your&nbsp;
          <span>
            {words[0]}
            <br />
            {words[1]}
            <br />
            {words[2]}
            <br />
            {/* {words[3]} */}
          </span>
        </div>
        <div>
          <button className="home-btns" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="home-btns" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  height: 100vh;
  color: #000;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ECECEC;
`;
const Container = styled.div`
  width: 100%;
  max-width: 100%;

  h1 {
    font-size: 40px;
    color: #000;
    font-weight: 300;

    @media (max-width: 800px){
      font-size: 30px;
      font-weight: normal;
      color: black;
  }

  }

  .home-btns {
    cursor: pointer;
    display: inline-block;
    padding: 0.4rem 2rem;
    margin-top: 1rem;
    margin-left: 1rem;
    border: none;
    outline: none;
    background: transparent;
    border: 2px solid #000;
    border-radius: 2px;
    color: #000;
    /* font-weight: bolder; */
    border-radius: 20px;
    box-shadow: 3px 4px 2px #000;

    &:hover {
      background: black;
      color: white;
      transition: all 0.3s ease-in;
      box-shadow: 1px 1px 2px #000;
      /* box-shadow: none; */
    }
  }

  .scroller {
    /* height: 4rem; */
    line-height: 1.2em;
    position: relative;
    overflow: hidden;
    font-size: 35px;
    text-align: center;
  }
  .scroller > span {
    position: absolute;
    top: 0;
    animation: slide 6s infinite;
    color: red;
    font-weight: 900;
  }
  @keyframes slide {
    0% {
      top: 0;
    }
    25% {
      top: -1.2em;
    }
    50% {
      top: -2.4em;
    }
    75% {
      top: -2em;
    }
  }
`;
