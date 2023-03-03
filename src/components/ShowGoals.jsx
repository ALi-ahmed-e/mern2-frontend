import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletegoal, getgoals, updateval } from '../store/goals/goalsSlice';

const ShowGoals = () => {
    const { goals } = useSelector((state) => state.goals)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getgoals())
    }, []);

    const deletetheGoal = (goal) => {
        dispatch(deletegoal(goal))
    }
    
    const updatetheGoal = (goal) => {
        dispatch(updateval(goal))
    }


    return (
        <div className=' w-full max-w-4xl bg-slate-200 p-3 mx-auto rounded-md text-center'>

            {goals.map(e => <div key={Math.random()} className="max-w-xs m-4 break-words inline-block p-6 bg-white border border-gray-200 rounded-lg shadow ">
                <button>
                    <h5 className="mb-2 text-2xl font-bold  tracking-tight text-gray-900 ">
                        {e.text}
                    </h5>
                </button>

                <div> <button
                    onClick={() => deletetheGoal(e._id)}
                    className="inline-flex mx-4 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300/20 "
                >
                    Delete

                </button>
                    <button
                        onClick={() => updatetheGoal(e)}
                        className="inline-flex mx-4 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Edit

                    </button></div>
            </div>


            )}





        </div>
    )
}

export default ShowGoals