<template>
  <h1>LBD TEST</h1>
</template>

<script>
import LBD from '@/common/js/LBD';

export default {
  name: 'MainView',

  created() {
    this.testAPI();
  },

  methods: {
    async testAPI() {

      const lbd = new LBD();
      console.log('--------');
      console.log('## time : ', await lbd.getTime());
      console.log('## transaction :', await lbd.getTransaction('E74124E59B03AD1F912B10C04711755B47E33FEDACB096C63A58B69580C98B7F'));

   }
  }
}
</script>

<style>

</style>