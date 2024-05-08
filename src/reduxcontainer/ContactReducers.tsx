import { Flip,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Contact{
  uuid:string,
  firstName:string,
  lastName:string,
  status:string
}

interface Action{
  type: string;
  payload?: any;
}

const initialState = {
    contacts: [],
  };
  
  const contactReducer = (state = initialState, action:Action) => {
    switch (action.type) {
        case 'ADD_CONTACT':

        const existingContact = state.contacts.find( (contact:Contact) => contact.firstName === action.payload.firstName && contact.lastName === action.payload.lastName && contact.status === action.payload.status);
        if (existingContact) {
        
          toast.warn(' Contact Already Exists', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
            });

          return state;
          
        } else {
          
          toast.success(' Contact Created Successfully!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
            });

          return {
            ...state,
            contacts: [...state.contacts, action.payload],
          };
          
        }
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter( (contact:Contact) =>
                    contact.firstName !== action.payload.firstName ||
                    contact.lastName !== action.payload.lastName ||
                    contact.status !== action.payload.status
                ),
            };
            case 'UPDATE_CONTACT':
              return {
                ...state,
                contacts: state.contacts.map((contact:Contact) =>
                  contact.uuid === action.payload.uuid
                    ? { ...contact, ...action.payload.updatedData }
                    : contact
                ),
              };
      default:
        return state;
    }
  };
  
  export default contactReducer;
  