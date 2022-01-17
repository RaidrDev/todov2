import React, { useEffect } from 'react'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu';
import app from "../firebase"
import { useHistory } from 'react-router'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  setUserLogin,
  setSignOut,
  selectUserEmail,
} from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const auth = getAuth(app);

const Container = styled.div`
  height: 50px;
  padding: 10px 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 468px){
    padding: 10px 30px;
  }
  
`

const Left = styled.div`
  flex: 1;
  display: flex;
`

const Menu = styled.div`
  display: none;

  @media screen and (max-width:468px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }
`

const Logo = styled.h1`
  font-weight: 800;
  font-size: 40px;
  letter-spacing: 0.4rem;
  color: white;

  @media screen and (max-width: 468px){
    font-size: 30px;
  }
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Icon = styled.img`
  border-radius: 50%;
  border: 1px solid white;
  height: 45px;
  width: 45px;
  object-fit: cover;

  @media screen and (max-width: 468px){
    display: none;
  }
`

const Button = styled.button`
  display: flex;
  cursor: pointer;
  padding: 10px 20px;
  background-color: transparent;
  border-radius: 20px;
  border: 1.5px solid white;
  align-items: center;
  margin-right: 20px;
  transition: all 500ms ease-in-out;
  color: white;
  font-weight: 400;

  &:hover{
    transition: all 500ms ease-in-out;
    transform: scale(1.1);
  }

  @media screen and (max-width: 468px){
    padding: 5px 10px;
  }
`

const Header = () => {
  const history = useHistory();
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserLogin({
          name: user.displayName,
          email: user.email,
        }))
      } else {
        // User is signed out
        history.push("/register")
      }
    });
  }, [history, dispatch])


  const handleSignout = () => {
    signOut(auth).then(() => {
      dispatch(setSignOut());
      history.push("/register")
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleOpenSideBar = () => {
    if (document.getElementById("sidebar").style.display === "none") {
      document.getElementById("sidebar").style.display = "flex";
      document.getElementById("right").style.display = "none";
    } else {
      document.getElementById("sidebar").style.display = "none";
      document.getElementById("right").style.display = "flex";
    }
  }

  return (
    <Container>
      <Left>
        {userEmail && <>
          <Menu>
            <MenuIcon style={{ fontSize: "35px" }} onClick={handleOpenSideBar} />
          </Menu>
        </>
        }
        <Logo>TODO.</Logo>
      </Left>
      {userEmail && <>
        <Right>
          <Button onClick={handleSignout}>
            SIGN OUT
          </Button>
          <Icon src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </Right>
      </>}

    </Container>
  )
}

export default Header
