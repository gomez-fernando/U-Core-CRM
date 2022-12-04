import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import { createCustomer } from '../api/customers'
import CustomerForm from '../components/CustomerForm'
import Error from '../components/Error'

export async function action({request}) {
  // const formData = await request.formData()
  // console.log([...formData])

  const data = Object.fromEntries(await request.formData())
  const email = data.email
  console.log('email:'  + email)

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

  await createCustomer(data)

  return redirect('/')
}

function NewCustomer() {
  const errors = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-sm"
          onClick={() => navigate(-1)}
        >Volver</button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10" >
        {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method='post' noValidate>
          <CustomerForm />
          <div className="flex justify-center">
            <input
              type="submit"
              className="mt-5 w-1/2 mx-auto bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md hover:cursor-pointer hover:bg-blue-900"
              value="Registrar Cliente"
            />
          </div>
        </Form>
      </div>
    </>
  )
}

export default NewCustomer