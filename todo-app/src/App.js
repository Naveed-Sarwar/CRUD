import "./App.css";
import Routing from "./routing/Routing";
import { getLoggedInUser } from "./store/AuthSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      // You can await here
      // const response = await MyAPI.getData(someId);
      // ...
      const token = await window.localStorage.getItem("token");
      console.log("token", token);
      if (token?.length > 10) {
        dispatch(getLoggedInUser(token));
      }
    }
    fetchData();
  }, []);

  // useEffect(async () => {
  //   const token = await window.localStorage.getItem("token");
  //   console.log("token" , token);
  //   if (token?.length > 10) {
  //     dispatch(getLoggedInUser(token));
  //   }
  // }, []);
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
