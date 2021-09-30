import AgregarTecnico from "./components/AgregarTecnico";
import Boton from "./components/Boton";
import Tecnico from "./components/Tecnico";
import Tecnicos from "./components/Tecnicos";
import Header from "./components/Header";
import {useState, useEffect} from 'react';
import React from 'react';

function App() {
  const [showAddTecnico, setShowAddTecnico] = useState (false);

  const [tecnicos, setTecnicos] = useState([])

  useEffect(() => {
    const getTecnicos = async () => {
      const tecnicosDelServidor = await fetchTecnicos();
      setTecnicos(tecnicosDelServidor);
    }

    getTecnicos();
  }, [])

  //FETCH TECNICOS
  const fetchTecnicos= async () => {
    const res = await fetch('http://localhost:5000/tecnicos');
    const data = await res.json();

    return data;
  }

   //FETCH TECNICO
   const fetchTecnico = async (id) => {
    const res = await fetch(`http://localhost:5000/tecnicos/${id}`)
    const data = await res.json();

    return data;
  }

  //AGREGAR TECNICO
  const agregarTecnico = async (tecnico) => {
    const res = await fetch('http://localhost:5000/tecnicos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(tecnico)
    })

    const data = await res.json()
    setTecnicos([...tecnicos, data])

  }

  //ELIMINAR TECNICO
  const eliminarTecnico = async (id) => {
    await fetch(`http://localhost:5000/tecnicos/${id}`, {
      method: 'DELETE',
    })

    setTecnicos(tecnicos.filter((tecnico) => tecnico.id !== id  ))
  }

  //TOGGLE RECORDATORIO
  const toggleRecordatorio = async(id) => {
    const tecnicoParaToggle = await fetchTecnico(id);
    const updTecnico = {...tecnicoParaToggle, 
    reminder: !tecnicoParaToggle.reminder}

    const res = await fetch(`http://localhost:5000/tecnicos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTecnico)
    })

    const data = await res.json()


    setTecnicos(tecnicos.map((tecnico) => tecnico.id === id ? { ...tecnico, reminder: data.reminder } : tecnico)) //cambia el estado del reminder
  }
 

  return (
     <div className="container">
        <Header onAdd={() => setShowAddTecnico(!showAddTecnico)} showAdd= {showAddTecnico} />
          {showAddTecnico && <AgregarTecnico onAdd={agregarTecnico} />}
        {tecnicos.length > 0 ? <Tecnicos tecnicos={tecnicos} onDelete =  {eliminarTecnico} onToggle={toggleRecordatorio} /> : 'No Tecnicos to show'}

        <footer />
     </div>
     //si hay tecnicos > 0, las muestra, sino muestra cartel
  );
}


export default App;
