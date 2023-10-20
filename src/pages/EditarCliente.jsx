import {modificarCliente, obtenerCliente} from "../data/clientes.js";
import {Form, redirect, useActionData, useLoaderData, useNavigate} from "react-router-dom";
import Error from "../components/Error.jsx";
import Formulario from "../components/Formulario.jsx";

export async function loader ({params}){
    const cliente=await obtenerCliente(params.clienteId)
    if(Object.values(cliente).length===0){
        throw new Response('',{
            status:404,
            statusText:'No hay resultados'
        })
    }
    return  cliente
}

export async function action({request,params}){
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')
    // eslint-disable-next-line no-control-regex
    const regexEmail = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");
    //Validación
    const errores = []
    //Campos vacios
    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios')
    }
    //Email
    if (!regexEmail.test(email)) {
        errores.push('El email no es válido')
    }

    if (Object.keys(errores).length) {
        return errores
    }

    await modificarCliente(params.clienteId,datos)

    return redirect('/');
}
const EditarCliente = () => {
    const cliente=useLoaderData()
    const navigate=useNavigate();
    const errores=useActionData();
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
            <p className='mt-3'>Modificar los datos del cliente</p>
            <div className="flex justify-end">
                <button className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
                        onClick={() => navigate('/')}>Volver
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
                <Form method='POST' noValidate>
                    <Formulario cliente={cliente}/>
                    <input type="submit" className='mt-5 w-full bg-blue-800 uppercase font-bold text-white text-lg'
                           value='Editar Cliente'/>
                </Form>
            </div>
        </>
    );
};

export default EditarCliente;
