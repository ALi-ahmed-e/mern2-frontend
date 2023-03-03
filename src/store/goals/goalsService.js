import axios from 'axios'

const API_URL = '/api/goals/'




const addGoal = async (data,token) => {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL,{text: data},config)

    return response.data
}

const getGoals = async (token) => {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)

    return response.data.message
}


const deleteGoal = async (goalId,token) => {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+`${goalId}`,config)

    return response.data.message
}
const updateGoal = async (data,prevdata,token) => {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+`${prevdata._id}`,{text:data},config)

    return response.data.message
}




const goalService = { getGoals,addGoal,deleteGoal,updateGoal }

export default goalService