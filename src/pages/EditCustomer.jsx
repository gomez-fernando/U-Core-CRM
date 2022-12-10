import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import { getCustomer, updateCustomer } from "../api/customers";
import CustomerForm from "../components/CustomerForm";
import Error from "../components/Error";

export async function loader({ params }) {
  const customer = await getCustomer(params.id)
  if (Object.values(customer).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Cliente no encontrado'
    })
  }

  return customer;
}

export async function action({request, params}){
  const data = Object.fromEntries(await request.formData())
  const email = data.email

  // Validation
  const errors = []
  if(Object.values(data).includes('')){
    errors.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)){
    errors.push('El email no es válido')
  }

  if(Object.keys(errors).length){
    return errors;
  }

  await updateCustomer(params.id, data)

  return redirect('/')
}

const EditCustomer = () => {
  const navigate = useNavigate();
  const customer = useLoaderData();
  const errors = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Puedes editar los datos del cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-sm"
          onClick={() => navigate(-1)}
        >Volver</button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10" >
        {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method='post' noValidate>
          <CustomerForm customer={customer}/>
          <div className="flex justify-center">
            <input
              type="submit"
              className="mt-5 w-1/2 mx-auto bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md hover:cursor-pointer hover:bg-blue-900"
              value="Guardar Cambios"
            />
          </div>
        </Form>
      </div>
    </>
  )
}

export default EditCustomer