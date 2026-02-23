import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';
import './TaskManager.css';

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);        // ALWAYS array
    const [copyTasks, setCopyTasks] = useState([]); // ALWAYS array
    const [updateTask, setUpdateTask] = useState(null);

    useEffect(() => {
        fetchAllTasks();
    }, []);

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask]);

    // ✅ FETCH TASKS (MAIN FIX)
    const fetchAllTasks = async () => {
        try {
            const response = await GetAllTasks();

            // IMPORTANT: backend sends { success, message, data }
            const taskArray = response?.data?.data || [];

            setTasks(taskArray);
            setCopyTasks(taskArray);
        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
            setTasks([]);
            setCopyTasks([]);
        }
    };

    const handleTask = () => {
        if (!input) return;

        if (updateTask) {
            handleUpdateItem({
                _id: updateTask._id,
                taskName: input,
                isDone: updateTask.isDone
            });
        } else {
            handleAddTask();
        }
        setInput('');
        setUpdateTask(null);
    };

    const handleAddTask = async () => {
        try {
            const obj = { taskName: input, isDone: false };
            const { data } = await CreateTask(obj);

            data?.success
                ? notify(data.message, 'success')
                : notify(data.message, 'error');

            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const { data } = await DeleteTaskById(id);

            data?.success
                ? notify(data.message, 'success')
                : notify(data.message, 'error');

            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to delete task', 'error');
        }
    };

    const handleCheckAndUncheck = async (item) => {
        try {
            const obj = {
                taskName: item.taskName,
                isDone: !item.isDone
            };

            const { data } = await UpdateTaskById(item._id, obj);

            data?.success
                ? notify(data.message, 'success')
                : notify(data.message, 'error');

            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    const handleUpdateItem = async (item) => {
        try {
            const obj = {
                taskName: item.taskName,
                isDone: item.isDone
            };

            const { data } = await UpdateTaskById(item._id, obj);

            data?.success
                ? notify(data.message, 'success')
                : notify(data.message, 'error');

            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const results = copyTasks.filter((item) =>
            item.taskName.toLowerCase().includes(term)
        );
        setTasks(results);
    };

    return (
        <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
            <h1 className="mb-4">Task Manager App</h1>

            <div className="d-flex mb-4 w-100">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="form-control me-2"
                    placeholder="Add a new task"
                />
                <button onClick={handleTask} className="btn btn-success">
                    <FaPlus />
                </button>
            </div>

            <div className="input-group mb-3 w-100">
                <span className="input-group-text"><FaSearch /></span>
                <input
                    onChange={handleSearch}
                    className="form-control"
                    placeholder="Search tasks"
                />
            </div>

            <div className="w-100">
                {Array.isArray(tasks) && tasks.map((item) => (
                    <div
                        key={item._id}
                        className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
                    >
                        <span className={item.isDone ? 'text-decoration-line-through' : ''}>
                            {item.taskName}
                        </span>

                        <div>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => handleCheckAndUncheck(item)}
                            >
                                <FaCheck />
                            </button>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => setUpdateTask(item)}
                            >
                                <FaPencilAlt />
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteTask(item._id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default TaskManager;