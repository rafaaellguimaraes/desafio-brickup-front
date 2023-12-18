/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { fetchTasks } from '../store/actions';
import { RootState, Task } from '../store/types';
import AlertTasksModal from './AlertTasksModal';
import CreateTaskModal from './CreateTaskModal';
import EditTaskModal from './EditTaskModal';

const mapState = (state: RootState) => ({
  tasks: state.tasks,
});

const mapDispatch = {
  fetchTasks,
	deleteTask: (id: number) => ({ type: 'DELETE_TASK', payload: id }),
	completedTask: (id: number) => ({type: 'COMPLETED_TASK', payload: id})
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TaskList = ({ tasks, fetchTasks, deleteTask, completedTask }: PropsFromRedux) => {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [taskToDelete, setTaskToDelete] = useState<Task>({} as Task);
	const [taskToEdit, setTaskToEdit] = useState<Task>({} as Task);
	const [showFullScreenImage, setShowFullScreenImage] = useState<boolean>(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState<string | null>(null);

	const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [taskToComplete, setTaskToComplete] = useState<number | null>(null);


	const showConfirmationModalHandler = (taskId: number) => {
    setTaskToComplete(taskId);
    setShowConfirmationModal(true);
  };

  const handleCompleteTask = () => {
    if (taskToComplete !== null) {
      completedTask(taskToComplete);
      setTaskToComplete(null);
      setShowConfirmationModal(false);
    }
  };

  const closeConfirmationModal = () => {
    setTaskToComplete(null);
    setShowConfirmationModal(false);
  };


	const showDeleteModalHandler = (task: any) => {
		setTaskToDelete(task);
		setShowDeleteModal(true);
	};

	const handleDeleteTask = () => {
		if (taskToDelete.id) {
			deleteTask(taskToDelete.id);
			setShowDeleteModal(false);
		}
	};

	const handleShowAddModal = () => {
		setShowAddModal(true);
	};

	const handleHideAddModal = () => {
		setShowAddModal(false);
		fetchTasks();
	};

	const handleShowEditModal = (task: Task) => {
		setTaskToEdit(task);
		setShowEditModal(true);
	};

	const handleHideEditModal = () => {
		setShowEditModal(false);
	};

	const handleFullScreenImage = (imageUrl: string | null) => {
    setFullScreenImageUrl(imageUrl);
    setShowFullScreenImage(true);
  };

  const closeFullScreenImage = () => {
    setShowFullScreenImage(false);
    setFullScreenImageUrl(null);
  };


  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
		<div className='flex items-center justify-center h-screen'>
		<div className="bg-white rounded shadow-md overflow-hidden w-full lg:w-3/4 xl:w-1/2 p-4">
			<div className="p-0 text-center">
				<h5 className="font-bold text-lg p-3 text-gray-700">Lista de tarefas</h5>
				<div className="overflow-x-auto p-5">
					<table className='table-auto w-full text-gray-500'>
						<thead className='text-xs text-gray-600 bg-gray-100'>
							<tr>
								<th scope='col'>Título</th>
								<th scope='col'>Descrição</th>
								<th scope='col'>Imagem</th>
								<th scope='col'>Status</th>
								<th scope='col'>Ação</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => (
								<tr key={task.id} className='border-b'>
									<td>{task.title}</td>
									<td>{task.description}</td>
									<td className='flex items-center justify-center'>
										{task.image === null ? ('Sem imagem') : (
										<div className="relative">
											<img 
												src={task.image} 
												alt={task.title} 
												className='w-6 h-6 object-cover rounded-full cursor-pointer'
        								onClick={() => handleFullScreenImage(task.image)} 
											/>
											<button
        								onClick={() => handleFullScreenImage(task.image)}
        								className='absolute top-0 right-0 bg-white text-gray-700 p-1 rounded-full'
      								>
      								</button>
										</div>
										)}
									</td>
									<td>{task.completed === false ? 'Pendente' : 'Concluída'}</td>
									<td className='flex items-center justify-center space-x-2'>
										<button 
											disabled={task.completed === true}
											className={`${
												task.completed ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-indigo-500 text-white'
											} p-1 rounded`}
											onClick={() => task.id !== undefined && showConfirmationModalHandler(task.id)}
										>
											<svg 
												xmlns="http://www.w3.org/2000/svg" 
												fill="none" 
												width="20"
												viewBox="0 0 24 24" 
												strokeWidth="1.5" 
												stroke="currentColor" 
												>
  												<path 
														strokeLinecap="round" 
														strokeLinejoin="round" 
														d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
													/>
												</svg>
											</button>
										<button 
											disabled={task.completed === true}
											className={`${
												task.completed ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-indigo-500 text-white'
											} p-1 rounded`} 
											onClick={() => handleShowEditModal(task)}
										>
											<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      	stroke="currentColor"
                      >
                      	<path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
										</button>
										<button className='bg-red-500 text-white p-1 rounded' onClick={() => showDeleteModalHandler(task)}>
											<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                      	<path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<button className='mt-3 bg-blue-500 text-white p-2 rounded' onClick={handleShowAddModal}>+ Nova Tarefa</button>
			</div>
		</div>
		<AlertTasksModal
			show={showDeleteModal}
			onHide={() => setShowDeleteModal(false)}
			title='Excluir Tarefa'
			content='Tem certeza que deseja excluir esta tarefa?'
			onConfirm={handleDeleteTask}
		/>
		<AlertTasksModal
        show={showConfirmationModal}
        onHide={closeConfirmationModal}
        title='Concluir Tarefa'
        content='Tem certeza que deseja concluir esta tarefa?'
        onConfirm={handleCompleteTask}
      />
		<CreateTaskModal 
			show={showAddModal} onHide={handleHideAddModal}
		/>
		<EditTaskModal 
			show={showEditModal} onHide={handleHideEditModal} existingTask={taskToEdit}
		/>
		{showFullScreenImage && fullScreenImageUrl && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center'
          onClick={closeFullScreenImage}
        >
          <img src={fullScreenImageUrl} alt='Full Screen' className='max-h-full max-w-full' />
        </div>
      )}
	</div>
  );
};

export default connector(TaskList);