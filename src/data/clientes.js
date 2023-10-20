export async function obtenerClientes(){
    const url=import.meta.env.VITE_API_URL
    const response=await fetch(url);
    const result=await response.json()
    return result
}

export async function obtenerCliente(id){
    const url=import.meta.env.VITE_API_URL
    const response=await fetch(`${url}/${id}`);
    const result=await response.json()
    return result
}

export async function agregarCliente(datos) {
    const url=import.meta.env.VITE_API_URL

    try {
        const response=await fetch(url,{
            method:'POST',
            body:JSON.stringify(datos),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const result=await response.json
    }catch (e){
        console.log(e)
    }
}

export async function modificarCliente(id,datos){
    const url=import.meta.env.VITE_API_URL

    try {
        const response=await fetch(`${url}/${id}`,{
            method:'PUT',
            body:JSON.stringify(datos),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const result=await response.json
    }catch (e){
        console.log(e)
    }
}

export async function eliminarCliente(id){
    const url=import.meta.env.VITE_API_URL
    try {
        const response=await fetch(`${url}/${id}`,{
            method:'DELETE',
        })
        const result=await response.json
    }catch (e){
        console.log(e)
    }
}