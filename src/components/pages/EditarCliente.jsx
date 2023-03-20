import { obtenerCliente, actualizarCliente } from "../../data/clientes"
import { useLoaderData, Form, useNavigate, useActionData, redirect } from "react-router-dom"
import Formulario from "../Formulario"
import Error from "../Error"


export async function loader({params}) {
    const cliente = await obtenerCliente(params.clienteId)
    
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados' // Acá podría mostrar un componente con una página 404, o en mi main incluir el statusText en el ErrorElement
        })
    }

    return cliente
}


export async function action({request, params}) {
    // console.log(request) -> async porque este request puede tardar
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email') // Obtengo el valor del name email del form

    // Validación para todos los campos del form
    const errores = []

    if(Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios -NuevoCliente.jsx-')
    }

    // Validación para un campo puntual del form
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errores.push('El email no es válido -NuevoCliente.jsx-')
    }

    // Retornar si hay errores
    if (Object.keys(errores).length) {
        return errores
    }

    // Actualizar el cliente
    // Con await primero espero que termine de ejecutarse ese codigo y luego se ejecuta la siguiente linea siguiente
    await actualizarCliente(params.clienteId, datos) 

    // Redireccionar a clientes
    return redirect("/")
}


const EditarCliente = () => {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()


    return (
        <>
        <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
        <p className="mt-3">
          Modifica los campos necesarios para editar el cliente
        </p>
  
        <div className="flex justify-end">
          <button
            className="bg-blue-700 hover:bg-blue-900 hover:cursor-pointer text-white px-3 py-1 font-bold uppercase rounded"
            onClick={() => navigate("/")}
          >
            Volver
          </button>
        </div>
  
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
  
          {errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )}
  
          <Form             
            method="post"
            noValidate // Deshabilita la validación de HTML5
          >
            <Formulario 
                cliente={cliente}
            />
  
            <input
              type="submit"
              className="mt-5 w-full bg-blue-700 hover:bg-blue-900 hover:cursor-pointer p-3 uppercase font-bold text-white text-lg rounded-full"
              value="Guardar Cambios"
            />
          </Form>
        </div>
      </>
    )
}

export default EditarCliente