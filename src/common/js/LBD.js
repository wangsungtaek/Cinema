import axios from "axios";
import SignatureGenerator from "./lbd/signature";
import { walletAddress, apiKey, apiSecret, nonce, timeStamp } from './lbd/header.js';

class LBD {
  
  constructor() {

  }

  /*******************************************************************************
   * FUNCTION 명 : getTime()
   * FUNCTION 기능설명 : 시간 조회
  *******************************************************************************/
  async getTime() {

    const headers = {
      'service-api-key': apiKey,
    }
    
    return (await axios({
      method: 'get',
      url: '/v1/time',
      headers: headers
    }).catch(e => {
      console.log(e);
    })).data;
  };

  /*******************************************************************************
   * FUNCTION 명 : getTime()
   * FUNCTION 기능설명 : 시간 조회
  *******************************************************************************/
  async getTransaction(txHash) {
    const path = `/v1/transactions/${txHash}`;

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
    console.log('##header: ', headers)

    return (await axios({
      method: 'get',
      url: path,
      headers: headers
    }).catch(e => {
      console.log(e);
    })).data;
  }

  


}

export default LBD;