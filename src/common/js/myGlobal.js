import axios from "axios";

export default async function api(url, method, headers, params, data) {
  return (await axios({
      method,
      url,
      headers,
      params,
      data,
  }).catch(e => {
      console.log(e);
  })).data
}