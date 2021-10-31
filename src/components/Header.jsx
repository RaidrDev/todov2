import React, { useEffect } from 'react'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu';
import app from "../firebase"
import { useHistory } from 'react-router'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
      } else {
        // User is signed out
        history.push("/register")
      }
    });
  }, [])


  const handleSignout = () => {
    signOut(auth).then(() => {
      history.push("/register")
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Container>
      <Left>
        <Menu>
          <MenuIcon style={{ fontSize: "35px" }} />
        </Menu>
        <Logo>TODO.</Logo>
      </Left>
      {true && <>
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
