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

    const response = await axios.get(path, { headers: headers });
    return response.data;
  }
  /*******************************************************************************
   * FUNCTION 명 : getNonFungibleByTokenIndex()
   * FUNCTION 기능설명 : TokenIndex으로 NonFungible 조회
  *******************************************************************************/
   async getNonFungibleByTokenIndex(contractId, tokenType, tokenIndex) {
    const path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/${tokenIndex}`;

    const { timestamp, nonce, signature } = await this.getSignature('GET', path);
    const headers = this.getHeader(nonce, timestamp, signature);

    const response = await axios.get(path, { headers: headers });
    return response.data;
  }

  /*******************************************************************************
   * FUNCTION 명 : getSignature()
   * FUNCTION 기능설명 : Signature 생성
  *******************************************************************************/
  async getSignature(method, path) {
    const timestamp = await this.getTimeStamp();
    const nonce = this.getNonce();
    const signature = SignatureGenerator.signature(
        apiSecret
      , method
      , path
      , timestamp
      , nonce
    );

    return {
      timestamp,
      nonce,
      signature
    }
  }

  /*******************************************************************************
   * FUNCTION 명 : getSignature()
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
    const response = await axios.get(`/v1/time`, { headers: { 'service-api-key': apiKey } })
    const timeStamp = response.data.responseTime;
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