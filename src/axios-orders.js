import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-react-94aea.firebaseio.com/"
});

export default instance;
