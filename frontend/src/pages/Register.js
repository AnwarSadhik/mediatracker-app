import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { TfiPencil } from 'react-icons/tfi'
import { MdEmail } from 'react-icons/md'
import { IoMdKey } from 'react-icons/io'

function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const res = await axios
      .post('/api/users/register', inputs, {
        "Content-Type": "application/json",
      })
      .catch((err) => toast.error(err.response.data.message));

    if (res.status === 201) {
      toast.success("User registered successfully");
      navigate("/login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <Wrapper>
      <Container>
        <form onSubmit={handleSubmit}>
          <h2>Register your account</h2>
          <div className="input-fields">
          <label htmlFor="name">Name</label>
            <div className="field">
              <TfiPencil className="icon" />
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="enter your name"
              />
            </div>
            <br />
            <label htmlFor="email">Email</label>
            <div className="field">
              <MdEmail className='icon' />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="enter your email"
              />
            </div>
            <br />
            <label htmlFor="password">Password</label>
            <div className="field">
              <IoMdKey className="icon" />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="enter your password"
              />
            </div>
          </div>
          <div className="btn">
            <button type="submit">Register</button>
          </div>
        </form>
      </Container>
    </Wrapper>
  );
}

export default Register;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ECECEC;

  h2 {
    color: black;
    text-align: center;
  }
  p {
    padding: 10px 0;
    color: white;
  }
`;
const Container = styled.div`
  .input-fields {
    padding: 25px 0;
  }

  .field {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .icon {
    position: absolute;
    left: 10px;
    top: 12px;
    color: black;

    @media (max-width: 800px) {
      top: 12px;
      left: 30px;
    }


  }

  input {
    margin-bottom: 5px;
    width: 350px;
    background: transparent;
    border: none;
    outline: none;
    border: 2px solid #000;
    padding: 10px 0;
    padding-left: 30px;
    color: black;
    border-radius: 10px;
    /* box-shadow: 10px 8px 2px #52206b; */
    box-shadow: 5px 8px 2px #000;


    @media (max-width: 800px) {
      width: 285px;
    }
  }

  .btn {
    text-align: center;
  }

    .btn button {
      cursor: pointer;
      display: inline-block;
      padding: 0.4rem 2rem;
      margin-top: 2.2rem;
      margin-left: 1rem;
      border: none;
      outline: none;
      background: transparent;
      border: 2px solid #000;
      color: black;
      font-weight: bolder;
      margin: 0 auto;
      border-radius: 20px;
      box-shadow: 5px 5px 2px #000;


      &:hover {
        background: black;
        color: white;
        transition: all 0.3s ease-in;
        box-shadow: none;
      }

    }

`;
