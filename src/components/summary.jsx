import React, { useEffect, useState } from "react";
import { Container } from "./container";
import styled from "styled-components";
import { getAllTasks } from "../services/Firestore";
import Loader from "./loader";

const Previously = styled.h2`
  margin-top: 0;
  font-size: 16px;
  font-weight: 500;
`;

const Summary = ({ clearCurrentTasks }) => {
  const [savedTasks, setSavedTasks] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoader(true);
      let tasks = await getAllTasks();
      const sorted = [...tasks].sort((a, b) =>
        new Date(a.time) < new Date(b.time) ? -1 : 1
      );
      setSavedTasks(sorted);
      clearCurrentTasks();
      setLoader(false);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Previously>Previously</Previously>
      <ul>
        {savedTasks.map((task) => {
          return (
            <li key={task.id}>
              {task.time}: {task.description}
            </li>
          );
        })}
      </ul>
      {loader && <Loader />}
    </Container>
  );
};

export default Summary;
