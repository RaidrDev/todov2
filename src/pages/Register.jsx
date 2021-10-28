import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: calc(100vh - 70px);
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  border-right: 1px solid white;
`

const Title = styled.h1`
  margin-top: 100px;
  font-weight: 100;
  font-size: 50px;
`

const Desc = styled.p`
  margin-top: 20px;
  width: 75%;
  font-weight: 200;
`

const Img = styled.div`
  transform: rotate(2deg);
  margin: 70px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Right = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`

const TitleR = styled.h1`
  font-weight: 200;
  font-size: 50px;
`

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  input{
    width: 400px;
    margin-top: 20px;
    font-size: 15px;
    margin-bottom: 20px;
    border: none;
    outline: none;
    border-bottom: 1px solid white;
    padding: 10px;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const RegisterButton = styled.button`
  cursor: pointer;
  margin-top: 20px;
  padding: 16px 150px;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  letter-spacing: 2px;
  background-color: #3A71D1;
  transition: all 500ms ease-in-out;
  &:hover{
    transition: all 500ms ease-in-out;
    transform: scale(1.05);
  }
`

const GoogleButton = styled.button`
  display: flex;
  cursor: pointer;
  margin-top: 20px;
  padding: 15px 150px;
  border-radius: 30px;
  font-weight: 200;
  border: 1px solid white;
  transition: all 500ms ease-in-out;
  &:hover{
    transition: all 500ms ease-in-out;
    transform: scale(1.05);
  }

  img {
    margin-left: 5px;
    width: 20px;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  p{
    cursor: pointer;
    font-weight: 200;
  }
`

const LoginWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  backdrop-filter: blur(20px);
  display: none;
  align-items: center;
  justify-content: center;
  
`

const Login = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 10px;
  box-shadow: rgba(26, 26, 26, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`

const TitleL = styled.div`
  font-weight: 200;
  font-size: 50px;
  display: flex;
  width: 100%;
  justify-content: center;
`

const CloseButton = styled.div`
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px;
  border: none;
  img{
    cursor: pointer;
    width: 27px;
    justify-content: flex-end;
  }
`

const InputsLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  input{
    width: 400px;
    margin-top: 20px;
    font-size: 15px;
    margin-bottom: 20px;
    border: none;
    outline: none;
    border-bottom: 1px solid white;
    padding: 10px;
  }
`

const LinksLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  p{
    cursor: pointer;
    font-weight: 200;
    color: rgba(255,255,255,0.35);
    transition: all 250ms ease-in-out;
    &:hover{
      transition: all 250ms ease-in-out;
      color: rgba(255,255,255,1);
    }
  }
`

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  cursor: pointer;
  margin-top: 30px;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 35px;
  background-color: #3A71D1;
  transition: all 500ms ease-in-out;
  &:hover{
    transition: all 500ms ease-in-out;
    transform: scale(1.08);
  }
`


const Register = () => {
  return (
    <Container>
      <Header />
      <Wrapper>
        <Left>
          <Title>CREATE YOUR OWN NOTES!</Title>
          <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. In quam veritatis veniam ducimus non magni
            sint dolores harum, maiores odio placeat voluptas officia. Mollitia maiores nihil ipsum impedit expedita deleniti!</Desc>
          <Img>
            <img src="/images/preview-web.png" />
          </Img>
        </Left>
        <Right>
          <TitleR>CREATE AN ACCOUNT!</TitleR>
          <Inputs>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="password" placeholder="confirm password" />
          </Inputs>
          <ButtonWrapper>
            <RegisterButton>REGISTER</RegisterButton>
            <GoogleButton>
              <p>Sign In With Google</p>
              <img src="/images/google-icon.png" />
            </GoogleButton>
          </ButtonWrapper>
          <Links>
            <p>ALREADY HAVE AN ACCOUNT? <u>LOGIN</u></p>
          </Links>
        </Right>

        <LoginWrap>
          <Login>
            <CloseButton>
              <img src="/images/close.png" />
            </CloseButton>
            <TitleL>LOGIN</TitleL>
            <InputsLogin>
              <input type="email" placeholder="email" />
              <input type="password" placeholder="password" />
            </InputsLogin>
            <LinksLogin>
              <p>YOU FORGOT YOUR PASSWORD?</p>
            </LinksLogin>
            <LoginButton>
              >
            </LoginButton>
          </Login>
        </LoginWrap>
      </Wrapper>
    </Container>
  )
}

export default Register