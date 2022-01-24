import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import app from "../firebase"
import {
  selectUserEmail,
} from '../redux/userSlice';
import { getFirestore, collection, getDocs, where, query, addDoc, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux';

const db = getFirestore(app);


const Home = () => {

  const [tasks, setTasks] = useState([]);
  const [ws, setWorkspace] = useState([]);
  const [wsActive, setWorkspaceActive] = useState();
  const [count, setCount] = useState(0);
  const [taskOpen, setTaskOpen] = useState();
  const userEmail = useSelector(selectUserEmail);
  let wsToDelete = "";


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
      if (ws.length === 0) {
        setWorkspaceActive(workspaceOrder[0]);
      }
    }

    getTasks(wsActive)

    async function getTasks(workspace) {
      if (workspace) {
        const q = query(collection(db, "tasks"), where("email", "==", userEmail), where("workspace", "==", workspace));
        const querySnapshot = await getDocs(q);
        let tasks = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().title !== "1234567898765432123456789") {
            tasks.push({
              id: doc.id,
              ...doc.data()
            });
          }
        })
        setTasks(tasks)
      }
    }

  }, [userEmail, wsActive, ws.length, count]);



  const handleOpen = (event) => {
    document.getElementById("detail").style.display = "flex";

    tasks.map((item) => {
      if (event.target.id === item.title || event.target.id === "titleSpan") {
        document.getElementById("titleDetail").value = item.title;

        if (item.description) {
          document.getElementById("descDetail").value = item.description;
        } else {
          document.getElementById("descDetail").value = "Description";
        }

        if (item.link != "") {
          document.getElementById("linkDetail").value = item.link;
        }
        setTaskOpen(item.id)
      }
    })
  }

  const handleOpenWs = () => {
    document.getElementById("addWs").style.display = "flex";
  }

  const handleClose = () => {
    document.getElementById("detail").style.display = "none";
    document.getElementById("linkDetail").value = "";
  }

  const handleCloseWs = () => {
    document.getElementById("addWs").style.display = "none";
    document.getElementById("inputWs").value = "";
  }


  const handleChangeWSActive = (event) => {
    setWorkspaceActive(event.target.id)
    document.getElementById("detail").style.display = "none";
    document.getElementById(event.target.id).setAttribute("active", "true")

    function myFunction(x) {
      if (x.matches) {
        document.getElementById("sidebar").style.display = "none";
        document.getElementById("right").style.display = "flex";
      }
    }

    var x = window.matchMedia("(max-width: 468px)");
    myFunction(x)
  }

  async function handleCompletedTask(event) {
    event.stopPropagation();

    const Ref = doc(db, "tasks", event.target.id)
    const docSnap = await getDoc(Ref);

    if (docSnap.exists()) {
      if (docSnap.data().completed === "true") {
        await updateDoc(Ref, {
          completed: "false",
        })
      } else {
        await updateDoc(Ref, {
          completed: "true",
        })
      }
    }

    setCount(count + 1);
  }


  async function handleNewTask(event) {
    event.preventDefault();
    const title = document.getElementById("newTask").value;

    const docRef = await addDoc(collection(db, "tasks"), {
      title: title,
      workspace: wsActive,
      email: userEmail,
      completed: "false",
      link: "",
      description: "",
    });
    document.getElementById("newTask").value = ""
    setCount(count + 1);
  }

  async function handleDeleteTask(event) {
    event.stopPropagation();
    await deleteDoc(doc(db, "tasks", event.target.id))
    setCount(count + 1);
  }


  async function handleNewWorkspace(event) {
    event.preventDefault();
    const wsName = document.getElementById("inputWs").value

    const docRef = await addDoc(collection(db, "tasks"), {
      title: "1234567898765432123456789",
      workspace: wsName,
      email: userEmail,
    });

    handleCloseWs();
    setCount(count + 1);
    setWorkspaceActive(wsName);
    document.getElementById("inputWs").value = "";
  }

  async function handleDeleteWs(event) {
    event.stopPropagation();
    wsToDelete = event.target.id
    document.getElementById("confirmation").style.display = "flex";

  }

  const handleNo = () => {
    document.getElementById("confirmation").style.display = "none";
  }


  async function handleDeleteWsConfirmation() {
    const q = query(collection(db, "tasks"), where("email", "==", userEmail), where("workspace", "==", wsToDelete));
    const querySnapshot = await getDocs(q);
    let ids = [];
    querySnapshot.forEach((doc) => {
      ids.push(doc.id);
    })
    for (const id of ids) {
      await deleteDoc(doc(db, "tasks", id))
    }
    document.getElementById("confirmation").style.display = "none";
    setCount(count + 1);

  }

  async function handleSave() {
    const ref = doc(db, "tasks", taskOpen);
    await updateDoc(ref, {
      title: document.getElementById("titleDetail").value,
      description: document.getElementById("descDetail").value,
      link: document.getElementById("linkDetail").value,
    });
    setCount(count + 1);
    document.getElementById("detail").style.display = "none";
  }

  const handleLink = (event) => {
    event.stopPropagation();
    tasks.map((item) => {
      if (item.id === event.target.id) {
        window.open("http://" + item.link, '_blank').focus();
      }
    })

  }



  return (
    <Container>
      <Wrapper>
        <SideBar id="sidebar">
          <Title>WORKSPACE</Title>
          {ws &&
            ws.map((item) => (
              <Workspace active={(item === wsActive) ? "true" : "false"} id={item} onClick={handleChangeWSActive} >
                {item}
                <img src="/images/close.png" id={item} onClick={handleDeleteWs} />
              </Workspace>
            ))
          }

          <AddWorkspace onClick={handleOpenWs}>
            <AddCircleIcon style={{ marginBottom: "10px", opacity: "0.35", fontSize: "30px" }} />
          </AddWorkspace>

          <AddNew id="addWs">
            <AddNewWrapper>
              <input id="inputWs" placeholder="Workspace" onSubmit={handleNewWorkspace}></input>
              <button onClick={handleNewWorkspace}>+</button>
              <img src="/images/close.png" onClick={handleCloseWs} />
            </AddNewWrapper>
          </AddNew>
        </SideBar>


        <Right id="right">
          <TitleWS>{wsActive}</TitleWS>
          <ToDo>
            <CheckMark />
            <ToDoInput>
              <ToDoForm onSubmit={handleNewTask}>
                <input placeholder="Create a new task..." id="newTask" />
              </ToDoForm>
            </ToDoInput>
          </ToDo>

          {tasks &&
            tasks.map((item) => (
              < ToDoItemsWrapper id="todo" id={item.title} onClick={handleOpen} >
                <ToDoItem id={item.title}>
                  <CheckMarkItem id={item.id} onClick={handleCompletedTask} active={item.completed} />
                  <TextWrapper id={item.title} active={item.completed}>
                    {item.title}
                  </TextWrapper>
                  <IconsWrapper>
                    <IconLink active={(item.link === "") ? "false" : "true"}>
                      <img src="/images/link.png" id={item.id} alt="" onClick={handleLink} />
                    </IconLink>
                    <img src="/images/close.png" id={item.id} alt="" onClick={handleDeleteTask} />
                  </IconsWrapper>
                </ToDoItem>
              </ToDoItemsWrapper>
            ))
          }
          <ConfirmationWindow id="confirmation">
            <h1>Are you sure?</h1>
            <Buttons>
              <ButtonYes onClick={handleDeleteWsConfirmation}>Yes</ButtonYes>
              <ButtonNo onClick={handleNo}>No</ButtonNo>
            </Buttons>
          </ConfirmationWindow>

          <ToDoDetail id="detail">
            <ToDoDetailWrapper>
              <CloseButton onClick={handleClose}>
                <img src="/images/close.png" />
              </CloseButton>
              <Forms>
                <Detail>
                  <h1>Title: </h1>
                  <input id="titleDetail" placeholder="" />
                </Detail>
                <Detail>
                  <h1>Description: </h1>
                  <textarea id="descDetail" placeholder="Description" />
                </Detail>
                <Detail>
                  <h1>Link: </h1>
                  <input id="linkDetail" placeholder="raidr.dev" />
                </Detail>

                <SaveButton>
                  <button type="submit" onClick={handleSave}>SAVE</button>
                </SaveButton>
              </Forms>
            </ToDoDetailWrapper>
          </ToDoDetail>
        </Right>
      </Wrapper>
    </Container >
  )
}


const ConfirmationWindow = styled.div`
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 3;
  margin-right: 20%;
  width: 300px;
  height: 150px;
  margin-top: 100px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;


  h1{
    margin-top: -10px;
    font-size: 20px;
  }
`

const Buttons = styled.div`
  display: flex;
  margin-top: 50px;
  
`

const ButtonYes = styled.button`
  margin-right: 10px;
  border: none;
  height: 35px;
  width: 35px;
  cursor: pointer;
  background-color: #3A71D1;
  border-radius: 50px;

`

const ButtonNo = styled(ButtonYes)`
    background-color: #db1e0d;
`

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
    width: 100vw;
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

    @media screen and (max-width: 468px) {
      opacity: 0.35;
    }
  }
`



const AddWorkspace = styled.div`
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



const AddNew = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 300px;
  position: absolute;
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 50px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  flex-direction: column;

`

const AddNewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  input {
    height: 30px;
    border: 1px solid white;
    outline: none;
    border-radius: 10px;
    width: 90%;
    padding: 2px 20px;
    margin-left: 10px;
  }

  button {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    width: 40px;
    margin-left: 7px;
    border-radius: 45%;
    background-color: #4477cf;
    font-size: 20px;
    border: none;
    transition: all 350ms ease-in-out;

  }

  img {
    height: 20px;
    width: 20px;
    cursor: pointer;
    padding: 10px;
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
  width: 20px;
  border-color: ${props => props.active === "true" && "linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)"};
  background: ${props => props.active === "true" && "linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)"};

  &:hover{
    border-color: linear-gradient(135deg, #55DDFF 0%, #C058F3 100%);
    background: linear-gradient(135deg, #55DDFF 0%, #C058F3 100%); 
  }

  @media screen and (max-width: 468px){
    height: 20px;
    width: 20px;
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

const TextWrapper = styled.span`
  width: 85%;
  background-color: #25273C;
  display: flex;
  align-items: center;
  text-decoration: ${props => props.active === "true" ? "line-through" : "none"};
  opacity: ${props => props.active === "true" ? "0.5" : "1"};
  margin-left: 10px;

  @media screen and (max-width: 468px){
    font-size: 14px;
  }
`


const IconsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 100px;
  border-radius: 50%;
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

  @media screen and (max-width: 468px){
    margin-left: 0px;
  }
  
`

const IconLink = styled.div`
  display: ${props => props.active === "true" ? "flex" : "none"};;
  background-color: #25273C;
`


const ToDoDetail = styled.div`
  position: absolute;
  width: 50%;
  height: 65%;
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
