import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalSevice from './goalsService'

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  inputVal: ''
}

// add goal
export const addgoal = createAsyncThunk('goal/add', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalSevice.addGoal(data, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)
export const getgoals = createAsyncThunk('goal/get', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalSevice.getGoals(token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)
export const deletegoal = createAsyncThunk('goal/delete', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await goalSevice.deleteGoal(data, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)
export const updategoal = createAsyncThunk('goal/update', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    const prevdata = thunkAPI.getState().goals.inputVal
    const dispatch = thunkAPI.dispatch
    const res = await goalSevice.updateGoal(data, prevdata, token)
    if (res) {
      dispatch(getgoals())
      dispatch(updateval(''))
    } else {
      return res
    }

  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)


export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    updateval: (state, action) => {
      state.inputVal = action.payload
    },
  },
  extraReducers: (builder) => {
    //addGoals
    builder.addCase(addgoal.pending, (state) => {
      state.isLoading = true
    })
      .addCase(addgoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload.message)
      })
      .addCase(addgoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.message = null
      })
    //getGoals
    builder.addCase(getgoals.pending, (state) => {
      state.isLoading = true
    })
      .addCase(getgoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.goals = action.payload
      })
      .addCase(getgoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.message = null
      })
    //delete goals
    builder.addCase(deletegoal.pending, (state) => {
      state.isLoading = true
    })
      .addCase(deletegoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const i = state.goals.indexOf(action.payload)
        state.goals.splice(i, 1)
      })
      .addCase(deletegoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.message = null
      })
    //update goals
    builder.addCase(updategoal.pending, (state) => {
      state.isLoading = true
    })
      .addCase(updategoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updategoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.message = null
      })

  },
})

export const { updateval } = goalsSlice.actions
export default goalsSlice.reducer