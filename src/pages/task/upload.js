import { Fragment, useState } from "react";
import axios from "axios";


"use client"
function Createtask() {
    const [file, setFile] = useState(null);
    return (
        <Fragment>
            <h1>Hola aqui tienes que subir un archivo</h1>
            <form onSubmit={async (e) => {
                e.preventDefault()

                if (!file) return

                console.log("subiendo archivo")
                console.log(file)

                //aqui se envia el archivo al backend 

                const form = new FormData()
                form.set('file', file);
                const result = await axios.post(
                    "http://localhost:4000/api/taks/uploadfile",
                    form,
                    {
                        withCredentials: true,
                    }
                );
                console.log(result);
            }}>
                <label>
                    Subir archivo
                </label>
                <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                <button>Subir</button>
            </form>
        </Fragment>
    )
}
export default Createtask;
