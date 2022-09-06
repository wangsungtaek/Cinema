import axios from "axios";

export default async function api(url, method, headers) {
  return (await axios({
      method: method,
      url,
      headers
  }).catch(e => {
      console.log(e);
  })).data
}