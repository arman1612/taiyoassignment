interface Contact{
  firstName:string,
  lastName:string,
  status:string
}

export const UPDATE_CONTACT = 'UPDATE_CONTACT';

export const updateContact = (uuid:string, updatedData:Contact) => ({
  type: UPDATE_CONTACT,
  payload: { uuid, updatedData },
});