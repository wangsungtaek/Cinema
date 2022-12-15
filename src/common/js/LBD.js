import api from './myGlobal';
import axios from "axios";
import SignatureGenerator from "./lbd/signature";
import { generateRandomString } from './lbd/randomStr.js';
import { walletAddress, apiKey, apiSecret } from './lbd/header.js';

class LBD {

  constructor() {

  }

  /*******************************************************************************
   * FUNCTION 명 : getTime()
   * FUNCTION 기능설명 : Server Time 조회
  *******************************************************************************/
  async getTime() {
    const path = `/v1/time`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  };

  /*******************************************************************************
   * FUNCTION 명 : getTransaction()
   * FUNCTION 기능설명 : 시간 조회
  *******************************************************************************/
  async getTransaction(txHash) {
    const path = `/v1/transactions/${txHash}`;
    const timeStamp = await this.getTimeStamp();
    const nonce = this.getNonce();

    // Signature 생성
    const signature = SignatureGenerator.signature(
        apiSecret
      , 'GET'
      , path
      , timeStamp
      , nonce
    );

    // api header 정보

    const headers = {
      'service-api-key': apiKey,
      'nonce': nonce,
      'timestamp': timeStamp,
      'signature': signature
    }

    return (await axios({
      method: 'get',
      url: path,
      headers: headers
    }).catch(e => {
      console.log(e);
    })).data;
  }

  /*******************************************************************************
   * FUNCTION 명 : getService()
   * FUNCTION 기능설명 : 서비스 조회
  *******************************************************************************/
   async getService(serviceId) {
    const path = `/v1/services/${serviceId}`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }

  /*******************************************************************************
   * FUNCTION 명 : getServiceToken()
   * FUNCTION 기능설명 : 서비스 토근 조회
  *******************************************************************************/
   async getServiceToken() {
    const path = `/v1/service-tokens`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }

  /*******************************************************************************
   * FUNCTION 명 : getServiceTokenBycontractId()
   * FUNCTION 기능설명 : contractId로 서비스 토근 조회
  *******************************************************************************/
  async getServiceTokenBycontractId(contractId) {
    const path = `/v1/service-tokens/${contractId}`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }

  /*******************************************************************************
   * FUNCTION 명 : getServiceTokenHolderBycontractId()
   * FUNCTION 기능설명 : contractId로 서비스 토근 홀더 조회
  *******************************************************************************/
  async getServiceTokenHolderBycontractId(contractId) {
    const path = `/v1/service-tokens/${contractId}/holders`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }

  /*******************************************************************************
   * FUNCTION 명 : getItemToken()
   * FUNCTION 기능설명 : Item Token 조회
  *******************************************************************************/
  async getItemToken(contractId) {
    const path = `/v1/item-tokens/${contractId}`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getFungibleList()
   * FUNCTION 기능설명 : Fungible 전체 조회
  *******************************************************************************/
   async getFungibleList(contractId) {
    const path = `/v1/item-tokens/${contractId}/fungibles`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getNonFungibleList()
   * FUNCTION 기능설명 : NonFungible 전체 조회
  *******************************************************************************/
   async getNonFungibleList(contractId) {
    const path = `/v1/item-tokens/${contractId}/non-fungibles`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getNonFungibleByTokenType()
   * FUNCTION 기능설명 : tokenType으로 NonFungible 조회
  *******************************************************************************/
   async getNonFungibleByTokenType(contractId, tokenType) {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getNonFungibleByTokenIndex()
   * FUNCTION 기능설명 : TokenIndex으로 NonFungible 조회
  *******************************************************************************/
   async getNonFungibleByTokenIndex(contractId, tokenType, tokenIndex) {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getNonFungibleHolder()
   * FUNCTION 기능설명 : NonFungible 사용자 조회
  *******************************************************************************/
  async getNonFungibleHolder(contractId, tokenType) {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/holders`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getNonFungibleHolderByIndex()
   * FUNCTION 기능설명 : TokenIdex로 NonFungible 사용자 조회
  *******************************************************************************/
  async getNonFungibleHolderByIndex(contractId, tokenType, tokenIndex) {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}/holder`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getServiceWallet()
   * FUNCTION 기능설명 : Service Wallet 조회
  *******************************************************************************/
  async getServiceWallet() {
    const path = `/v1/wallets`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getServiceWalletHistory()
   * FUNCTION 기능설명 : Service Wallet History 조회
  *******************************************************************************/
  async getServiceWalletHistory(walletAddress) {
    const path = `/v1/wallets/${walletAddress}/transactions`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }

  /*************************************************************************************************************************
    Item Token 조회 관련
  *************************************************************************************************************************/
  /*******************************************************************************
   * FUNCTION 명 : getItemTokenHolders()
   * FUNCTION 기능설명 : Contract Id, Token Type을 통한 홀더들 조회
  *******************************************************************************/
  async getItemTokenHolders(contractId, tokenType, limit, page) {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/holders`;

    const query_param = {
      'limit': limit + '',
      'orderBy': 'desc',
      'page': page + ''
    }
    const { timestamp, nonce, signature } = await this.getSignature('GET', path, query_param);
    const headers = this.getHeader(nonce, timestamp, signature);
    
    return await api(path, 'GET', headers, query_param);
  }

  /*************************************************************************************************************************
    User 조회 관련
  *************************************************************************************************************************/

  /*******************************************************************************
   * FUNCTION 명 : getUserInfo()
   * FUNCTION 기능설명 : 사용자 정보 조회
  *******************************************************************************/
   async getUserInfo(userId) {
    const path = `/v1/users/${userId}`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getUserBaseCoin()
   * FUNCTION 기능설명 : 사용자 TC 조회
  *******************************************************************************/
   async getUserBaseCoin(userId) {
    const path = `/v1/users/${userId}/base-coin`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getUserServiceToken()
   * FUNCTION 기능설명 : 사용자 Service Token 조회
  *******************************************************************************/
   async getUserServiceToken(userId) {
    const path = `/v1/users/${userId}/service-tokens`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : getUserItemToken()
   * FUNCTION 기능설명 : 사용자 Item Token 조회
  *******************************************************************************/
   async getUserItemToken(userId, contractId) {
    const path = `/v1/users/${userId}/item-tokens/${contractId}/non-fungibles`;
    
    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }
  /*******************************************************************************
   * FUNCTION 명 : mintNFT()
   * FUNCTION 기능설명 : NFT 민팅
  *******************************************************************************/
  async mintNFT(contractId, tokenType, toAddress, name) {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/mint`;
    
    const body = {
      'ownerAddress': 'tlink186xnynpa2l6d9lhez9rzujdrf6g63t3ltl9874',
      'ownerSecret': 'ewVaF3WviV6GPET6gmpYG+AzaVDJsbtvcu454mKjoJ8=',
      'toAddress': toAddress,
      'name': name
    }
    const { timestamp, nonce, signature } = await this.getSignature('POST', path, {}, body);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'POST', headers, null, body);
  }
  /*******************************************************************************
   * FUNCTION 명 : getUserServiceTokenProxyState()
   * FUNCTION 기능설명 : 사용자 Service Token 프록시 상태 조회
  *******************************************************************************/
  async getUserServiceTokenProxyState(userId, contractId) { 
    const path = `/v1/users/${userId}/service-tokens/${contractId}/proxy`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers);
  }

  
  /*******************************************************************************
   * FUNCTION 명 : getServiceTokenSession()
   * FUNCTION 기능설명 : Service Token 세션 토큰 확인
  *******************************************************************************/
  async getServiceTokenSession(userId, contractId) {
    const path = `/v1/users/${userId}/service-tokens/${contractId}/request-proxy?requestType=aoa`;

    const request_body = {
      'ownerAddress': "tlink1w0wn9ryg2rnj7djqu0zlvxkjpdnqxcnzh8gm05",
    }
    const { timestamp, nonce, signature } = await this.getSignature('POST', path, {}, request_body);
    const headers = {
      ...this.getHeader(nonce, timestamp, signature),
      'Content-Type': 'application/json'
    };
    
    return await api(path, 'POST', headers, null, request_body);
  }

  /*******************************************************************************
   * FUNCTION 명 : getServiceTokenSessionState()
   * FUNCTION 기능설명 : Service Token 세션 토큰 상태 확인
  *******************************************************************************/
  async getServiceTokenSessionState(requestSessionToken) { 
    const path = `/v1/user-requests/${requestSessionToken}`;
  
    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);
  
    return await api(path, 'GET', headers);
  }

  /*******************************************************************************
   * FUNCTION 명 : commitServiceTokenSession()
   * FUNCTION 기능설명 : Service Token 세션 토큰 커밋
  *******************************************************************************/
  async commitServiceTokenSession(requestSessionToken) {
      const path = `/v1/user-requests/${requestSessionToken}/commit`;
  
      const { timestamp, nonce, signature } = await this.getSignature('POST', path, {}, {});
      const headers = this.getHeader(nonce, timestamp, signature);
      
      return await api(path, 'POST', headers, null, null);
  }

  /*************************************************************************************************************************
    User 전송 관련
  *************************************************************************************************************************/

  /*******************************************************************************
   * FUNCTION 명 : transServiceToken()
   * FUNCTION 기능설명 : Service Token 전송
  *******************************************************************************/
  async transServiceToken(userId, contractId) {
    const path = `/v1/users/${userId}/service-tokens/${contractId}/transfer`;

    const { timestamp, nonce, signature } = await this.getSignature('POST', path);
    const headers = this.getHeader(nonce, timestamp, signature);
    const body = {
      ownerAddress: "tlink1w0wn9ryg2rnj7djqu0zlvxkjpdnqxcnzh8gm05",
      ownerSecret: "knA4KnaHI+cTCatD8kWHBC9WvygjpbE8+sNgaLmzXds=",
      toUserId: "U0e15799fc3b13d394670819ce262a63a",
      amount: "1"
    }

    return await api(path, 'POST', headers, null, body);
  }



  /*******************************************************************************
   * FUNCTION 명 : Transfer service tokens()
   * FUNCTION 기능설명 : Service Token 전송
  *******************************************************************************/
  async transferServiceToken(toUID, amount) {
    const walletAddress = 'tlink1w0wn9ryg2rnj7djqu0zlvxkjpdnqxcnzh8gm05';
    const contractId = '3e942bd7';
    const resultAmount = amount * 1_000_000;

    const path = `/v1/wallets/${walletAddress}/service-tokens/${contractId}/transfer`;
    console.log(toUID, amount);
    const body = {
      'walletSecret': 'knA4KnaHI+cTCatD8kWHBC9WvygjpbE8+sNgaLmzXds=',
      'toUserId': toUID,
      'amount': resultAmount + '',
    }
    const { timestamp, nonce, signature } = await this.getSignature('POST', path, {}, body);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'POST', headers, null, body);
  }
  
  /*******************************************************************************
   * FUNCTION 명 : transferDelegatedServiceToken()
   * FUNCTION 기능설명 : 위임된 서비스 토큰 전송(사용자 지갑)
  *******************************************************************************/
   async transferDelegatedServiceToken(fromUID, toAddress, amount) {
    const contractId = '3e942bd7';
    const resultAmount = amount * 1_000_000;

    const path = `/v1/users/${fromUID}/service-tokens/${contractId}/transfer`;
    const body = {
      'ownerAddress': 'tlink1w0wn9ryg2rnj7djqu0zlvxkjpdnqxcnzh8gm05',
      'ownerSecret': 'knA4KnaHI+cTCatD8kWHBC9WvygjpbE8+sNgaLmzXds=',
      'toAddress': toAddress,
      'amount': resultAmount + '',
    }
    const { timestamp, nonce, signature } = await this.getSignature('POST', path, {}, body);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'POST', headers, null, body);
  }


  /*******************************************************************************
   * FUNCTION 명 : updateNftInfo()
   * FUNCTION 기능설명 : NFT 정보 수정
  *******************************************************************************/
   async updateNftInfo(contractId, tokenType, tokenIndex, name) {

    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;
    
    const body = {
      'name': name,
      'meta': '{"🍭test": "1112"}',
      'ownerAddress': 'tlink1w0wn9ryg2rnj7djqu0zlvxkjpdnqxcnzh8gm05',
      'ownerSecret': 'knA4KnaHI+cTCatD8kWHBC9WvygjpbE8+sNgaLmzXds='
    }
    const { timestamp, nonce, signature } = await this.getSignature('PUT', path, {}, body);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'PUT', headers, null, body);
  }
  /*******************************************************************************
   * FUNCTION 명 : updateNftMediaResources()
   * FUNCTION 기능설명 : NFT 미디어 리소스 수정
  *******************************************************************************/
   async updateNftMediaResources(contractId) {

    const path = `/v1/item-tokens/${contractId}/non-fungibles/media-resources`;
    
    const body = {
      'updateList': [
        {
          'tokenType': '10000001',
          'tokenIndex': '00000001'
        },
        {
          'tokenType': '10000001',
          'tokenIndex': '00000002'
        }
      ],
    }
    const { timestamp, nonce, signature } = await this.getSignature('PUT', path, {}, body);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'PUT', headers, null, body);
  }

  /*******************************************************************************
    * FUNCTION 명 : updateNftThumbnails()
    * FUNCTION 기능설명 : 썸네일 업데이트 요청
  *******************************************************************************/
  async updateNftThumbnails(contractId) {

    const path = `/v1/item-tokens/${contractId}/fungibles/thumbnails`;
    
    const body = {
      'updateList': [
        {
          'tokenType': '10000099',
          'tokenIndex': '00000001' 
        },
        {
          'tokenType': '10000099',
          'tokenIndex': '00000002' 
        }
      ]
    }
    const { timestamp, nonce, signature } = await this.getSignature('PUT', path, {}, body);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'PUT', headers, null, body);
  }

  /*******************************************************************************
    * FUNCTION 명 : getThumbnailsUpdateState()
    * FUNCTION 기능설명 : 썸네일 업데이트 상태 확인
  *******************************************************************************/
   async getThumbnailsUpdateState(contractId, requestId) {

    const path = `/v1/item-tokens/${contractId}/fungibles/thumbnails/${requestId}/status`;
    
    const body = {}

    const { timestamp, nonce, signature } = await this.getSignature('GET', path, {}, body);
    const headers = this.getHeader(nonce, timestamp, signature);

    return await api(path, 'GET', headers, null, body);
  }

  
  /*************************************************************************************************************************
    ETC
  *************************************************************************************************************************/

  /*******************************************************************************
   * FUNCTION 명 : getSignature()
   * FUNCTION 기능설명 : Signature 생성
  *******************************************************************************/
  async getSignature(method, path, params, body) {
    const timestamp = await this.getTimeStamp();
    const nonce = this.getNonce();
    const signature = SignatureGenerator.signature(
        apiSecret
      , method
      , path
      , timestamp
      , nonce
      , params
      , body
    );

    return {
      timestamp,
      nonce,
      signature
    }
  }

  /*******************************************************************************
   * FUNCTION 명 : getHeader()
   * FUNCTION 기능설명 : Signature 생성
  *******************************************************************************/
  getHeader(nonce, timestamp, signature) {
    return {
      'service-api-key': apiKey,
      nonce,
      timestamp,
      signature
    }
  }

  /*******************************************************************************
   * FUNCTION 명 : getTimeStamp()
   * FUNCTION 기능설명 : 타임스탬프 조회
  *******************************************************************************/
  async getTimeStamp() {
    // const response = await axios.get(`/v1/time`, { headers: { 'service-api-key': apiKey } })
    // const timeStamp = response.data.responseTime;
    const timeStamp = Date.now();
    return timeStamp;
  }

  /*******************************************************************************
   * FUNCTION 명 : getNonce()
   * FUNCTION 기능설명 : Nonce 조회
  *******************************************************************************/
  getNonce() {
    return generateRandomString(8);
  }
  
}

export default LBD;