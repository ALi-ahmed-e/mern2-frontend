import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addgoal, updategoal } from '../store/goals/goalsSlice'

const AddGoal = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const { inputVal, isLoading } = useSelector((state) => state.goals)

  useEffect(() => {

    if (inputVal) { inputRef.current.value = inputVal.text } else { inputRef.current.value = '' }

  }, [inputVal]);
  const addGoal = (e) => {
    e.preventDefault()
    console.log(e.target.name.value)
    dispatch(addgoal(e.target.name.value))
    e.target.name.value = ''
  }
  const saveUpdate = (e) => {
    e.preventDefault()

    dispatch(updategoal(e.target.name.value))
  }



  return (
    <form onSubmit={inputVal ? saveUpdate : addGoal} className=" bg-[#eee] mx-auto p-3 rounded-md flex flex-col items-center w-full max-w-sm">


      <input ref={inputRef} required title="goal Name" name="name" className=" px-3 py-1 rounded-md ring-1 m-5" placeholder=" goal name" type="text" />
      <button title="add goal " className=" bg-indigo-600 hover:bg-indigo-700 rounded-md text-white px-5 py-2">{inputVal ? 'save changes' : 'Add goal'}</button>
    </form>
  )
}

export default AddGoal