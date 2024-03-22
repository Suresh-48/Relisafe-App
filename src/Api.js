import axios from "axios";

// const Api = axios.create({
//   baseURL: "https://relisafe-deve.herokuapp.com/",
// });
const Api = axios.create({
  baseURL: "http://localhost:8000/",
});

export default Api;
