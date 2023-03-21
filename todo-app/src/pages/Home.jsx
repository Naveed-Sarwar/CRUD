import React, { useEffect, useState } from "react";
import "../css/styles.scss";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, fetchTodo, updateTodo } from "../store/todoSlice";
import { DisplaySettings } from "@mui/icons-material";
const Home = () => {
  const dispatch = useDispatch();
  const fetchId = useSelector((state) => state.auth.user._id);
  console.log("fetchid", fetchId);
  const fetch = useSelector((state) => state.todo.todo);
  // console.log("fetch", fetch);
  const [name, setName] = useState("");
  const [allTodo, setAllTodo] = useState([]);
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  const submit = () => {
    const data = {
      userId: fetchId,
      todo: name,
    };
    console.log("input data", data);
    dispatch(addTodo({ data }));
    setName("");
  };

  const updatesubmit = async () => {
    const data = {
      todo: name,
      _id: id,
    };
    dispatch(updateTodo(data));
    // try {
    //   const resData = await axios.put("http://localhost:5000/update", data);
    //   console.log("res", resData);
    setName("");
    setFlag(false);
    setId("");

    setAllTodo(fetch);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const updateHandler = (item) => {
    console.log(item.todo);
    setName(item?.todo);
    setFlag(true);
    setId(item._id);
  };

  const deleteHandler = async (id) => {
    dispatch(deleteTodo(id));
    // try {
    //   var config = {
    //     method: "delete",
    //     url: "http://localhost:5000/delete",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: data,
    //   };
    // const delRes = await axios(config);

    // const del = allTodo.filter((item) => {
    //   if (item._id != id) {
    //     return item;
    //   }
    // });
    // console.log("delData", delRes);

    // setAllTodo(del);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div>
      <div className="head">
        <div className="card">
          <h1>Todo List</h1>
          <div>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="input"
              placeholder="Enter Name"
              value={name}
            />
            {flag ? (
              <button onClick={updatesubmit} className="submit-btn">
                Update
              </button>
            ) : (
              <button onClick={submit} className="submit-btn">
                Submit
              </button>
            )}
          </div>
          <div>
            {fetch
              ?.filter((task) => {
                if (task?.userId == fetchId) {
                  return task;
                }
              })
              
              ?.map((item) => {
                // console.log("item", item?.todo);
                return (
                  <div className="list">
                    <p>{item?.todo}</p>
                    <div className="btns">
                      <button
                        onClick={() => updateHandler(item)}
                        className="modify-btns"
                      >
                        <CreateIcon />
                      </button>
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="modify-btns"
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
