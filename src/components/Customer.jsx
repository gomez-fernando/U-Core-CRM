import { Form, useNavigate, redirect } from "react-router-dom";
import { deleteCustomer } from '../api/customers'

export async function action({ params }) {
  await deleteCustomer(params.id)
  return redirect('/')
}

const Customer = ({ customer }) => {
  const navigate = useNavigate()
  const { name, phone, email, enterprise, id } = customer

  return (
    <tr>
      <td className='p-6 space-y-2'>
        <p className="text-2xl text-gray-800">{name}</p>
        <p>{enterprise}</p>
      </td>
      <td className='p-6 space-y-2'>
        <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
        <p className="text-gray-600"><span className="text-gray-800 uppercase font-bold">Tel: </span>{phone}</p>
      </td>
      <td className="p-6 flex gap-3">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >Editar</button>
        <Form
          method="post"
          action={`/clientes/${id}/delete`}
          onSubmit={(e) => {
            if(!confirm('¿Deseas eliminar este registro?')){
              e.preventDefault();

            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
          >Eliminar
          </button>
        </Form>
      </td>
    </tr>
  )
}

export default Customer