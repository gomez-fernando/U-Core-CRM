import {useLoaderData} from 'react-router-dom'
import Customer from '../components/Customer';

export function loader(){
  const customers = [
    {
        id: 1,
        name: 'Juan',
        phone: 102013313,
        email: "juan@gmail.com",
        enterprise: 'House style'
    },
    {
        id: 2,
        name: 'Karen',
        phone: 138198313,
        email: "karen@gmail.com",
        enterprise: 'House style'
    },
    {
        id: 3,
        name: 'Josue',
        phone: 31983913,
        email: "josue@gmail.com",
        enterprise: 'House style'
    },
    {
        id: 4,
        name: 'Miguel',
        phone: 319381983,
        email: "miguel@gmail.com",
        enterprise: 'House style'
    },
    {
        id: 5,
        name: 'Pedro',
        phone: 1398198938,
        email: "pedro@juan.com",
        enterprise: 'House style'
    },
];

  return customers;
}

const Index = () => {
  const customers = useLoaderData();

  return (
    <div>
      <>
        <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
        <p className="mt-3">Administra tus clientes</p>

        {customers.length ? (
          <table className='w-full bg-white shadow mt-5 table-auto'>
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Cliente</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                  <Customer 
                    key={customer.id}
                    customer={customer}
                  />
                ))}
              </tbody>
          </table>
        ) : (
          <p className="text-center mt-10">No hay clientes registrados</p>
        )}
      </>
    </div>
  )
}

export default Index