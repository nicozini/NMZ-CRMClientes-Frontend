// FUNCION: obtener clientes de mi DB Json-Server mediante fetch
export async function obtenerClientes() {
    const respuesta = await fetch(import.meta.env.VITE_API_URL)
    const resultado = await respuesta.json()
    return resultado
}


// FUNCION: obtener clientes de mi DB Json-Server mediante fetch
export async function obtenerCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const resultado = await respuesta.json()
    return resultado
}


// FUNCION: agregregar clientes en mi DB creada con Json-Server
export async function agregarCliente(datos) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await respuesta.json()
        
    } catch (error) {
        console.log(error)
    }
}


// FUNCION: actualizar un cliente
export async function actualizarCliente(id, datos) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await respuesta.json()
        
    } catch (error) {
        console.log(error)
    }
}


// FUNCION: eliminar un cliente
export async function eliminarCliente(id) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE' // No tiene body ni headers porque no estoy enviando información
        })

        await respuesta.json()
        
    } catch (error) {
        console.log(error)
    }
}