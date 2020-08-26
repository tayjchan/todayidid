import React, { useEffect, useState } from "react";
import { Container } from "./container";
import styled from "styled-components";
import { getAllTasks } from "../services/Firestore";
import Loader from "./loader";
import Tag from "./tag";
import Delete from "./delete";

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
  const [filters, setFilters] = useState({});

  const filterCurrentTasks = (tag) => {
    const updatedFilters = { ...filters, [tag]: !filters[tag] };
    setFilters(updatedFilters);
  };

  const displayTasks = (savedTasks) => {
    let filteredTasks = [...savedTasks];

    const enabledTags = Object.keys(filters).filter((x) => filters[x]);
    if (enabledTags.length > 0) {
      filteredTasks = savedTasks.filter((savedTask) => {
        if (!savedTask.tags) {
          return false;
        } else {
          const enabledTags = Object.keys(filters).filter((x) => filters[x]);
          return savedTask.tags.some((tag) => enabledTags.includes(tag));
        }
      });
    }

    return filteredTasks.map((task) => {
      return (
        <li key={task.id}>
          <b>{`${task.time}: `}</b>
          <Delete taskId={task.id} />
          {task.tags &&
            task.tags.map((tag, index) => (
              <Tag
                key={`previously_${tag}_${index}`}
                text={tag}
                onClick={() => filterCurrentTasks(tag)}
                active={enabledTags.length !== 0}
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

      // Only show tasks from the past month
      let today = new Date();
      today.setMonth(today.getMonth() - 1);
      const index = sorted.findIndex((value) => new Date(value.time) < today);
      if (index !== -1) {
        sorted = sorted.slice(0, index);
      }

      const availableTags = {};
      sorted.forEach((task) => {
        if (task.tags) {
          task.tags.forEach((taskTag) => {
            availableTags[taskTag] = false;
          });
        }
      });

      setSavedTasks(sorted);
      setFilters(availableTags);
      clearCurrentTasks();
      setLoader(false);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Previously>Previously</Previously>
      <div>
        <span>Filters: </span>
        {Object.keys(filters).map((filter, index) => (
          <Tag
            key={`filters_${filter}_${index}`}
            text={filter}
            active={filters[filter]}
            onClick={() => filterCurrentTasks(filter)}
          />
        ))}
      </div>
      <PreviouslyTasks>{displayTasks(savedTasks)}</PreviouslyTasks>
      {loader && <Loader />}
    </Container>
  );
};

export default Summary;
