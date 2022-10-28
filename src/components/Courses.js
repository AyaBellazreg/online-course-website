import React, { useState, useEffect } from "react";
import MenuBar from "./MenuBar";
import { ListGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "../css/courses.css";

function Courses() {
  const [filesListSEM1, setFilesListSEM1] = useState([]);
  const [filesListSEM2, setFilesListSEM2] = useState([]);

  const storageRef = firebase.storage().ref();

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
                { url: url, name: item.name },
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
                { url: url, name: item.name },
              ]);
            })
            .catch(function (error) {
              // Handle any errors
            });
        });
      })
      .catch(function (error) {});
  };
  //COURSES LIST
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
      </ListGroup.Item>
    );
  });

  return (
    <div className="courses">
      <MenuBar />

      <Container>
        <div className="courses-box">
          <h2>Courses</h2>
          <h5>Semester 1</h5>
          <ListGroup className="mb-3">{sem1Courses}</ListGroup>

          <ListGroup className="mb-3">
            <h5>Semester 2</h5>
            {sem2Courses}
          </ListGroup>
        </div>
      </Container>
    </div>
  );
}

export default Courses;
