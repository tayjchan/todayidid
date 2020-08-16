import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllTasks } from "../services/Firestore";

const Container = styled.div`
  border-bottom: 0.5px solid black;
  text-align: left;
  margin: 16px;
  padding: 0 8px;
  box-sizing: border-box;
`;

const Previously = styled.h2`
  margin-top: 0;
  font-size: 16px;
  font-weight: 500;
`;

const Summary = () => {
  const [savedTasks, setSavedTasks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const tasks = await getAllTasks();
      setSavedTasks(tasks);
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
    </Container>
  );
};

export default Summary;
