import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {updateContact} from "../reduxcontainer/editContactAction"
import { useParams,useNavigate } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Contact {
    uuid: string;
    firstName: string;
    lastName: string;
    status: string;
}

function EditContactForm() {
   
    const { uuid } = useParams();
    const contactList = useSelector( (state:any) => state.contacts);
    const Navigate=useNavigate();

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    const [active, setActive] = useState(true); 
    const [inactive, setInactive] = useState(false); 

    const dispatch = useDispatch();

    useEffect(() => {
        // Find the contact in the contactList array based on UUID
        const contact: Contact | undefined = contactList.find((contact: Contact) => contact.uuid === uuid);
        if (contact) {
            // If contact is found, extract first name, last name, and status
            setFirstName(contact.firstName);
            setLastName(contact.lastName);
            setActive(contact.status === 'Active');
            setInactive(contact.status === 'Inactive');
        }
    }, [uuid, contactList]);
    
    function capitalizeFirstLetter(word:string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
       
        e.preventDefault();
        const status = active ? 'Active' : 'Inactive';
        console.log('Contact saved:', { firstName, lastName, status,uuid });

        firstName=capitalizeFirstLetter(firstName)
        lastName=capitalizeFirstLetter(lastName)
        
        const updatedContact = {
            firstName,
            lastName,
            status
        };
        
        if(uuid){
            
            const res=dispatch(updateContact(uuid, updatedContact));

            if(res){
                toast.success(' Contact Edited Successfully!', {
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
    
                setTimeout(() => {
                    Navigate("/") 
                }, 1500);        
            }

        }
        
    
        setFirstName('');
        setLastName('');
        setActive(true); 
        setInactive(false); 
    };

    return (
        <div>
        {/* <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Flip} /> */}
        <form className="max-w-md mx-auto mt-4 mb-7 shadow-xl p-10" onSubmit={handleSubmit}>
            <div className="mb-4">
                <div className="flex justify-between">
                    <label htmlFor="firstName" className="block text-sm font-bold mr-2">First Name:</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" required />
                </div>
            </div>
            <div className="mb-4">
                <div className="flex justify-between">
                    <label htmlFor="lastName" className="block text-sm font-bold mr-2">Last Name:</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" required />
                </div>
            </div>
            <div className="mb-4">
                <div className="flex items-center">
                    <label className="block text-sm font-bold mr-2">Status:</label>
                    <div className="flex items-center mr-2">
                        <input type="checkbox" id="active" checked={active}
                            onChange={() => {
                                setActive(true);
                                setInactive(false);
                            }}
                            className="ml-7"
                        />
                        <label htmlFor="active" className="text-sm mr-10">Active</label>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="inactive" checked={inactive}
                            onChange={() => {
                                setActive(false);
                                setInactive(true);
                            }}
                            className="mr-1"
                        />
                        <label htmlFor="inactive" className="text-sm">Inactive</label>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button type="submit" className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                     Save Edited Contact 
             
                </button>
            </div>
        </form>
     
        </div>
    );
}

export default EditContactForm;
