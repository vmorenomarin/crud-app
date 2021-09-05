import React, { useState } from "react";
import uuid from "react-uuid";
import Swal from "sweetalert2";

export const Crud = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);

  const addTask = () => {
    const id = uuid();
    const task = { id, title, description };
    setTasks([...tasks, task]); // Los tres puntos permiten la propagación, es decir, mantenert los estados anteriores.
    clear();
  };

  const updateTask = () => {
    const id = localStorage.getItem("id");
    const newTask = { id, title, description };
    const newTasks = tasks.map((item) => (item.id === id ? newTask : item));
    setTasks(newTasks);
    clear();
  };

  const deleteTask = (id) => {
    Swal.fire({
      title: "Aviso de confirmación",
      text: "Una vez haga esto, los cambios no se pueden deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "No borar",
    }).then((result) => {
      const newTask = tasks.filter((task) => task.id !== id);
      setTasks(newTask);
      if (result.isConfirmed) {
        Swal.fire({
          title: "Entrada borrada",
          text: "Su registro ha sido borrado.",
          icon: "success",
          showConfirmButton:false,
          timer: 2000
        });
      }
    });
  };

  const actions = (e) => {
    e.preventDefault();
    edit ? updateTask() : addTask();
    addTask();
  };

  const clear = () => {
    setTitle("");
    setDescription("");
    setEdit(false);
    localStorage.removeItem("id");
  };

  const getData = (id) => {
    const task = tasks.find((item) => item.id === id);
    localStorage.setItem("id", id);
    setTitle(task.title);
    setDescription(task.description);
    setEdit(true);
  };

  return (
    <div className="container">
      <div className="mt-2 justify-content-center d-flex align-items-center">
        <div className="col-8">
          <div className="card">
            <h3 className="card-title text-center">React-ing 1: CRUD App</h3>
            <div className="card-body">
              <form onSubmit={actions}>
                <div className="mb-3">
                  <input
                    type="text"
                    id="title"
                    placeholder="Ingrese campo 1"
                    value={title}
                    required
                    autoFocus
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)} // e es el evento. Puedo usar cualquier otro nombre.
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="description"
                    placeholder="Ingrese Campo 2"
                    value={description}
                    required
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary form-control" type="submit">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul className="list-group list-group-numbered mt-2">
          {tasks.map((task) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={task.id}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{task.title}</div>
                {task.description}
              </div>
              <button className="btn btn-danger me-2">
                <i
                  className="fa fa-trash"
                  onClick={() => deleteTask(task.id)}
                ></i>
              </button>
              <button className="btn btn-warning" onClick={() => getData(task.id)}>
                <i className="fa fa-edit" ></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
