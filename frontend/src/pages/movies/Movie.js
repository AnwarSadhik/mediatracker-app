import styled from "styled-components";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

function Movie({ movie }) {
  const { _id } = movie;
  // console.log(_id);

  async function deleteMovie() {
    await axios
      .delete(`/api/movies/dashboard/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("movie deleted successfully");
        } else {
          console.log("err: ", res.status);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      <div className="img-div">
        <img src={movie.Poster} alt="media-image" />
      </div>
      <div className="card-body">
        <p>{movie.Type}</p>
      </div>

      <h4>{movie.Title}</h4>
      <div className="card-footer">
        <p>{movie.Status}</p>
        <MdOutlineDelete className="icon" onClick={deleteMovie} />
      </div>
    </Container>
  );
}

export default Movie;

const Container = styled.div`
  .img-div {
    text-align: center;


    @media (max-width: 800px) {
      img {
        height: 240px;
        width: 240px;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }

  }
  h4 {
    text-align: center;
    font-weight: bolder;
    font-size: 1.4rem;

    @media (max-width: 800px) {
      font-size: smaller;
      text-align: center;
  }

  }
  .card-body p {
    font-size: 14px;
    text-align: center;

  }
  .card-body {
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3rem;

    @media (max-width: 800px) {
      font-size: smaller;
      text-align: center;
      align-items: center;
  }


  }
  .genere-txt {
    font-size: 12px;

    @media (max-width: 800px) {
      font-size: smaller;
  }

  }

  .card-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    @media (max-width: 800px) {
      font-size: 10px;
  }

  }
  .icon {
    cursor: pointer;
    font-size: 20px;
  }


`;
