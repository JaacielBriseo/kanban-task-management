import { useAppSelector } from "../../store"
import { ModalLayout } from "../../ui"

export const AddNewTask = () => {
    const {isAddNewTaskModalOpen} = useAppSelector(state=> state.ui)
  return (
    <ModalLayout isShowing={isAddNewTaskModalOpen}>

    </ModalLayout>
  )
}
