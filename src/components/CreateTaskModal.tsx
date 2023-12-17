import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/actions';

Modal.setAppElement('#__next');

interface AddTaskModalProps {
	show: boolean;
	onHide: () => void;
}

const CreateTaskModal = ({show, onHide}: AddTaskModalProps) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [completed, setcompleted] = useState<boolean>(false);
	const [image, setImage] = useState<File | null>(null);

	const handleImageChange = (event: any) => {
		const file = event.target.files[0];

		if (file) {
			setImage(file);
		}
	}

	const handleAddTask = () => {		
		const imageURL = image ? URL.createObjectURL(image) : null;

		dispatch(addTask(
			{
				title, 
				description, 
				completed, 
				image: imageURL
			}
		));
		setTitle('');
		setDescription('');
		setcompleted(false);
		setImage(null);
		onHide();
	};

	return (
		<Modal
			isOpen={show}
			onRequestClose={onHide}
			overlayClassName='modal-overlay'
			contentLabel='Add Task Modal'
		>
			<div
      	className={`fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 ${show ? "flex" : "hidden"}`}
    	>
				<div className="bg-white rounded-lg shadow-md px-4 py-6">
  				<h2 className="text-2xl font-bold mb-4">Adicionar tarefa</h2>
  				<form className="space-y-4">
    				<label className="block">
      				Título:
      				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full border p-2" />
    				</label>
    				<label className="block">
      				Descrição:
      				<input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full border p-2" />
    				</label>
    				<label className="block">
      				Status:
      				<select name="" id="" value={completed ? 'Concluído' : 'Pendente'} onChange={(e) => setcompleted(e.target.value === 'Concluído')} className="block w-full border p-2">
        				<option value="Pendente">Pendente</option>
        				<option value="Concluído">Concluído</option>
      				</select>
    				</label>
    				<label className="block">
      				Imagem:
      				<input type="file" onChange={handleImageChange} className="block w-full border p-2" />
    				</label>
    				<button type='button' onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded">Adicionar</button>
  				</form>
				</div>
			</div>
		</Modal>
	)
};

export default CreateTaskModal;