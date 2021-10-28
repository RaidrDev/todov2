import React from 'react'
import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 70px);
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 468px) {
    overflow: visible;
    overflow-x: hidden;
  }
`
const Wrapper = styled.div`
  top: 0;
  left: 0;
  right: -17px;
  height: 90%;
  display: flex;
  align-items: center;
  padding: 40px 0px;
  overflow-y: scroll;
  position: absolute;

  @media screen and (max-width: 468px) {
    position: sticky;
  }
`

const SideBar = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 50px;

  @media screen and (max-width: 468px) {
    display: none;
  }
`

const Title = styled.h1`
  padding: 0px 50px;
  font-weight: 200;
  font-size: 20px;
  letter-spacing: 0.2rem;
  margin-bottom: 20px;
`

const Workspace = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  height: 60px;
  width: 70%;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: ${props => props.active === "true" ? "600" : "400"};
  color: #615c70;
  color: ${props => props.active === "true" && "#3A71D1"};
  transition: all 500ms ease-in-out;
  margin-bottom: 10px;
  
  &:hover{
    background-color: #25273C;
  }

  img{
    display: flex;
    align-items: center;
    width: 18px;
    margin-left: 10px;
    border-radius: 50%;
    background-color: #25273C;
    opacity: 0.35;
  }
`

const AddWorkspace = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 500ms ease-in-out;

  &:hover{
    transition: all 500ms ease-in-out;
    transform: scale(1.2);
  }
`



const Right = styled.div`
  flex: 6;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleWS = styled.h1`
  display: none;
  font-weight: 300;
  font-size: 25px;

  @media screen and (max-width: 468px){
    display: flex;
  }
`

const ToDo = styled.div`
  width: 40%;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #25273C;
  border-radius: 18px;
  padding: 0px 15px;
  margin-bottom: 50px;

  @media screen and (max-width: 468px) {
    width: 75%;
    height: 60px;
    margin-top: 10px;
  }
`

const ToDoInput = styled.div`
  display: flex;
  width: 100%;
`

const ToDoForm = styled.form`
  flex-grow: 1;
  display: flex;
  background-color: #25273C;

  input{
    width: 100%;
    padding: 10px 20px;
    font-size: 16px;
    background-color: transparent;
    border: none;
    outline: none;
    color: hsl(234, 39%, 85%);
  }
`

const CheckMark = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid hsl(237, 14%, 26%);
  transition: all 0.25s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
    border-color: linear-gradient(135deg, #55DDFF 0%, #C058F3 100%);
    background: linear-gradient(135deg, #55DDFF 0%, #C058F3 100%); 
  }

  @media screen and (max-width: 468px){
    height: 20px;
    width: 20px;
  }
`

const CheckMarkItem = styled(CheckMark)`
  height: 20px;
  width: 30px;

  @media screen and (max-width: 468px){
    height: 20px;
    width: 38px;
  }
`

const ToDoItemsWrapper = styled.div`
  margin-top: 7px;
  width: 60%;
  transition: all 450ms ease-in-out;

  &:hover{
    transition: all 450ms ease-in-out;
    transform: scale(1.04);
  }

  @media screen and (max-width: 468px){
    width: 90%;
  }
`

const ToDoItem = styled.div`
  display: flex;
  background-color: #25273C;
  padding: 0px 15px;
  border-radius: 10px;
  height: 70px;
  text-align: center;
  align-items: center;
  padding: 0px 15px;
  overflow: hidden;
  cursor: pointer;

  @media screen and (max-width: 468px){
    height: 60px;
  }
`

const TextWrapper = styled.div`
  width: 85%;
  background-color: #25273C;
  display: flex;
  align-items: center;

  span{
    margin-left: 10px;
    background-color: #25273C;
  }
`


const IconsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 50%;
  margin-left: 40%;
  background-color: #25273C;

  img {
    cursor: pointer;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: #25273C;
    margin-right: 7px;

    @media screen and (max-width: 468px){
      height: 20px;
      width: 20px;
    }
  }
`


const Home = () => {
  return (
    <Container>
      <Wrapper>
        <SideBar>
          <Title>WORKSPACE</Title>

          <Workspace active="true">
            School
            <img src="/images/close.png" />
          </Workspace>

          <Workspace active="false">
            Work
            <img src="/images/close.png" />
          </Workspace>

          <Workspace active="false">
            Compra
            <img src="/images/close.png" />
          </Workspace>

          <AddWorkspace>
            <AddCircleIcon style={{ marginBottom: "10px", opacity: "0.35", fontSize: "30px" }} />
          </AddWorkspace>
        </SideBar>

        <Right>
          <TitleWS>School</TitleWS>
          <ToDo>
            <CheckMark />
            <ToDoInput>
              <ToDoForm>
                <input placeholder="Crea una nueva tarea..." />
              </ToDoForm>
            </ToDoInput>
          </ToDo>

          <ToDoItemsWrapper>
            <ToDoItem>
              <CheckMarkItem />
              <TextWrapper>
                <span>
                  task 1
                </span>
              </TextWrapper>
              <IconsWrapper>
                <img src="/images/link.png" alt="" />
                <img src="/images/close.png" alt="" />
              </IconsWrapper>
            </ToDoItem>
          </ToDoItemsWrapper>

          <ToDoItemsWrapper>
            <ToDoItem>
              <CheckMarkItem />
              <TextWrapper>
                <span>
                  task 2
                </span>
              </TextWrapper>
              <IconsWrapper>
                <img src="/images/link.png" alt="" />
                <img src="/images/close.png" alt="" />
              </IconsWrapper>
            </ToDoItem>
          </ToDoItemsWrapper>

          <ToDoItemsWrapper>
            <ToDoItem>
              <CheckMarkItem />
              <TextWrapper>
                <span>
                  task 3
                </span>
              </TextWrapper>

              <IconsWrapper>
                <img src="/images/link.png" alt="" />
                <img src="/images/close.png" alt="" />
              </IconsWrapper>
            </ToDoItem>
          </ToDoItemsWrapper>

        </Right>
      </Wrapper>
    </Container>
  )
}

export default Home
