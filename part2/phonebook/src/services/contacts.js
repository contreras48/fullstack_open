import axios from 'axios';

const baseUrl  = 'https://phonebook-react.fly.dev/api/persons';


const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = newContact => {
  const request = axios.post(baseUrl, newContact);
  return request.then(response => response.data);
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

const update = (contact, id) => {
  const request = axios.put(`${baseUrl}/${id}`, contact);
  return request.then(response => response.data); 
}
export default {getAll, create, remove, update};