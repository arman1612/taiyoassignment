
interface Contact{
  uuid:string,
  firstName:string,
  lastName:string,
  status:string
}


export const addContact = (contact:Contact) => ({
    type: 'ADD_CONTACT',
    payload: contact,
  });