import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../logo.png";

function Header({ user }) {
  const location = useLocation();
  const activeLink = location.pathname;

  return (
    <Nav>
      <Container>
        <div className="logo">
          <img src={logo} alt="app-logo" />
        </div>
        <ul className="nav-links">
          <li>
            <div className="user-icon">
              <FaRegUserCircle />
              <p>{user.name}</p>
            </div>
          </li>
          <li
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            <div className="right-icon">
              <p>SIGN OUT</p>
              <BiLogOut />
            </div>
          </li>
        </ul>
      </Container>
      <Pages>
        <div className="content">
          <StyledLink
            to="/watchlist"
            className={activeLink === "/watchlist" ? "active" : ""}
          >
            Watchlist
          </StyledLink>
          <StyledLink
            to="/considering"
            className={activeLink === "/considering" ? "active" : ""}
          >
            Considering
          </StyledLink>
          <StyledLink
            to="/completed"
            className={activeLink === "/completed" ? "active" : ""}
          >
            Completed
          </StyledLink>
        </div>
      </Pages>
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  padding: 10px 0;
  width: 100vw;

  a {
    text-decoration: none;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  @media (max-width: 800px) {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    p {
      font-size: 20px;
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    @media (max-width: 800px) {
      margin-right: auto;
    }
  }

  .logo img {
    font-size: 3rem;
  }

  .right-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;

    @media (max-width: 800px) {
      font-size: 22px;
    }
  }

  .user-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 800px) {
      font-size: 22px;
    }
  }

  li {
    list-style-type: none;
  }
  .nav-links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;

    @media (max-width: 800px) {
      gap: 1px;
      position: relative;
      /* left: 1.5rem; */
    }
  }
  .nav-links li {
    cursor: pointer;
    margin-right: 40px;
    font-size: 2rem;
    font-family: "Bebas Neue", sans-serif;

    @media (max-width: 768px) {
      margin-right: 15px;
    }
  }
`;
const Pages = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 15px 0;
  box-shadow: 5px 3px 1px #000;
  height: 100%;
  border: 2px solid #000;
  width: 500px;
  margin: 0 auto;

  @media (max-width: 800px) {
    width: 88vw;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 0 auto;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    @media (max-width: 800px) {
      width: 100vw;
      font-size: small;
      margin: 0 auto;
    }
  }
`;
const StyledLink = styled(Link)`
  &.active {
    /* border-bottom: 2px solid #000; */
    background: #000;
    padding: 5px 8px;
    color: #fff;
  }
`;
