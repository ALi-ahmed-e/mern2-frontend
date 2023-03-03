import { useEffect } from "react"
import { useSelector } from "react-redux"
import AddGoal from "../components/AddGoal"
import ShowGoals from "../components/ShowGoals"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { isSuccess } = useSelector((state) => state.goals)

  let times = 0

  useEffect(() => {
    times = 1
    times <= 1 && toast('Hello ' + user.name)
  });
  useEffect(() => {
    isSuccess && toast('Operation done')
  }, [isSuccess]);





  return (
    <div>


      <ToastContainer />
      <AddGoal />
      <br />
      <br />
      <ShowGoals />

    </div>
  )
}

export default Dashboard