
import {useDispatch} from 'react-redux'
import { deleteContact } from '../reduxcontainer/deleteContactAction';
import React, { useState, useEffect } from 'react';
import { Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props{
  uuid:string,
  fName:string,
  lName:string,
  status:string
}

function Card(props:Props){
   
    
    const [isPopoverVisible, setIsPopoverVisible] = useState<boolean | string |null>(false);
    const dispatch = useDispatch();

   
    //Delete Contact
    function handleDelete(){
      
      const res = dispatch(deleteContact(props.fName, props.lName, props.status));
      
      if(res) {
        toast.success(' Contact Deleted Successfully!', {
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
      }
   
    }

    //View Contact
    function handleView(uuid:string){
      setIsPopoverVisible(uuid);
    }

    useEffect(() => {
      // Function to handle clicks outside the popover
      function handleClickOutside(event:MouseEvent) {
          // Get references to the view button and popover of the current card
          const viewButton = document.getElementById(`view-button-${props.uuid}`);
          const popover = document.getElementById(`popover-${props.uuid}`);
          // Check if the click target is not the view button or the popover itself
          if (viewButton && popover && !viewButton.contains(event.target as Node) && !popover.contains(event.target as Node)) {
              // If so, close the popover by setting visiblePopover to null
              setIsPopoverVisible(null);
          }
      }
  
      // Attach the click event listener to the document
      document.addEventListener('mousedown', handleClickOutside);
      // Clean up the event listener when the component unmounts
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
      }, [props.uuid]);

    return (
      <div className='relative'> {/* Set the parent container as relative */}
           
          <div className="flex flex-col shadow-2xl border-gray-900 border-1 w-72 h-52 p-6 mb-6 ml-10">
              <h5 className="w-[100%] text-center mb-2">{props.fName} {props.lName}</h5>
              <button id={`view-button-${props.uuid}`} type="button" onClick={() => handleView(props.uuid)}  data-ripple-light="true" data-popover-target="popover" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">View</button>
              <a href={`/editContact/${props.uuid}`}>  <button type="button" className="w-[96%] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >  Edit   </button> </a>
              <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleDelete}>Delete</button>
              {isPopoverVisible===props.uuid && (
                  <div id={`popover-${props.uuid}`} data-popover="popover"
                  className="flex bg-zinc-50 justify-center items-center absolute bottom-48 h-60 left-20 w-[60%] font-sans text-sm font-normal break-words whitespace-normal  border rounded-lg shadow-lg  border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none">
                     <div className='w-[80%] h-[80%] flex  justify-center items-center m-2 bg-slate-300'>
                        <ul>
                           <li className='m-5 font-semibold'>FirstName: {props.fName} </li>
                           <li className='m-5 font-semibold'>LastName:  {props.lName} </li>
                           <li className='m-5 font-semibold'>Status:    {props.status} </li>
                        </ul>
                     </div>
                  </div> 
              )}

              
          </div>
          
      </div>
  );
}

export default Card