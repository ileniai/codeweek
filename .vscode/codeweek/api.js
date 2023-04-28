//const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const GET = async () =>{
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()
    return users
}

export {GET}


