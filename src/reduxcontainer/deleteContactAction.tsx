export const DELETE_CONTACT = 'DELETE_CONTACT';

export const deleteContact = (firstName:string, lastName:string, status:string) => ({
  type: DELETE_CONTACT,
  payload: { firstName, lastName, status },
});