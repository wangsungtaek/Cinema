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
          <el-input v-model="currentPage" placeholder="current Page" class="customInput" :disabled=true />
          <!-- <el-button type="primary" @click="getHolders_2" class="customButton">
            홀더 조회-2
          </el-button> -->
        </el-card>

        <!-- Contract ID, Token Type으로 홀더 조회 -->
        <el-card class="box-card customCard" style="height: 400px;">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 보유 홀더 조회(5/25 update)</h3>
            </div>
          </template>
          <el-input v-model="contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="pageToken" placeholder="pageToken" class="customInput"/>
          <div></div>
          <el-button type="primary" @click="getHoldersNew" class="customButton">
            홀더 조회
          </el-button>
        </el-card>

        <!-- Contract ID, Token Type으로 홀더 조회 -->
        <el-card class="box-card customCard" style="height: 400px; position: relative;">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 보유 홀더 + Meta 데이터</h3>
            </div>
          </template>
          <el-input v-model="contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="startIndex" placeholder="start Index" class="customInput" maxlength="8"/>
          <span class="exStyle" style="bottom: 177px;">Ex) 00000001</span>
          <el-input v-model="endIndex" placeholder="end Index" class="customInput" maxlength="8"/>
          <span class="exStyle" style="bottom: 125px;">Ex) 0000000a</span>
          <div></div>
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group v-model="format" class="ml-4">
              <el-radio label="csv" size="large">.csv</el-radio>
              <el-radio label="txt" size="large">.txt</el-radio>
            </el-radio-group>
          </div>
          <el-button type="primary" @click="getNftHolderByTokenType(contractId, tokenType, startIndex, endIndex)" class="customButton">
            조회
          </el-button>
        </el-card>

        <!-- 시티즌 TOP50 -->
        <el-card class="box-card customCard" style="height: 400px; position: relative;">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >시티즌 TOP 60</h3>
            </div>
          </template>
          <el-input v-model="tokenType" placeholder="tokenType" class="customInput"/>
          <div></div>
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group v-model="format" class="ml-4">
              <el-radio label="csv" size="large">.csv</el-radio>
              <el-radio label="txt" size="large">.txt</el-radio>
            </el-radio-group>
          </div>
          <el-button type="primary" @click="getCitizenRanking(tokenType)" class="customButton">
            조회
          </el-button>
        </el-card>

        <!-- Search NFT by walletaddress -->
        <el-card class="box-card customCard" style="height: 400px; position: relative;">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >Search NFT by Walletaddress</h3>
            </div>
          </template>
          <el-input v-model="walletAddress" placeholder="walletAddress" class="customInput"/>
          <el-input v-model="contractId" placeholder="contractId" class="customInput"/>
          <div></div>
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group v-model="format" class="ml-4">
              <el-radio label="csv" size="large">.csv</el-radio>
              <el-radio label="txt" size="large">.txt</el-radio>
            </el-radio-group>
          </div>
          <el-button type="primary" @click="getNftByAddress()" class="customButton">
            조회
          </el-button>
        </el-card>

        <!-- Search NFT by walletaddress -->
        <el-card class="box-card customCard" style="height: 400px; position: relative;">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 홀더 조회 + Meta data</h3>
            </div>
          </template>
          <el-input v-model="contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="tokenIndex" placeholder="tokenIndex" class="customInput"/>
          <div></div>
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group v-model="format" class="ml-4">
              <el-radio label="csv" size="large">.csv</el-radio>
              <el-radio label="txt" size="large">.txt</el-radio>
            </el-radio-group>
          </div>
          <el-button type="primary" @click="getHolderAndMeta()" class="customButton">
            조회
          </el-button>
        </el-card>

      </el-space>

    </el-container>
  </div>
</template>

<script>
import LBD from '@/common/js/LBD';
import axios from "axios";
import { chain } from 'lodash';
// import { walletAddress } from '../common/js/lbd/header';

export default {
  data() {
    return {
      contractId: 'f68e7fd5',
      tokenType: '10000001',
      tokenIndex: '',
      lbd: {},
      fromPage: '1',
      toPage: '30',
      pageToken: '',
      currentPage: '0',
      startIndex: '',
      endIndex: '',
      format: 'txt',
      walletAddress: ''
    }
  },

  created() {
    this.lbd = new LBD();
  },

  methods: {
    async getHolders() {

      let result = {};
      let responseData = [];

      let fromPage = Number(this.fromPage);
      let toPage = Number(this.toPage);
      console.log(fromPage);
      console.log(toPage);
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

      this.downloadCSV(csv.join("\n"), this.contractId, "");

    },

    async getHoldersNew() {
      
      let result = {};
      let responseData = [];

      const addressArray = [];
      const userIdArray = [];
      const numberArray = [];
      const startPageToken = this.pageToken? this.pageToken : 'first';

      const limit = 50;
      for(let i=0; i<50; i++) {
        try {
          result = await this.lbd.getItemTokenHoldersNew(this.contractId, this.tokenType, limit, this.pageToken);
          this.pageToken = result?.responseData?.nextPageToken;
          responseData = result?.responseData?.list;
          for(let i = 0; i < responseData.length; i++) {
            addressArray.push(responseData[i]?.walletAddress);
            numberArray.push(responseData[i]?.numberOfIndex);
            userIdArray.push(responseData[i]?.userId);
          }
          if(this.pageToken == '' || this.pageToken.length <= 0 || result?.responseData.length == 0) {
            console.log(i);
            break;
          }
        } catch {
          break;
        }
      }
      
      // csv 헤더 설정
      let row = [];
      const csv = [];

      row.push("address", "userId", "numberOfIndex");
      console.log('row', row);
      csv.push(row.join(","));

      // csv 데이터 작성
      for(let i = 0; i < addressArray.length; i++) {
        row = [];
        row.push(addressArray[i], userIdArray[i], numberArray[i]);
        csv.push(row.join(","));
      }
      this.format = 'csv';
      console.log('###startPageToken', startPageToken);
      this.downloadCSV(csv.join("\n"), this.contractId, startPageToken);

    },

    async getHolders_2() {

      let search_from = 'top'
      let CYCLE = 100;

      for(let i = 0; i <= CYCLE; i++) {
        const result = await axios({ method: 'get', url: `v1/4380402001/item-token-types/f68e7fd5/10000001/holders?size=500&search_from=${search_from}` });
        console.log(result?.data);
      }
    },

    async getNftHolderByTokenType(contractId, tokenType, startIndex, endIndex) {
      
      // 반복 횟수
      let startNum = parseInt(startIndex, 16);
      let endNum = parseInt(endIndex, 16);

      if(!contractId || !tokenType || !startIndex || !endIndex) {
        alert(`Input value is missing.Please enter a value.`);
        return;
      }

      if(startNum > endNum) {
        alert(`StartIndex cannot be greater than EndIndex.`);
        return;
      }

      const exportData = await this.getHolderAndMetaData(contractId, tokenType, startNum, endNum);
      if(exportData.length > 1) {
        this.downloadCSV(exportData.join("\n"), contractId, "");
      }
    },

    async getHolderAndMetaData(contractId, tokenType, startNum, endNum) {

      const arrayIndex = [];
      const arrayHoder = [];
      const arrayInfo = [];
      let tokenIndex = '';

      for(let i = startNum; i <= endNum; i++) {
        try {
          tokenIndex = i.toString(16).padStart(8, '0');
          const hoder = await this.lbd.getNonFungibleHolderByIndex(contractId, tokenType, tokenIndex);
          const info = await this.lbd.getNonFungibleByTokenIndex(contractId, tokenType, tokenIndex);

          arrayIndex.push(tokenIndex);
          arrayHoder.push(hoder?.responseData?.walletAddress);
          arrayInfo.push(info?.responseData?.meta);
        } catch {
          alert(`An error occurred while requesting index number "${tokenIndex}".`);
          break;
        }
      }

      let row = [];
      let csv = [];

      row.push("token type", "token index", "address", "meta")
      csv.push(row.join(","));

      for(let i = 0; i < arrayIndex.length; i++) {
        row = [];
        row.push(tokenType, arrayIndex[i], arrayHoder[i], arrayInfo[i])
        csv.push(row.join(","));
      }

      return csv;
    },

    // 시티즌 TOP60 조회
    async getCitizenRanking(tokenType) {
      const contractId = "f68e7fd5";
      const limit = "30";
      let result = [];
      
      const ranking = await this.lbd.getNonFungibleHolder(contractId, tokenType, limit, "1");
      const ranking2 = await this.lbd.getNonFungibleHolder(contractId, tokenType, limit, "2");    
      result = [...ranking.responseData, ...ranking2.responseData];
      
      // Download
      let row = [];
      let csv = [];

      row.push("number", "token type", "address", "numberOfIndex");
      csv.push(row.join(","));

      for(let i = 0; i < result.length; i++) {
        row = [];
        row.push(i+1, tokenType, result[i].walletAddress, result[i].numberOfIndex);
        csv.push(row.join(","));
      }
      this.downloadCSV(csv.join("\n"), contractId, "");
    },

    // 5. Search NFT by Walletaddress
    async getNftByAddress() {
      const walletAddress = this.walletAddress;
      const contract = this.contractId;
      let pageToken = '';
      let during = true;
      const nftList = [];

      try {
        let response = '';
        let data = '';
        
        while(during) {
          response = await this.lbd.getNftByAddress(walletAddress, contract, pageToken);
          data = response?.data;
          pageToken = response?.pageToken;
          if(data !== undefined || data !== null || data.length != 0) {
            nftList.push(...data);
          }

          // while 정지
          if(pageToken == '' || !pageToken || pageToken == undefined || pageToken == undefined) {
            during = false;
          }
        }
      } catch(e) {
        console.log(e);
      }

      // Download
      let row = [];
      let csv = [];

      row.push("token type", "token index");
      csv.push(row.join(","));

      for(let i = 0; i < nftList.length; i++) {
        row = [];
        row.push(nftList[i].tokenType, nftList[i].tokenIndex);
        csv.push(row.join(","));
      }
      this.downloadCSV(csv.join("\n"), "", walletAddress);
      
    },

    // 6. 홀더 및 메타데이터 조회
    async getHolderAndMeta() {
      const contract = this.contractId;
      const tokenType = this.tokenType;
      const tokenIndex = this.tokenIndex;

      const response = await this.lbd.getNonFungibleHolderByIndex(contract, tokenType, tokenIndex, true);
      console.log(response);
      const data = response?.responseData;

      // Download
      let row = [];
      let csv = [];
      
      row.push("Wallet Address", "User Id", "token Id", "meta");
      csv.push(row.join(","));
      row = [data.walletAddress, data.userId, data.tokenId, data.meta];
      csv.push(row.join(","));
      this.downloadCSV(csv.join("\n"), "", data.tokenId);
    },

    downloadCSV(csv, contractId, editFileName) {
      const nowDate = new Date();
      let fileName = '';

      if(editFileName.length >= 0) {
        fileName = editFileName;
      } else {
        fileName = `${nowDate.getFullYear()}${nowDate.getMonth()+1}${nowDate.getDate()}_${nowDate.getHours()}${nowDate.getMinutes()}${nowDate.getSeconds()}_${contractId}`;
      }
      

      let csvFile;
      let downloadLink;

      //한글 처리를 해주기 위해 BOM 추가하기
      // const BOM = "\uFEFF";
      // csv = BOM + csv;
      
      csvFile = new Blob([csv], { type: `${(this.format == 'txt') ? 'text;charset=utf-8' : 'text/csv;charset=utf-8' }` });
      downloadLink = document.createElement("a");
      downloadLink.download = fileName;
      downloadLink.href = window.URL.createObjectURL(csvFile);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
    },
  }
}
</script>

<style>
.exStyle {
  font-size: 13px;
  color: #eb9a9a;
  font-weight: bold;
  text-align: right;
  position: absolute;
  right: 30px;
}
</style>