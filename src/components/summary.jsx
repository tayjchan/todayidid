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
  display: inline;
`;

const PreviouslyTasks = styled.ul`
  max-height: 200px;
  overflow: auto;
  display: block;
`;

const Summary = ({ clearCurrentTasks }) => {
  const [savedTasks, setSavedTasks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState();

  const filterCurrentTasks = (tag) => {
    setFilter(tag);
  };

  const clearCurrentFilter = () => {
    setFilter(null);
  };

  const displayTasks = (savedTasks) => {
    let filteredTasks = [...savedTasks];
    if (filter) {
      filteredTasks = savedTasks.filter((savedTask) => {
        if (!savedTask.tags) {
          return false;
        } else {
          return savedTask.tags.includes(filter);
        }
      });
    }

    return filteredTasks.map((task) => {
      return (
        <li key={task.id}>
          <b>{`${task.time}: `}</b>
          {task.tags &&
            task.tags.map((tag, index) => (
              <Tag
                key={`previously_${tag}_${index}`}
                text={tag}
                color='lightpink'
                onClick={() => filterCurrentTasks(tag)}
              />
            ))}
          {task.description}
        </li>
      );
    });
  };

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
      {filter && (
        <div>
          <span>Filter: </span>
          <Tag text={filter} color='lightpink' onClick={clearCurrentFilter} />
        </div>
      )}
      <PreviouslyTasks>{displayTasks(savedTasks)}</PreviouslyTasks>
      {loader && <Loader />}
    </Container>
  );
};

export default Summary;
