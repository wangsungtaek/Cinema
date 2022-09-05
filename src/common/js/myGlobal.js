export default {
  install(app, options) {

    app.config.globalProperties.$api =  async (url, method, data) => {
      return (await axios({
          method: method,
          url,
          data
      }).catch(e => {
          console.log(e);
      })).data
    };
    
  }
}