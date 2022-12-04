export async function getCustomers(){
  const response = await fetch(import.meta.env.VITE_API_URL)
  const result = await response.json()
  return result;
}

export async function createCustomer(data){
  console.log('data:' + JSON.stringify(data));
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await response.json()
  } catch (error) {
    console.log(error);
  }
}