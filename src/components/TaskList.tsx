import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchTasks } from '../store/actions';
import { RootState } from '../store/types';

const mapState = (state: RootState) => ({
  tasks: state.tasks,
});

const mapDispatch = {
  fetchTasks,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TaskList: React.FC<PropsFromRedux> = ({ tasks, fetchTasks }) => {
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

	console.log('aqui', tasks);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title} {task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default connector(TaskList);