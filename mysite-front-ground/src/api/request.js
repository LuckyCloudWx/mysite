import axios from "axios";
import showMessage from "../utils/showMessage";

const int = axios.create()
int.interceptors.response.use(function(conf) {
  if (conf.data.code !== 0) {
    const resp = JSON.parse(conf.data);
    // showMessage(resp.msg, 'warn');
    return resp.data;
  }
  return conf.data.data;
})

export default int;