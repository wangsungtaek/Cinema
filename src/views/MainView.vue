<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>API TEST</h1>
      </el-header>
      
      <el-main></el-main>

      <el-space wrap>
        <!-- 서버 시간 확인 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >서버 시간 확인</h3>
            </div>
          </template>
            <el-button type="primary" @click="getServerTime" class="customButton">
              서버 시간 확인
            </el-button>
            <el-input v-model="serverTime" disabled placeholder="Server Time" class="customInput"/>  
        </el-card>

        <!-- Tx Hash 확인 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >Tx Hash 조회</h3>
            </div>
          </template>
            <el-input v-model="txHash" placeholder="txHash" class="customInput"/>
            <el-button type="primary" @click="getTxHash" class="customButton">
              Tx Hash 확인
            </el-button>
        </el-card>

        <!-- 서비스 토큰 프록시 상태 확인 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >서비스 토큰 프록시 상태 확인</h3>
            </div>
          </template>
          <el-input v-model="serviceTokenProxy.uid" placeholder="UID" class="customInput"/>
          <el-input v-model="serviceTokenProxy.contractId" placeholder="contract ID" class="customInput"/>
          <el-button type="primary" @click="getServiceTokenProxyState" class="customButton">
            서비스 토큰 프록시 상태 확인
          </el-button>
          <el-input v-model="serviceTokenProxy.state" disabled placeholder="contract ID" class="customInput"/>
        </el-card>

        <!-- 서비스 토큰 세션 조회 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >서비스 토큰 세션 조회</h3>
            </div>
          </template>
          <el-input v-model="serviceTokenProxy.uid" placeholder="UID" class="customInput"/>
          <el-input v-model="serviceTokenProxy.contractId" placeholder="contract ID" class="customInput"/>
          <el-button type="primary" @click="getServiceTokenSession" class="customButton">
            서비스 토큰 세션 조회
          </el-button>
          <el-input v-model="serviceTokenProxy.sessionToken" disabled placeholder="Session Token" class="customInput"/>
        </el-card>


        <!-- NFT 세션 조회 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 세션 조회</h3>
            </div>
          </template>
          <el-input v-model="nftProxy.userId" placeholder="UID" class="customInput"/>
          <el-input v-model="nftProxy.contractId" placeholder="contract id" class="customInput"/>
          <el-button type="primary" @click="getNFTSession" class="customButton">
            NFT 세션 조회
          </el-button>
          <el-input v-model="nftProxy.sessionToken" disabled placeholder="Session Token" class="customInput"/>
        </el-card>
        
        <!-- 토큰 세션 상태 확인 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >토큰 세션 상태</h3>
            </div>
          </template>
          <el-input v-model="serviceTokenProxy.sessionToken" placeholder="Session Token" class="customInput"/>
          <el-button type="primary" @click="getServiceTokenSessionState" class="customButton">
            토큰 세션 상태
          </el-button>
          <el-input v-model="serviceTokenProxy.sessionToken" disabled placeholder="Session Token Status" class="customInput"/>
        </el-card>

        <!-- 세션 토큰 커밋 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >세션 토큰 Commit</h3>
            </div>
          </template>
          <el-input v-model="nftProxy.sessionToken" placeholder="Session Token" class="customInput"/>
          <el-button type="primary" @click="sesstionTokenCommit" class="customButton">
            세션 토큰 COMMIT
          </el-button>
        </el-card>

        <!-- 서비스에서 유저에서 서비스 토큰 전송 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >Service Token 전송</h3>
            </div>
          </template>
          <el-input v-model="service.uid" placeholder="UID" class="customInput"/>
          <el-input-number v-model="service.amount" :min="1" :max="100" class="customInput" />
          <el-button type="primary" @click="transferServiceToken" class="customButton">
            Service Token 전송
          </el-button>
        </el-card>

        <!-- 유저가 유저에게 서비스 토큰 전송 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >유저에게 서비스 토큰 전송</h3>
            </div>
          </template>
          <el-input v-model="user.uid" placeholder="UID" class="customInput"/>
          <el-input v-model="user.toAddress" placeholder="toAddress" class="customInput"/>
          <el-input-number v-model="user.amount" :min="1" :max="100" />
          <el-button type="primary" @click="transferDelegatedServiceToken" class="customButton">
            유저에게 서비스 토큰 전송
          </el-button>
        </el-card>

        <!-- NFT 이름 변경 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 이름 변경</h3>
            </div>
          </template>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="nft.tokenIndex" placeholder="tokenIndex" class="customInput"/>
          <el-input v-model="nft.name" placeholder="name" class="customInput"/>
          
          <el-button type="primary" @click="updateNftInfo" class="customButton">
            NFT 이름 변경
          </el-button>
        </el-card>

        <!-- NFT 보유자 조회 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 보유자 조회</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contract ID" class="customInput"/>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          
          <el-button type="primary" @click="getNftHolder" class="customButton">
            NFT 보유자 조회
          </el-button>
        </el-card>

        <!-- NFT 홀더 조회 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 홀더 조회</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contract ID" class="customInput"/>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="nft.tokenIndex" placeholder="tokenIndex" class="customInput"/>
          
          <el-button type="primary" @click="getNftHolderByIndex" class="customButton">
            NFT 홀더 조회
          </el-button>
        </el-card>

        <!-- NFT 정보 조회 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 정보 조회</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contract ID" class="customInput"/>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="nft.tokenIndex" placeholder="tokenIndex" class="customInput"/>
          
          <el-button type="primary" @click="getNftInfoByIndex" class="customButton">
            NFT 정보 조회
          </el-button>
        </el-card>

        <!-- NFT 여러 홀더 조회 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 여러 홀더 조회 및 csv 저장</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contract ID" class="customInput"/>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          
          <el-button type="primary" @click="getNftHolderByTokenType" class="customButton">
            NFT 여러 홀더 조회 및 csv 저장
          </el-button>
          <el-button type="primary" @click="getNftHolderByTokenType2" class="customButton">
            나누어 저장
          </el-button>
        </el-card>

        <!-- NFT 민트 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 민트</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contract ID" class="customInput"/>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="nft.toAddress" placeholder="toAddress" class="customInput"/>
          <el-input v-model="nft.name" placeholder="name" class="customInput"/>
          
          <el-button type="primary" @click="mintNFT" class="customButton">
            NFT 민트
          </el-button>
        </el-card>

        <!-- 유저의 NFT조회 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >유저 NFT조회</h3>
            </div>
          </template>
          <el-input v-model="nft.userId" placeholder="userId" class="customInput"/>
          <el-input v-model="nft.contractId" placeholder="contractId" class="customInput"/>
          
          <el-button type="primary" @click="getUserItemToken" class="customButton">
            유저 NFT조회
          </el-button>
        </el-card>

        <!-- NFT 썸네일 업데이트 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 썸네일 업데이트</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contractId" class="customInput"/>
          
          <el-button type="primary" @click="updateThumbnails" class="customButton">
            NFT 썸네일 업데이트
          </el-button>
        </el-card>

        <!-- NFT 썸네일 업데이트 확인 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 썸네일 업데이트 확인</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="nft.requestId" placeholder="requestId" class="customInput"/>
          
          <el-button type="primary" @click="getThumbnailsUpdateState" class="customButton">
            NFT 썸네일 업데이트 확인
          </el-button>
        </el-card>

        <!-- DOSI Wallet 연동 -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >DOSI Wallet 연동</h3>
            </div>
          </template>
          
          <el-button type="primary" @click="connectDosiWallet" class="customButton">
            DOSI Wallet 연동
          </el-button>
        </el-card>

        <!-- NFT Issue -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT Issue</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="nft.name" placeholder="name" class="customInput"/>
          <el-input v-model="nft.meta" placeholder="meta" class="customInput"/>
          
          <el-button type="primary" @click="issueNFT" class="customButton">
            NFT Issue
          </el-button>
        </el-card>
        <!-- NFT Issue -->
        <el-card class="box-card customCard">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT Burn</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="nft.tokenIndex" placeholder="tokenIndex" class="customInput"/>
          <el-input v-model="nft.fromAddress" placeholder="fromAddress" class="customInput"/>
          
          <el-button type="primary" @click="burnNFT" class="customButton">
            NFT Burn
          </el-button>
        </el-card>

        <!-- NFT Transfer -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT Transfer</h3>
            </div>
          </template>
          <el-input v-model="nft.userId" placeholder="userId" class="customInput"/>
          <el-input v-model="nft.contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="nft.tokenIndex" placeholder="tokenIndex" class="customInput"/>
          <el-input v-model="nft.toAddress" placeholder="toAddress" class="customInput"/>
          
          <el-button type="primary" @click="transferNFT" class="customButton">
            NFT Transfer
          </el-button>
        </el-card>

        <!-- so Wallet NFT Transfer -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >So Wallet NFT Transfer</h3>
            </div>
          </template>
          <el-input v-model="nft.soWalletAddress" placeholder="soWalletAddress" class="customInput"/>
          <el-input v-model="nft.contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="nft.tokenIndex" placeholder="tokenIndex" class="customInput"/>
          <el-input v-model="nft.toAddress" placeholder="toAddress" class="customInput"/>
          
          <el-button type="primary" @click="soWalletTransferNFT" class="customButton">
            So Wallet NFT Transfer
          </el-button>
        </el-card>

        <!-- so Wallet NFT Transfer -->
          <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >NFT 결합</h3>
            </div>
          </template>
          <el-input v-model="nft.contractId" placeholder="contractId" class="customInput"/>
          <el-input v-model="nft.tokenType" placeholder="tokenType" class="customInput"/>
          <el-input v-model="nft.tokenIndex" placeholder="tokenIndex" class="customInput"/>
          <el-input v-model="nft.parentTokenId" placeholder="parentTokenId" class="customInput"/>
          <el-input v-model="nft.tokenHolderAddress" placeholder="tokenHolderAddress" class="customInput"/>
          
          <el-button type="primary" @click="attachNFT" class="customButton">
            attachNFT
          </el-button>
        </el-card>

        <!-- so Wallet NFT Transfer -->
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <h3 style="margin: 0px" >W300/f300</h3>
            </div>
          </template>
          <div style="background: gray;">
            <img src="https://lbw-impro.line-apps.com/v1/daphne/token/6d91a2c8/1000000100000001"/>
            <img src="https://lbw-impro.line-apps.com/v1/daphne/token/6d91a2c8/1000000100000001/w300"/>
            <img src="https://lbw-impro.line-apps.com/v1/daphne/token/6d91a2c8/1000000100000001/f300"/>
            <img src="https://lbw-impro.line-apps.com/v1/daphne/token/6d91a2c8/1000000100000001/i260"/>
          </div>
          
        </el-card>
        

      </el-space>

    </el-container>
  </div>
</template>

<script>
import LBD from '@/common/js/LBD';
import { forEach } from 'lodash';

export default {
  name: 'MainView',

  data() {
    return {
      lbd: {},
      serverTime: '',
      txHash: '',
      serviceTokenProxy: {
        uid: '',
        contractId: '',
        sessionToken: '',
        state: '',
      },
      nftProxy: {
        userId: '',
        contractId: '',
        sessionToken: '',
        state: ''
      },
      service: {
        uid: '',
        amount: 0,
      },
      user: {
        uid: '',
        toAddress: '',
        amount: 0
      },
      nft: {
        contractId: '',
        tokenType: '',
        tokenIndex: '',
        toAddress: '',
        name: '',
        userId: '',
        requestId: '',
        parentTokenId: '',
        tokenHolderAddress: '',
        fromAddress: ''
      },
    }
  },

  created() {
    this.lbd = new LBD();
    this.testAPI();
  },


  methods: {
    // 서버 타임 조회
    async getServerTime() {
      const response = await this.lbd.getTime();
      console.log(response);
      this.serverTime = response?.responseTime;
      

      // var myHeaders = new Headers();
      // myHeaders.append("service-api-key", "76e4f075-a0bc-47ab-a29f-bff360e176fa");

      // var requestOptions = {
      //   method: 'GET',
      //   headers: myHeaders,
      // };
      
      // fetch("/v1/time", requestOptions)
      //   .then(response => response.text())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
    },
    // 해시 조회
    async getTxHash() {
      const response = await this.lbd.getTxHash(this.txHash);
      console.log(response);
    },

    async testAPI() {

      console.log('--------');
      // console.log('## time : ', await lbd.getTime());
      // console.log('## transaction :', await lbd.getTransaction('E74124E59B03AD1F912B10C04711755B47E33FEDACB096C63A58B69580C98B7F'));

      // console.log('## Service :', await this.lbd.getService('3e08fa95-1274-4ec8-89d7-676ec1a61fda'));

      // console.log('## updateNftMediaResources :', await this.lbd.updateNftMediaResources('5de7845d'));

      
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

      // console.log('## User Info - 1:', await lbd.getUserInfo("U0e15799fc3b13d394670819ce262a63a"));
      // console.log('## User Info - 2:', await lbd.getUserInfo("U74620af5294ced63dc9a5659c18c4b24"));
      // console.log('## User Info - 3:', await lbd.getUserInfo("Ue9611f00d2bc6ee84637e48d8889138d"));
      // console.log('## User Base Coin:', await lbd.getUserBaseCoin("U74620af5294ced63dc9a5659c18c4b24"));
      // console.log('## User Service Token:', await lbd.getUserServiceToken("U74620af5294ced63dc9a5659c18c4b24"));
      // console.log('## mint', await lbd.mintNFT("5de7845d", "10000002", "U74620af5294ced63dc9a5659c18c4b24"));
      // let i = 0;
      // for(i = 0; i < 10_000; i++) {
      //   console.log(`${i} _ ## User Item Token:`, await this.lbd.getUserItemToken("U74620af5294ced63dc9a5659c18c4b24", "5de7845d"));
      // }
      // let i = 9400;
      // const test = setInterval(async () => {
      //   try {
      //     console.log(`${i} _ ## User Item Token:`, await this.lbd.getUserItemToken("U74620af5294ced63dc9a5659c18c4b24", "5de7845d"));
      //     i++;
      //   } catch {
      //     console.log(1);
      //     clearInterval(test);
      //   }
      // }, 200);

      // let i = 0;
      // while(true) {
      //   console.log(`${i} _ ## User Item Token:`, await this.lbd.getUserItemToken("U74620af5294ced63dc9a5659c18c4b24", "5de7845d"));
      //   i++;
      //   if(i > 10000) {
      //     return;
      //   }
      // }

      // console.log('## User Service Token Proxy State:', await lbd.getUserServiceTokenProxyState("U74620af5294ced63dc9a5659c18c4b24", "9990f166"));
      // console.log('## Trans Service Token:', await lbd.transServiceToken("U74620af5294ced63dc9a5659c18c4b24", "9990f166"));
      // console.log('## set Service Token Proxy:', await lbd.setUserServiceTokenProxy("U74620af5294ced63dc9a5659c18c4b24", "9990f166"));
      
      // console.log("## this: ", this);
      // console.log("## router: ", this.$route);
      // const userCode = this.$route.query.code;
      // console.log("## userCode: ", userCode);
   },

   async transferServiceToken() {
      if(!this.service.uid) {
        alert("uid를 입력하세요");
      }
      console.log('## transferServiceToken: ', await this.lbd.transferServiceToken(this.service.uid, this.service.amount.toString()));
    },


    async transferDelegatedServiceToken() {
      console.log(this.user.uid);
      console.log(this.user.toAddress);
      console.log(this.user.amount);
      console.log(this.lbd);
      console.log('## transferDelegatedServiceToken: ', await this.lbd.transferDelegatedServiceToken(this.user.uid, this.user.toAddress, this.user.amount.toString()));
    },

    // 서비스 토큰 프록시 확인
    async getServiceTokenProxyState() {
      console.log(this.serviceTokenProxy.uid);
      console.log(this.serviceTokenProxy.contractId);

      const response = await this.lbd.getUserServiceTokenProxyState(this.serviceTokenProxy.uid, this.serviceTokenProxy.contractId);
      const isApproved = response?.responseData?.isApproved;
      this.serviceTokenProxy.state = isApproved;

    },

    // 서비스 토큰 세션 조회
    async getServiceTokenSession() {

      // 서비스 토큰 세션 조회
      const response = await this.lbd.getServiceTokenSession(this.serviceTokenProxy.uid, this.serviceTokenProxy.contractId);
      const sessionToken = response?.responseData?.requestSessionToken;
      console.log('## getServiceTokenSession: ', sessionToken);
      this.serviceTokenProxy.sessionToken = sessionToken;
      
      
    },

    // 서비스 토큰 세션 상태 조회
    async getServiceTokenSessionState() {

      // 서비스 토큰 세션 상태 조회
      let response = await this.lbd.getServiceTokenSessionState(this.serviceTokenProxy.sessionToken);
      const status = response?.responseData?.status;
      console.log('## getServiceTokenProxyState: ', status);

      // if(status != 'Authorized') {
      //   return
      // }

      // // // 서비스 토큰 세션 커밋
      // response = await this.lbd.commitServiceTokenSession(this.serviceTokenProxy.sessionToken);
      // console.log('## commitServiceTokenSession: ', response);
    },

    // NFT 세션 조회
    async getNFTSession() {
      const userId = this.nftProxy.userId;
      const contractId = this.nftProxy.contractId;

      const response = await this.lbd.getNFTSession(userId, contractId);
      const sessionToken = response?.responseData?.requestSessionToken
      this.nftProxy.sessionToken = sessionToken;
    },

    async sesstionTokenCommit() {
      const sesstionToken = this.nftProxy.sessionToken;
      const response = await this.lbd.commitSessionToken(sesstionToken);
      console.log(response);
    },
    
    // NFT 이름 변경
    async updateNftInfo() {
      const contractId = '5de7845d';
      const tokenType = this.nft.tokenType;
      const tokenIndex = this.nft.tokenIndex;
      const name = this.nft.name;

      const response = await this.lbd.updateNftInfo(contractId, tokenType, tokenIndex, name);
      console.log('## updateNftInfo: ', response);
    },

    // NFT 보유자 조회
    async getNftHolder() {
      const contractId = this.nft.contractId;
      const tokenType = this.nft.tokenType;

      const response = await this.lbd.getNonFungibleHolder(contractId, tokenType);
      console.log(response);
    },

    // NFT 홀더 조회
    async getNftHolderByIndex() {
      const contractId = this.nft.contractId;
      const tokenType = this.nft.tokenType;
      const tokenIndex = this.nft.tokenIndex;

      const response = await this.lbd.getNonFungibleHolderByIndex(contractId, tokenType, tokenIndex);
      console.log(response);
    },

    // NFT 인덱스 별 정보 조회
    async getNftInfoByIndex() {
      const contractId = this.nft.contractId;
      const tokenType = this.nft.tokenType;
      const tokenIndex = this.nft.tokenIndex;

      const response = await this.lbd.getNonFungibleByTokenIndex(contractId, tokenType, tokenIndex);
      console.log(response);
    },

    // 토큰 결합
    async attachNFT() {
      const contractId = this.nft.contractId;
      const tokenType = this.nft.tokenType;
      const tokenIndex = this.nft.tokenIndex;
      const parentTokenId = this.nft.parentTokenId;
      const tokenHolderAddress = this.nft.tokenHolderAddress;

      const response = await this.lbd.attachNFT(contractId, tokenType, tokenIndex, parentTokenId, tokenHolderAddress);
      console.log(response);
    },

    async getNftHolderByTokenType() {
      const contractId = this.nft.contractId;
      const tokenType = this.nft.tokenType;

      let isEnd = true;
      let number = 488;
      let tokenIndex = '';

      let csv = [];
      let row = [];
      let arrayIndex = [];
      let arrayMeta = [];
      let arrayHoder = [];

      while(isEnd) {
        try {
          tokenIndex = number.toString(16).padStart(8, '0');
          const hoder = await this.lbd.getNonFungibleHolderByIndex(contractId, tokenType, tokenIndex);
          const info = await this.lbd.getNonFungibleByTokenIndex(contractId, tokenType, tokenIndex);
          console.log(info);
          console.log(tokenIndex);

          arrayIndex.push(tokenIndex);
          arrayHoder.push(hoder.responseData.walletAddress);
          arrayMeta.push(info.responseData.meta);

          number++;
        } catch {
          isEnd = false;
        }
      }
      
      console.log(arrayIndex);
      // console.log(arrayMeta);
      console.log(arrayHoder);
      row.push(
        // "token type",
        "token index",
        "address",
        "meta"
      )

      csv.push(row.join(","));
      console.log('1111', arrayIndex.length);

      for(let i=0; i < arrayIndex.length; i++) {
        row = [];
        row.push(
          // tokenType,
          arrayIndex[i],
          arrayHoder[i],
          arrayMeta[i]
        )
        csv.push(row.join(","));
      }
      console.log('1233123: ', csv);
      this.downloadCSV(csv.join("\n"), "10000001");

    },
    async getNftHolderByTokenType2() {
      const contractId = '298fd7f4';
      const tokenType = '10000004';

      let from = 1;
      let to = 2;

      let arrayIndex = [];
      let arrayHoder = [];
      // let arrayInfo = [];
      let tokenIndex = '';

      let csv = [];
      let row = [];

      let meta = {};

      for(; from <= to; from++) {
        try {
          tokenIndex = from.toString(16).padStart(8, '0');
          const hoder = await this.lbd.getNonFungibleHolderByIndex(contractId, tokenType, tokenIndex);
          // const info = await this.lbd.getNonFungibleByTokenIndex(contractId, tokenType, tokenIndex);
          console.log(tokenIndex);

          // meta = JSON.parse(info.responseData.meta);
          arrayIndex.push(tokenIndex);
          arrayHoder.push(hoder.responseData.walletAddress);
          // arrayInfo.push(meta?.Camp);
        } catch {
          break;
        }
      }
      
      console.log(arrayHoder);
      row.push(
        "token type",
        "token index",
        "address",
        // "Camp",
      )

      csv.push(row.join(","));
      console.log('1111', arrayIndex.length);

      for(let i=0; i < arrayIndex.length; i++) {
        row = [];
        row.push(
          tokenType,
          arrayIndex[i],
          arrayHoder[i],
          // arrayInfo[i],
        )
        csv.push(row.join(","));
      }
      console.log('1233123: ', csv);
      this.downloadCSV(csv.join("\n"), "10000001");
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

    // NFT 민트
    async mintNFT() {
      const contractId = this.nft.contractId;
      const tokenType = this.nft.tokenType;
      const toAddress = this.nft.toAddress;
      const name = this.nft.name;
      
      const response = await this.lbd.mintNFT(contractId, tokenType, toAddress, name);
      console.log(response);

    },

    // NFT 조회
    async getUserItemToken() {
      const userId = this.nft.userId;
      const contractId = this.nft.contractId;
      
      const response = await this.lbd.getUserItemToken(userId, contractId);
      console.log(response);

    },

    // NFT 썸네일 업데이트
    async updateThumbnails() {
      const contractId = this.nft.contractId;
      
      const response = await this.lbd.updateNftThumbnails(contractId);
      console.log(response);
    },

    // NFT 썸네일 업데이트 확인
    async getThumbnailsUpdateState() {
      const contractId = this.nft.contractId;
      const requestId = this.nft.requestId;
      
      const response = await this.lbd.getThumbnailsUpdateState(contractId, requestId);
      console.log(response);
    },

    // DOSI Wallet 연결
    async connectDosiWallet() {
      
    },
    async issueNFT() {
      const contractId = this.nft.contractId;
      const name = this.nft.name;
      const meta = this.nft.meta;
      
      for(let i=0; i<200; i++) {
        const response = await this.lbd.issueNFT(contractId, name, meta);
        console.log(response);
      }
    },

    // NFT 소각
    async burnNFT() {
      const contractId = this.nft.contractId;
      const tokenType = this.nft.tokenType;
      const tokenIndex = this.nft.tokenIndex;
      const fromAddress = this.nft.fromAddress;

      const response = await this.lbd.burnNFT(contractId, tokenType, tokenIndex, fromAddress);
      console.log(response);
    },

    // NFT 전송
    async transferNFT() {

      const pathParam = {
        userId: this.nft.userId,
        contractId: this.nft.contractId,
        tokenType: this.nft.tokenType,
        tokenIndex: this.nft.tokenIndex,
        toAddress: this.nft.toAddress
      }
      
      const response = await this.lbd.transferNFT(pathParam);
      console.log(response);
    },

    // 서비스 월렛의 NFT를 전송
    async soWalletTransferNFT() {
      const pathParam = {
        soWalletAddress: this.nft.soWalletAddress,
        contractId: this.nft.contractId,
        tokenType: this.nft.tokenType,
        tokenIndex: this.nft.tokenIndex,
        toAddress: this.nft.toAddress
      }
      console.log(pathParam);
      const response = await this.lbd.soWalletTransferNFT(pathParam);
      console.log(response);
    }

  }
}
</script>