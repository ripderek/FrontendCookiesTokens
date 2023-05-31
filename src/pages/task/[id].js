//se importa este modulo de react para las rutas
//El useParams es para obtener los parametros por la url
//import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Router from 'next/router' //Rutas para redireccionar a otra pagina
import axios from "axios";


function Createtask() {

    const [task, setTak] = useState({
        idu: "",
        nombreprueba: "",
    });
    const [idtarea, setIdtarea] = useState();

    //Almanecar en un objeto los parametros
    const HandleChange = (e) => {
        setTak({ ...task, [e.target.name]: e.target.value });
        console.log(e.target.name, e.target.value);
    };

    //crear un estado para mostrar cuando la conexion es lerda xd x
    const [loading, setLoading] = useState(false);

    //crear un estado para saber si va a editar o crear

    //crear una funcion que tome los datos de una tarea si se va a editar para mostrarlos en los input

    const loadtask = async () => {


        console.log(Router.query);
        const id = Router.query.id;
        console.log(id);
        setIdtarea(id);
        const result = await axios.get(
            "http://localhost:4000/api/taks/details/" + id
        );
        //const data = await result;
        //setTak({ idu: data.id, nombreprueba: data.nombreprueba });
        console.log(result.data);
        const data = result.data;
        console.log(data);
        setTak({ idu: data.id, nombreprueba: data.nombreprueba });
    };

    const DeleteTask = async () => {
        console.log('eleiminar tarea' + idtarea);
        setLoading(true);

        const result = await axios.delete(
            "http://localhost:4000/api/taks/detele/" + idtarea,
        );
        console.log(result);
        setLoading(false);
        Router.push('/task/tasklist/')
    }
    //Para verificar si el registro se se quiere editar o crear

    useEffect(() => {

        loadtask();

    }, []);


    //Enviar para que guarde la API
    const HandleSUbumit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await axios.put(
            "http://localhost:4000/api/taks/edit/" + idtarea,
            task,
            {
                withCredentials: true,
            }
        );
        console.log(result);
        setLoading(false);
        Router.push('/task/tasklist/')
    };

    //IMPORTANTE
    //LOS NAMES DE LOS INPUT Y DE LOS OBJETOS TIENEN QUE IR CON EL MISMO NOMBRE QUE PIDE LA API EN LOS CONTROLLERS XD
    return (
        <div>
            <h1> Editar Registro xd</h1>
            <form onSubmit={HandleSUbumit}>
                <a className="bg-red-500 cursor-pointer " onClick={() => Router.push('/task/tasklist/')}>
                    Regresar al inicio
                </a>
                <input
                    type="text"
                    placeholder="id"
                    className="border-slate-800 border-solid border-2 mr-3 ml-3 bg-black"
                    onChange={HandleChange}
                    name="idu"
                    id="idu"
                    value={task.idu}
                />
                <input
                    type="text"
                    placeholder="nombre"
                    className="border-slate-800 border-solid border-2 mr-3 ml-3 bg-black"
                    onChange={HandleChange}
                    name="nombreprueba"
                    value={task.nombreprueba}

                />
                <button
                    type="submit"
                    className="bg-slate-500 text-white p-2"
                    disabled={!task.idu || !task.nombreprueba}
                >
                    {loading ? "Cargando.." : "Guardar"}
                </button>
                <a className="bg-red-500"
                    onClick={() => DeleteTask()}>
                    Eliminar
                </a>
            </form>
        </div>
    );
}

export default Createtask;
