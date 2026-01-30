import React, { useState } from 'react';

const Tareas = () => {

    const [tasks, setTasks] = useState("");
    const [houseWork, setHouseWork] = useState([])
    const [itemsNumber, setItemsNumber] = useState(0)

    const addHouseWork = (e) => {
        if (tasks !== '' & e.keyCode == 13) {
            const newHouseWork = [...houseWork, tasks]
            setTasks('');
            setHouseWork(newHouseWork)
            setItemsNumber(newHouseWork.length)
            
        }
    };

    const removeHouseWork = (tareaABorrar) => {
        const newHouseWork = houseWork.filter((_, index) => index !== tareaABorrar)
        setHouseWork(newHouseWork)
        setItemsNumber(newHouseWork.length)
    }

    return (
        <>
            <div className='container mt-5' style={{ maxWidth: "500px" }} >
                <h1 className='text-center display-1 fw-light opacity-25'>Lista</h1>
                <div className="card rounded-0 border-0 todo-container">
                    <div className='border-bottom px-4 py-3'>
                        <input className="form-control border-0 p-0 shadow-none fs-5" onKeyDown={addHouseWork} type="text" value={tasks} onChange={e => setTasks(e.target.value)} placeholder={houseWork.length === 0 ? "No hay tareas, añadir tareas" : "Que falta por hacer?"}></input>
                    </div>
                    <ul className="list-group list-group-flush rounded-0">
                        {houseWork.map((tarea, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-4 py-3 fs-5 task-input">{tarea}
                                <button onClick={() => removeHouseWork(index)} type="button" className="btn delete-button">X</button>
                            </li>
                        ))}
                    </ul>
                    <div className="card-footer bg-white text-muted small px-3 py-2 border-top">
                        {itemsNumber} items left
                    </div>
                    {/*<div className="d-flex justify-content-center"><button onClick={addHouseWork}>Agregar Tarea</button></div> antiguo boton para agregar tareas */}
                </div>
            </div>
        </>
    )
}

export default Tareas