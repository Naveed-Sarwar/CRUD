import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { db } from "../config/Firebase";
// fetch Data from Firebase
import axios from "axios";

export const fetchTodo = createAsyncThunk("todo/fetchData", async () => {
  try {
    const res = await axios.get("http://localhost:5000/");
    // console.log("fetch data", res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error?.message);
  }
});

export const addTodo = createAsyncThunk("todo/addData", async ({ data }) => {
  try {
    const res = await axios.post("http://localhost:5000/add", data);
    // console.log("data", res.data.data);
    return res.data.data;
  } catch (error) {
    console.log("error", error);
  }
});

export const updateTodo = createAsyncThunk("todo/updateTodo", async (data) => {
  try {
    console.log("first" , data)
    const resData = await axios.put("http://localhost:5000/update", data);
    console.log("update data", resData.data.data);
    return resData.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  console.log(id)
  try {
    const res = await axios.delete(`http://localhost:5000/delete/${id} `);
    console.log("Det", res);
    return id;
  } catch (error) {
    console.log(error);
  }
});
// Add Data into Firebase

// export const addData = createAsyncThunk(
//   "todoSlice/addData",
//   async (data, {}) => {
//     try {
//       await db.collection("Tasks").add(data);
//       const localData = { ...data, uid: data.uid };
//       return localData;
//     } catch (error) {
//       console.log(error.message);
//     } finally {
//     }
//   }
// );

// export const deleteData = createAsyncThunk(
//   "todoSlice/deleteData",
//   async (docId) => {
//     // console.log(uid);
//     await db.collection("Tasks").doc(docId).delete();

//     return docId;
//   }
// );
// export const toggleComplete = createAsyncThunk(
//   "todoSlice/toggleComplete",
//   async (docId, updateData) => {
//     // console.log(updateData);
//     await db.collection("tasks").doc(docId).update(updateData);
//     return data;
//   }
// );
// export const updateData = createAsyncThunk(
//   "todoSlice/updateData",
//   async (data) => {
//     await db.collection("Tasks").doc(data.docId).update(data);
//     return data;
//   }
// );

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: (builder) => {
    // [fetchTodo.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [fetchTodo.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.todo = action.payload;
    //   state.isSuccess = true;
    // },
    // [fetchTodo.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = false;
    //   state.message = "failed";
    // },

    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.todo = action.payload;
      // state.isUserLoggedIn = action.payload ? true : false;
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todo = [...state.todo, action.payload];
      // state.isUserLoggedIn = action.payload ? true : false;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const fetch = state.todo?.map((item) => {
        console.log("update reducer" , action.payload);
        if (item?._id == action.payload._id) {
          return action.payload;
        } else {
          return item
        }
      });
      state.todo = fetch;
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      console.log("delete reducer" , action.payload)
      const fetch = state.todo?.filter((item) => {
        if (item?._id !== action.payload) {
          return item;
        } 
      });
      state.todo =  fetch;
    });
    // [addTodo.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.todo.data = [...state.todo.data, action.payload.data.data];
    //   console.log("action", action.payload);
    //   state.isSuccess = true;
    // },
    // [addTodo.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = false;
    //   state.message = "failed";
    // },
    // [updateTodo.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [updateTodo.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   console.log("action", action.payload);
    //   const updateTodo = state.todo.map((item) => {
    //     if (action.payload._id === item.id) {
    //       return action.payload;
    //     } else {
    //       return item;
    //     }
    //   });
    //   console.log("updated data", updateTodo);
    //   state.todo = updateTodo;
    // },
    // [updateTodo.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = false;
    //   state.message = "failed";
    // },

    // [deleteTodo.fulfilled]: (state, action) => {
    //   console.log("de", action.payload);
    //   const dataAfterDelete = state.todo.filter(
    //     (item) => item.id !== action.payload._id
    //   );
    //   state.todo = dataAfterDelete;
    //   console.log("dataAfterDelete", dataAfterDelete);
    // },
  },
});
export const { setIsUpdate } = todoSlice.actions;
export default todoSlice.reducer;
