import React, { useEffect, useState } from "react";
import { Container } from "./container";
import styled from "styled-components";
import { getAllTasks } from "../services/Firestore";
import Loader from "./loader";
import Tag from "./tag";

const Previously = styled.h2`
  margin-top: 0;
  font-size: 16px;
  font-weight: 500;
`;

const PreviouslyTasks = styled.ul`
  max-height: 200px;
  overflow: auto;
`;

const Summary = ({ clearCurrentTasks }) => {
  const [savedTasks, setSavedTasks] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoader(true);
      let tasks = await getAllTasks();
      let sorted = [...tasks].sort((a, b) =>
        new Date(a.time) > new Date(b.time) ? -1 : 1
      );
      let today = new Date();
      today.setMonth(today.getMonth() - 1);

      const index = sorted.findIndex((value) => new Date(value.time) < today);
      if (index !== -1) {
        sorted = sorted.slice(0, index);
      }

      setSavedTasks(sorted);
      clearCurrentTasks();
      setLoader(false);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Previously>Previously</Previously>
      <PreviouslyTasks>
        {savedTasks.map((task) => {
          return (
            <li key={task.id}>
              <b>{`${task.time}: `}</b>
              {task.tags &&
                task.tags.map((tag, index) => (
                  <Tag
                    key={`previously_${tag}_${index}`}
                    text={tag}
                    color='lightpink'
                  />
                ))}
              {task.description}
            </li>
          );
        })}
      </PreviouslyTasks>
      {loader && <Loader />}
    </Container>
  );
};

export default Summary;
