import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Jumbotron,
  ListGroup,
  Alert,
  Container,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import MenuBar from "./MenuBar";
import firebase from "firebase/app";
import { log } from "util";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [fileUrl, setFileUrl] = useState([]);
//SEM1
  const [uploadSuccessSEM1, setUploadSuccessSEM1] = useState(false);
  const [uploadErrorSEM1, setUploadErrorSEM1] = useState(false);
  const [DeleteSuccessSEM1, setDeleteSuccessSEM1]= useState(false);
  const [DeleteErrorSEM1, setDeleteErrorSEM1]= useState(false);
//SEM2
  const [uploadSuccessSEM2, setUploadSuccessSEM2] = useState(false);
  const [uploadErrorSEM2, setUploadErrorSEM2] = useState(false);
  const [DeleteSuccessSEM2, setDeleteSuccessSEM2]= useState(false);
  const [DeleteErrorSEM2, setDeleteErrorSEM2]= useState(false);

 /* const [uploadErrorSEM1, setUploadErrorSEM1] = useState(false);
  const [uploadErrorSEM2, setUploadErrorSEM2] = useState(false);*/
  
  const [filesListSEM1, setFilesListSEM1] = useState([]);
  const [filesListSEM2, setFilesListSEM2] = useState([]);
  //Storage ref for firebase
  const storageRef = firebase.storage().ref();

  //Handelling Logout
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  //Updating the file to upload
  const handleOnChange1 = (e) => {
    setFile1(e.target.files[0]);
  };
  //Updating the file to upload
  const handleOnChange2 = (e) => {
    setFile2(e.target.files[0]);
  };

  //Uploading the file in file state
  //SEMESTER 1
  const handleSubmitSEM1 = async (e) => {
    //Checking if the user has already chosen a file
    if (!file1) {
      setUploadErrorSEM1(true);
    } else {
      setUploadErrorSEM1(false);
      const fileRef = storageRef.child("semester1/" + file1.name);

      await fileRef
        .put(file1)
        .then(() => {
          setUploadSuccessSEM1(true);
        })
        .catch((e) => {
          setUploadErrorSEM1(true);
        });
    }
  };
  
  //SEMESTER 2
  const handleSubmitSEM2 = async (e) => {
    //Checking if the user has already chosen a file
    if (!file2) {
      setUploadErrorSEM2(true);
    } else {
      setUploadErrorSEM2(false);
      const fileRef = storageRef.child("semester2/" + file2.name);

      await fileRef
        .put(file2)
        .then(() => {
          setUploadSuccessSEM2(true);
        })
        .catch((e) => {
          setUploadErrorSEM2(true);
        });
    }
  };
  //Fetching files from db to the DOM
  const fetchFiles = async () => {
    var listRefSEM1 = storageRef.child("semester1");
    var listRefSEM2 = storageRef.child("semester2");
    // Find all the prefixes and items
    await listRefSEM1
      .listAll()
      .then(function (res) {
        res.items.forEach((item) => {
          item
            .getDownloadURL()
            .then(function (url) {
              setFilesListSEM1((prevState) => [
                ...prevState,
                { url: url, name: item.name,ref: item.location.path_ },
              ]);
            })
            .catch(function (error) {
              // Handle any errors
            });
        });
      })
      .catch(function (error) {});

    await listRefSEM2
      .listAll()
      .then(function (res) {
        res.items.forEach((item) => {
          item
            .getDownloadURL()
            .then(function (url) {
              setFilesListSEM2((prevState) => [
                ...prevState,
                { url: url, name: item.name, ref: item.location.path_  },
              ]);
            })
            .catch(function (error) {
              // Handle any errors
            });
        });
      })
      .catch(function (error) {});
  };

  //DELETE files SEM1
  const deleteFile1 = (item)=>{
    const fileRef = storageRef.child(item.ref);
    // Delete the file
    fileRef.delete().then(function() {
      setDeleteSuccessSEM1(true);
    
    }).catch(function(error) {
      setDeleteErrorSEM1(true);
    })
 
  }

  //DELETE files SEM2
  const deleteFile2 = (item)=>{
    const fileRef = storageRef.child(item.ref);
    // Delete the file
    fileRef.delete().then(function() {
      setDeleteSuccessSEM2(true);
    
    }).catch(function(error) {
      setDeleteErrorSEM2(true);
    })
    
  }

  //Upload success message SEM1
  const UploadSuccessAlertSEM1 =
    uploadSuccessSEM1 == true ? (
      <Alert variant="success" className="mt-3">
        File has been uploaded successfully! Please refresh.
      </Alert>
    ) : null;

  const UploadErrorAlertSEM1 =
    uploadErrorSEM1 == true ? (
      <Alert variant="danger" className="mt-3">
        Error! Please try again.
      </Alert>
    ) : null;
    //Delete alerts
    const DeleteSuccessAlertSEM1 =
    DeleteSuccessSEM1 == true ? (
      <Alert variant="success" className="mt-3">
        File has been deleted successfully! Please refresh.
      </Alert>
    ) : null;

    const DeleteErrorAlertSEM1 =
      DeleteErrorSEM1 == true ? (
      <Alert variant="danger" className="mt-3">
        Error! Please try again.
      </Alert>
    ) : null;

  //Upload success message SEM2
  const UploadsuccessAlertSEM2 =
    uploadSuccessSEM2 == true ? (
      <Alert variant="success" className="mt-3">
        File has been uploaded successfully! Please refresh.
      </Alert>
    ) : null;

  const UploadErrorAlertSEM2 =
    uploadErrorSEM2 == true ? (
      <Alert variant="danger" className="mt-3">
        Error! Please try again.
      </Alert>
    ) : null;
  //Delete alerts
    const DeleteSuccessAlertSEM2 =
    DeleteSuccessSEM2 == true ? (
      <Alert variant="success" className="mt-3">
        File has been deleted successfully! Please refresh.
      </Alert>
    ) : null;

    const DeleteErrorAlertSEM2 =
      DeleteErrorSEM2 == true ? (
      <Alert variant="danger" className="mt-3">
        Error! Please try again.
      </Alert>
    ) : null;


    useEffect(() => {
      fetchFiles();
    }, []);

  const sem1Courses = filesListSEM1.map((item) => {
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-center">
        <Link
          to={item.url}
          target="_blank"
          onClick={(event) => {
            event.preventDefault();
            window.open(item.url);
          }}
        >
          {item.name}
        </Link>
        <Button variant="danger" onClick={()=>deleteFile1(item)}>Delete</Button>
      </ListGroup.Item>
    );
  });

  const sem2Courses = filesListSEM2.map((item) => {
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-center">
        <Link
          to={item.url}
          target="_blank"
          
          onClick={(event) => {
            event.preventDefault();
            window.open(item.url);
          }}
        >
          {item.name}
        </Link>
        <Button variant="danger" onClick={()=>deleteFile2(item)}>Delete</Button>
      </ListGroup.Item>
    );
  }
  );

  return (
    <>
      <MenuBar />
      <div className="courseList">
        <Container>
          <h1 className="mb-5 mt-5">List of courses</h1>
          <div className="semester">
            <h3 className="text-primary">Semester 1</h3>
            <Jumbotron className="mt-5">
              <h1>Upload Your Files</h1>
              <p>You can upload your files here</p>
              <Form className="mt-3">
                <Form.Group>
                  <Form.Control
                    type="file"
                    onChange={handleOnChange1}
                  ></Form.Control>
                </Form.Group>
              </Form>

              <Button variant="primary" onClick={handleSubmitSEM1}>
                Upload
              </Button>
              {UploadSuccessAlertSEM1}
              {UploadErrorAlertSEM1}
            </Jumbotron>
              {DeleteErrorAlertSEM1}
              {DeleteSuccessAlertSEM1}
            <ListGroup className="mb-3">
              {sem1Courses}
            </ListGroup>
          </div>

          <div className="semester">
            <h3 className="text-primary">Semester 2</h3>
            <Jumbotron className="mt-5">
              <h1>Upload Your Files</h1>
              <p>You can upload your files here</p>
              <Form className="mt-3">
                <Form.Group>
                  <Form.Control
                    type="file"
                    onChange={handleOnChange2}
                  ></Form.Control>
                </Form.Group>
              </Form>

              <Button variant="primary" onClick={handleSubmitSEM2}>
                Upload
              </Button>
              {UploadsuccessAlertSEM2}
              {UploadErrorAlertSEM2}
            </Jumbotron>
              {DeleteErrorAlertSEM2}
              {DeleteSuccessAlertSEM2}
            <ListGroup className="mb-3">
              {sem2Courses}
            </ListGroup>
          </div>
        </Container>
      </div>
    </>
  );
}
