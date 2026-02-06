import React, { useEffect, useState } from 'react';

const Tareas = () => {

    const [tasks, setTasks] = useState("");
    const [houseWork, setHouseWork] = useState([])

   const obtenerTareas = async () => {
    try {
        const response = await fetch ("https://playground.4geeks.com/todo/users/Rodolfo")
        const data = await response.json()
        setHouseWork(data.todos)
    } catch (error) {
        console.log(error)
    }
   }

   const addTask = async (e) => {
    if (tasks !== '' & e.keyCode == 13) {
    try {
        const response = await fetch ("https://playground.4geeks.com/todo/todos/Rodolfo", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
             "label": tasks,
            "is_done": false
            })
        });

        if(response.ok) {
            const newTask = await response.json()
            setHouseWork([...houseWork, newTask])
            setTasks("")
        }
        
    } catch (error) {
        console.log(error)
    }
   }
   }

   const removeTask = async (todoId) => {

    try {
        const response = await fetch (`https://playground.4geeks.com/todo/todos/${todoId}`, {
            method: "DELETE",
        });

        if(response.ok) {
            const newHouseWork = houseWork.filter((item) => item.id !== todoId)
            setHouseWork(newHouseWork)
        }
        
    } catch (error) {
        console.log(error)
    }
   }
   
   const ClearAllHouseWork = async () => {
    try {
        const response = await fetch("https://playground.4geeks.com/todo/users/Rodolfo", {
            method: "DELETE"
        });
        if(response.ok)
            await fetch ("https://playground.4geeks.com/todo/users/Rodolfo", {
            method: "POST"
        });
            setHouseWork([])
    } catch (error) {
        console.log(error)
    }
   }


    useEffect(() => {
     obtenerTareas ()
    }, [])

    return (
        <>
            <div className='container mt-5' style={{ maxWidth: "500px" }} >
                <h1 className='text-center display-1 fw-light opacity-25'>Lista</h1>
                <div className="card rounded-0 border-0 todo-container">
                    <div className='border-bottom px-4 py-3'>
                        <input className="form-control border-0 p-0 shadow-none fs-5" onKeyDown={addTask} type="text" value={tasks} onChange={e => setTasks(e.target.value)} placeholder={houseWork.length === 0 ? "No hay tareas, añadir tareas" : "Que falta por hacer?"}></input>
                    </div>
                    <ul className="list-group list-group-flush rounded-0">
                        {houseWork.map((tarea) => (
                            <li key={tarea.id} className="list-group-item d-flex justify-content-between align-items-center px-4 py-3 fs-5 task-input">{tarea.label}
                                <button onClick={() => removeTask(tarea.id)} type="button" className="btn delete-button">X</button>
                            </li>
                        ))}
                    </ul>
                    <div className="card-footer bg-white text-muted small px-3 py-2 border-top">
                        {houseWork.length} items left
                    </div>
                    <div className="d-flex justify-content-center"><button onClick={ClearAllHouseWork}>Elimar todas las tareas</button></div> 
                </div>
            </div>
        </>
    )
}

export default Tareas