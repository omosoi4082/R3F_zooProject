import { useContext } from 'react'
import { EditIcon } from "../icons/EditIcon"
import { EditContext } from '../../context/EditContext'

export const Overlay = () => {
const {SetEditmode}=useContext(EditContext)

  return (
    <div className='overlay'>
      <EditIcon onClick={()=>{SetEditmode((prev)=>!prev)}}/>
    </div>
    
  )
}