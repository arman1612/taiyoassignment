import React,{ useState } from "react"
import {useSelector} from 'react-redux'
import CreateContactForm from "./CreateContactForm";
import Card from "./Cards";
import Sidebar from "./Sidebar";
import Heading from "./Heading";

interface Contact{
    uuid:string,
    firstName:string,
    lastName:string,
    status:string
  }

function Contacts(){

    const [buttonClicked, setButtonClicked] = useState(false);
    const contactlist=useSelector( (state:any) =>state.contacts)
    
    function handleclick(){
        setButtonClicked(!buttonClicked)
    }

    return(
        <div>
            <Heading title="Contact Page"/>
            
            <div className="flex  w-[98%] ml-3 h-70">
                 <Sidebar />

                <div className="w-[82%] shadow-xl  border-gray-900 border-2 flex flex-col">
                  
                  <div className="w-[100%] text-center"> 
                     {buttonClicked? <CreateContactForm />:<button className=" border-black border-2  bg-gray-200 text-xs p-1 my-10" onClick={handleclick}>Create Contact</button>} 
                  </div>

                  { contactlist.length===0 ? <div className="flex justify-center">  
                     <div className="border-black border-2 p-6 my-4 text-2xl flex w-[50%]">
                        <i className="bi bi-x-circle-fill text-5xl"></i>
                        <h3 className="font-bold ml-4">No Contact Found Please add contact from Create Contact Button</h3>
                     </div>
                   </div> : <div className="flex flex-wrap m-5 ml-3"> { contactlist.map((ele:Contact)=> {return <Card uuid={ele.uuid}  fName={ele.firstName} lName={ele.lastName} status={ele.status}></Card>})} </div> }  

                </div> 
            </div>

        </div>
    )
}

export default Contacts