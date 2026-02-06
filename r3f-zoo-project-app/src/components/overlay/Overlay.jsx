import { useContext } from 'react'
import { EditIcon } from "../icons/EditIcon"
import { RotateLeft } from "../icons/RotateLeft"
import { RotateRight } from "../icons/RotateRight"
import { EditContext } from '../../context/EditContext'

export const Overlay = () => {
  const { SetEditmode, selectdeId ,rotate} = useContext(EditContext)

  return (
    <div className='overlay'>
      {
        selectdeId ? (<>
          <RotateLeft onClick={()=>rotate("left")}/>
          <RotateRight onClick={()=>rotate("right")}/>
        </>
        ) : null
      }
      <EditIcon onClick={() => { SetEditmode((prev) => !prev) }} />
    </div>

  )
}