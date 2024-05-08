import React from 'react'

interface Props{
  title:string
}
const Heading = (props:Props) => {
  return (
    <div className="w-full bg-cyan-500 h-14 my-6 flex justify-center items-center font-bold text-2xl"> {props.title} </div>
  )
}

export default Heading