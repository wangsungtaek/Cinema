<template>
<div class="common-layout">
    <el-container>
      <el-header>
        <h1>데이터 추출</h1>
      </el-header>
      
      <el-main></el-main>

      <el-space wrap>
        <!-- Contract ID, Token Type으로 홀더 조회 -->
        <el-card class="box-card customCard" style="height: 400px;">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 보유 홀더 조회</h3>
            </div>
          </template>
          <el-input v-model="contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="fromPage" placeholder="fromPage" class="customInput"/>
          <el-input v-model="toPage" placeholder="toPage" class="customInput"/>
          <div></div>
          <el-button type="primary" @click="getHolders" class="customButton">
            홀더 조회
          </el-button>
          <el-input v-model="currentPage" placeholder="current Page" class="customInput" disabled="true"/>
          <!-- <el-button type="primary" @click="getHolders_2" class="customButton">
            홀더 조회-2
          </el-button> -->
        </el-card>
      </el-space>

    </el-container>
  </div>
</template>

<script>
import LBD from '@/common/js/LBD';
import axios from "axios";

export default {
  data() {
    return {
      contractId: 'f68e7fd5',
      tokenType: '10000001',
      lbd: {},
      fromPage: '1',
      toPage: '30',
      currentPage: '0'
    }
  },

  created() {
    this.lbd = new LBD();
  },

  methods: {
    async getHolders() {

      let result = {};
      let responseData = [];

      let fromPage = this.fromPage;
      let toPage = this.toPage;
      const limit = 50;
      
      const addressArray = [];
      const numberArray = [];

      // 홀더 조회
      for(;fromPage <= toPage; fromPage++) {
        try {
          result = await this.lbd.getItemTokenHolders(this.contractId, this.tokenType, limit, fromPage);
          responseData = result?.responseData;
          this.currentPage = fromPage;
          console.log(responseData);
          // console.log(responseData);
          if(result?.responseData.length == 0) {
            break;
          }
          
          for(let i = 0; i < responseData.length; i++) {
            addressArray.push(responseData[i]?.walletAddress);
            numberArray.push(responseData[i]?.numberOfIndex);
          }
        } catch {
          break;
        }
      }

      console.log('## addressArray: ', addressArray);
      console.log('## numberArray: ', numberArray);

      // csv 헤더 설정
      let row = [];
      const csv = [];

      row.push("address", "numberOfIndex");
      console.log('row', row);
      csv.push(row.join(","));

      // csv 데이터 작성
      for(let i = 0; i < addressArray.length; i++) {
        row = [];
        row.push(addressArray[i], numberArray[i]);
        csv.push(row.join(","));
      }

      this.downloadCSV(csv.join("\n"), this.contractId);

    },

    async getHolders_2() {

      let search_from = 'top'
      let CYCLE = 100;

      for(let i = 0; i <= CYCLE; i++) {
        const result = await axios({ method: 'get', url: `v1/4380402001/item-token-types/f68e7fd5/10000001/holders?size=500&search_from=${search_from}` });
        console.log(result?.data);
      }
    },

    downloadCSV(csv, filename) {
      let csvFile;
      let downloadLink;

      //한글 처리를 해주기 위해 BOM 추가하기
      // const BOM = "\uFEFF";
      // csv = BOM + csv;

      csvFile = new Blob([csv], { type: "text;" });
      downloadLink = document.createElement("a");
      downloadLink.download = filename;
      downloadLink.href = window.URL.createObjectURL(csvFile);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
    },
  }
}
</script>

<style>

</style>