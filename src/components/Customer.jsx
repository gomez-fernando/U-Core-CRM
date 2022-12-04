const Customer = ({customer}) => {
  const {name, phone, email, enterprise, id} = customer

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
        >Editar</button>
         <button
          type="button"
          className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
        >Eliminar</button>
      </td>
    </tr>
  )
}

export default Customer