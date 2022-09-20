<template>
  <div class="common-layout">
    <el-container>
      <el-header>LINK CINEMA</el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
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
      // console.log('## time : ', await lbd.getTime());
      // console.log('## transaction :', await lbd.getTransaction('E74124E59B03AD1F912B10C04711755B47E33FEDACB096C63A58B69580C98B7F'));

      // console.log('## Service :', await lbd.getService('3e08fa95-1274-4ec8-89d7-676ec1a61fda'));
      // console.log('## Service Token :', await lbd.getServiceToken());
      // console.log('## Service Token By ContractId :', await lbd.getServiceTokenBycontractId('9990f166'));
      // console.log('## Service Token Holder By ContractId :', await lbd.getServiceTokenHolderBycontractId('9990f166'));

      
      // console.log('## itemToken :', await lbd.getItemToken('5de7845d'));
      // console.log('## fungible Token :', await lbd.getFungibleList('5de7845d'));
      // console.log('## non-fungible Token :', await lbd.getNonFungibleList('5de7845d'));
      // console.log('## non-fungible Token Holder :', await lbd.getNonFungibleHolder('5de7845d', '10000001'));
      // console.log('## non-fungible Token Holder By Index:', await lbd.getNonFungibleHolderByIndex('5de7845d', '10000001', '00000001'));
      // console.log('## non-fungible Token Holder By Index:', await lbd.getNonFungibleHolderByIndex('5de7845d', '10000001', '00000002'));
      

      // console.log('## non-fungible By TokenType :', await lbd.getNonFungibleByTokenType('5de7845d', '10000001'));
      // console.log('## non-fungible By TokenIndex :', await lbd.getNonFungibleByTokenIndex('5de7845d', '10000001', '00000001'));

      // console.log('## Service Wallet :', await lbd.getServiceWallet());
      // console.log('## Service Wallet History:', await lbd.getServiceWalletHistory("tlink1w0wn9ryg2rnj7djqu0zlvxkjpdnqxcnzh8gm05"));
      
      console.log("## this: ", this);
      console.log("## router: ", this.$route);
      const userCode = this.$route.query.code;
      console.log("## userCode: ", userCode);
   }
  }
}
</script>

<style>

</style>