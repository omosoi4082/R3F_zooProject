import { useContext } from 'react'
import { EditIcon } from "../icons/EditIcon"
import { CloseIcon } from "../icons/CloseIcon"
import { RotateLeft } from "../icons/RotateLeft"
import { RotateRight } from "../icons/RotateRight"
import { EditContext } from '../../context/EditContext'

export const Overlay = () => {
  const { isEditMode, SetEditmode, selectdeId, rotate, setSelectdeId } = useContext(EditContext)

  return (
    <div className='overlay'>
      {
        isEditMode && selectdeId ? (<>
          <RotateLeft onClick={() => rotate("left")} />
          <RotateRight onClick={() => rotate("right")} />
        </>
        ) : null}
      {selectdeId ? <CloseIcon onClick={() => setSelectdeId(null)} /> : null}
      <EditIcon onClick={() => { SetEditmode((prev) => !prev) }} />
    </div>

  )
}