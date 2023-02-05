import styled from "styled-components";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "./Movie";
import { toast } from "react-toastify";

function Dashboard({ query, setQuery, user }) {
  const [movies, setMovies] = useState([]);
  const [watching, setWatching] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get('/api/movies/watchlist', {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .catch((err) => console.log(err))
        .then((res) => {
          setMovies(res.data);
        });
    };
    fetchData();
  }, [movies]);

  async function AddToMovies() {
    await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
    )
      .catch((err) => console.log(err))
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setWatching(data.Search[0]);
          toast.success("Added successfully");
          // console.log(data.Search[0])
        } else if (data.Response === "False") {
          // console.log(data)
          toast.error(data.Error);
        }
      });
  }

  useEffect(() => {
    const AddMovie = async () => {
      await axios
        .post('/api/movies/watchlist', watching, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .catch((err) => console.error(err));
    };
    AddMovie();
  }, [watching]);

  function handleClick() {
    AddToMovies().then(setWatching(""));
  }

  return (
    <>
      <Header user={user} />

      <Wrapper>
        <div className="search-field">
          <Input
            type="text"
            name="search"
            placeholder="search for a media to add it"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" onClick={handleClick}>
            Add
          </button>
        </div>
        <Container>
          {movies &&
            movies.map((movie, index) => <Movie key={index} movie={movie} />)}
        </Container>
      </Wrapper>
    </>
  );
}

export default Dashboard;

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  overflow-x: hidden;
  /* background: #ECECEC; */

  .search-field {
    text-align: center;
    padding: 15px 30px;
  }

  .search-btn {
    cursor: pointer;
    display: inline-block;
    padding: 0.4rem 1.4rem;
    margin-left: 10px;
    border: none;
    outline: none;
    background: transparent;
    border: 2px solid #000;
    border-radius: 2px;
    color: #000;
    /* font-weight: bolder; */
    border-radius: 20px;
    box-shadow: 3px 4px 2px #000;
    margin: 0 10px;

    @media (max-width: 800px) {
      margin: 12px 0;
    }

    &:hover {
      background: black;
      color: white;
      transition: all 0.3s ease-in;
      box-shadow: 1px 1px 1px #000;
    }
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1400px;
  margin: 0 auto;
  padding: 15px 33px;
  grid-gap: 2rem;

  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 150px);
    position: relative;
    right: 1.5rem;
    grid-gap: 50px;
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }

  @media (min-width: 400px) {
    position: relative;
    right: 5px;
  }

  p {
    text-align: center;
  }

  img {
    height: 350px;
    width: 350px;
    object-fit: contain;
  }
`;
const Input = styled.input`
  padding: 7px 0;
  width: 300px;
  padding-left: 10px;
  border: none;
  outline: none;
  border: 2px solid #000;
  border-radius: 14px;
  box-shadow: 3px 4px 2px #000;
  background-color: #ececec;
`;
