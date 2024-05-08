import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../reduxcontainer/addContactAction'
import { v4 as uuidv4 } from 'uuid';


function CreateContactForm() {
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    const [active, setActive] = useState(true); 
    const [inactive, setInactive] = useState(false); 

    const dispatch = useDispatch();
    
    function capitalizeFirstLetter(word:string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
       
        const uuid=uuidv4();

        e.preventDefault();
        const status = active ? 'Active' : 'Inactive';
        console.log('Contact saved:', { firstName, lastName, status,uuid });

        firstName=capitalizeFirstLetter(firstName)
        lastName=capitalizeFirstLetter(lastName)
        
        const contact = { firstName, lastName,status,uuid };
        dispatch(addContact(contact));

    
        setFirstName('');
        setLastName('');
        setActive(true); 
        setInactive(false); 
    };

    return (
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
                     Save Contact 
             
                </button>
            </div>
         
        </form>
    );
}

export default CreateContactForm;
