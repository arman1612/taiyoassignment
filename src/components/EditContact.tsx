import React from 'react';
import {useSelector} from 'react-redux'
import Card from "./Cards";
import Sidebar from "./Sidebar";
import Heading from "./Heading";
import EditContactForm from './EditContactForm';

interface Contact{
  uuid:string,
  firstName:string,
  lastName:string,
  status:string
}



function EditContact(){

    const contactlist=useSelector((state:any)=>state.contacts)
    
    return(
        <div>
            <Heading title="Contact Page"/>
            
            <div className="flex  w-[98%] ml-3 h-70">
                 <Sidebar />

                <div className="w-[82%] shadow-xl  border-gray-900 border-2 flex flex-col">
                  
                  <div className="w-[100%] text-center"> 
                    <EditContactForm />
                  </div>

                  { contactlist.length===0 ? <div className="flex justify-center">  
                     <div className="border-black border-2 p-6 my-4 text-2xl flex w-[50%]">
                        <i className="bi bi-x-circle-fill text-5xl"></i>
                        <h3 className="font-bold ml-4">No Contact Found Please add contact from Create Contact Button</h3>
                     </div>
                   </div> : <div className="flex flex-wrap m-5 ml-3"> { contactlist.map((ele:Contact)=> {return <Card uuid={ele.uuid}   fName={ele.firstName} lName={ele.lastName} status={ele.status}></Card>})} </div> }  

                </div> 
            </div>

        </div>
    )
}

export default EditContact