import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import app from "../firebase"
import {
  selectUserEmail,
} from '../redux/userSlice';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';

const db = getFirestore(app);
const auth = getAuth(app);


const Home = () => {

  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [ws, setWorkspace] = useState([]);
  const [wsActive, setWorkspaceActive] = useState();
  const userEmail = useSelector(selectUserEmail);


  useEffect(() => {
    getWorkspace(userEmail)

    async function getWorkspace(email) {
      const q = query(collection(db, "tasks"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      let workspaces = [];
      querySnapshot.forEach((doc) => {
        workspaces.push(doc.data().workspace)
      })

      const table = {};
      const workspace = workspaces.filter((index) => {
        return table.hasOwnProperty(index) ? false : (table[index] = true);
      })

      const workspaceOrder = workspace.sort()
      setWorkspace(workspaceOrder);
      setWorkspaceActive(workspaceOrder[0]);
    }

    getTasks(wsActive)

    async function getTasks(workspace) {
      const q = query(collection(db, "tasks"), where("email", "==", userEmail), where("workspace", "==", workspace));
      const querySnapshot = await getDocs(q);
      let tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setTasks(tasks)
    }

  }, [userEmail, wsActive]);

  const handleOpen = () => {
    document.getElementById("detail").style.display = "flex";
  }

  const handleClose = () => {
    document.getElementById("detail").style.display = "none";
  }

  return (
    <Container>
      <Wrapper>
        <SideBar>
          <Title>WORKSPACE</Title>
          {ws &&
            ws.map((item) => (
              <Workspace active="false">
                {item}
                <img src="/images/close.png" />
              </Workspace>
            ))
          }

          <AddWorkspace>
            <AddCircleIcon style={{ marginBottom: "10px", opacity: "0.35", fontSize: "30px" }} />
          </AddWorkspace>
        </SideBar>

        <Right>
          <TitleWS>{wsActive}</TitleWS>
          <ToDo>
            <CheckMark />
            <ToDoInput>
              <ToDoForm>
                <input placeholder="Crea una nueva tarea..." />
              </ToDoForm>
            </ToDoInput>
          </ToDo>

          {tasks &&
            tasks.map((item) => (
              <ToDoItemsWrapper id="todo" onClick={handleOpen}>
                <ToDoItem>
                  <CheckMarkItem />
                  <TextWrapper>
                    <span>
                      {item.title}
                    </span>
                  </TextWrapper>
                  <IconsWrapper>
                    <img src="/images/link.png" alt="" />
                    <img src="/images/close.png" alt="" />
                  </IconsWrapper>
                </ToDoItem>
              </ToDoItemsWrapper>
            ))
          }


          <ToDoDetail id="detail">
            <ToDoDetailWrapper>
              <CloseButton onClick={handleClose}>
                <img src="/images/close.png" />
              </CloseButton>
              <Forms>
                <Detail>
                  <h1>Title: </h1>
                  <input placeholder="task1" />
                </Detail>
                <Detail>
                  <h1>Description: </h1>
                  <textarea placeholder="Description" />
                </Detail>
                <Detail>
                  <h1>Link: </h1>
                  <input placeholder="raidr.dev" />
                </Detail>
                <Detail>
                  <h1>Date: </h1>
                  <input placeholder="29/10/2021" />
                </Detail>
                <SaveButton>
                  <button type="submit">SAVE</button>
                </SaveButton>
              </Forms>
            </ToDoDetailWrapper>
          </ToDoDetail>
        </Right>
      </Wrapper>
    </Container>
  )
}

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
    
    img{
      opacity: 0.35;
    }
  }

  img{
    display: flex;
    width: 18px;
    margin-left: 40px;
    border-radius: 50%;
    background-color: #25273C;
    opacity: 0;
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

  @media screen and (max-width: 468px){
    height: 20px;
    width: 20px;
  }
`

const CheckMarkItem = styled(CheckMark)`
  height: 20px;
  width: 34px;

  &:hover{
    border-color: linear-gradient(135deg, #55DDFF 0%, #C058F3 100%);
    background: linear-gradient(135deg, #55DDFF 0%, #C058F3 100%); 
  }

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
  height: 60px;
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

const ToDoDetail = styled.div`
  position: absolute;
  width: 50%;
  height: 80%;
  display: none;

  @media screen and (max-width: 468px) {
    width: 85%;
    height: 50%;
  }
`


const ToDoDetailWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #25273C;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`

const CloseButton = styled.div`
  width: 98%;
  height: 27px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #25273C;
  margin: 7px;
  border: none;
  img{
    cursor: pointer;
    width: 27px;
    background-color: #25273C;
    height: 27px;
    justify-content: flex-end;
  }

  @media screen and (max-width: 468px) {
    width: 96%;
    img{
      width: 23px;
      height: 23px;
    }
  }
`
const Forms = styled.div`
  padding: 0px 75px;
  width: auto;
  height: auto;
  background-color: #25273C;

  @media screen and (max-width: 468px) {
    padding: 0px 30px;
  }
`

const Detail = styled.div`
  margin-bottom: 15px;
  background-color: #25273C;

  h1 {
    background-color: #25273C;
    font-size: 20px;
  }

  input {
    height: 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    width: 90%;
    padding: 2px 20px;
  }

  textarea {
    border: none;
    height: 100px;
    outline: none;
    border-radius: 5px;
    width: 90%;
    padding: 5px 20px;
  }

  @media screen and (max-width: 468px) {
    h1{
      font-size: 20px;
    }
  }
`

const SaveButton = styled.div`
  display: flex;
  height: 100px;
  background-color: #25273C;
  justify-content: center;

  button{
    cursor: pointer;
    margin-top: 10px;
    width: 200px;
    height: 70px;
    border-radius: 40px;
    border: none;
    background-color: #3269c9;
    font-size: 20px;
    letter-spacing: 1.5px;
    transition: all 500ms ease-in-out;

    &:hover{
      transition: all 500ms ease-in-out;
      background-color: #4477cf;
    }
  }

  @media screen and (max-width: 468px) {
    button{
      height: 50px;
      width: 150px;
      font-size: 16px;
    }
  }
`

export default Home
