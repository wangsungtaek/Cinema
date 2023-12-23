<template>
  <div>
    <h1>LOGIN</h1>
  <el-row class="mb-4" justify="center">
    <el-col :lg=6>
      <el-button
        type="success"
        size="large"
        @click="lineLogin"
      >
        LINE 계정으로 로그인
      </el-button>

      <el-button
        type="danger"
        size="large"
        @click="dosiWalletLogin"
      >
        DOSI Wallet 로그인
      </el-button>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
    lineLogin() {
      // location.href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2000304849&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fmain&state=12345abcde&scope=profile%20openid%20email"
      location.href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2001882971&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fmain&state=12345abcde&scope=profile%20openid%20email"
    },

    dosiWalletLogin() {
      location.href="https://dosi-members.line-apps-beta.com/api/v1/auth/login/login-bridge?mode=OAUTH&channelId=pgp_jT6IDWPBQYmWqy7T&serviceId=2292e364-b0c6-489e-9402-85844a5725b5&state=1432f43e-5069-4381-9ddf-bc00f49b0e4e&scope=profile%20email&returnUri=http%3A%2F%2Flocalhost%3A8080%2Fmain"
      // location.href="https://dosi-members.line-apps-beta.com/api/v1/auth/login/login-bridge?mode=OAUTH&channelId=pgp_jT6IDWPBQYmWqy7T&serviceId=2292e364-b0c6-489e-9402-85844a5725b5&state=1432f43e-5069-4381-9ddf-bc00f49b0e4e&scope=profile%20email&returnUri=http%3A%2F%2Flocalhost%3A8080%2Fmain"
      // location.href="https://members.dosi.world/api/v1/auth/login/login-bridge?mode=OAUTH&channelId=Nq0atKVUcImyGOltizJo&serviceId=92095132-d83d-4bf8-9073-b7353494fcb4&state=1432f43e-5069-4381-9ddf-bc00f49b0e4e&scope=profile%20email&returnUri=https%3A%2F%2Fdev.app.hellovacay.com%2Fdosi"
      // location.href="https://members.dosi.world/api/v1/auth/login/login-bridge?mode=OAUTH&channelId={{channel_id}}&serviceId={{servie_id}}&state=1432f43e-5069-4381-9ddf-bc00f49b0e4e&scope=profile%20email&returnUri=https%3A%2F%2Fapp.hellovacay.com%2Fwallet,"
      // https://members.dosi.world/api/v1/auth/login/login-bridge?mode=OAUTH&channelId=uO_YLAekg6B8pOMaevMK&serviceId=d9e96e47-9e36-43f4-b9a7-84f98c35d6a4&scope=profile%20email&returnUri=https://ndkonect.xyz/api/dosi/callbac
      // location.href="https://dosi-members.line-apps-beta.com/api/v1/auth/login/login-bridge?mode=OAUTH&channelId=pgp_jT6IDWPBQYmWqy7T&serviceId=2292e364-b0c6-489e-9402-85844a5725b5&state=1432f43e-5069-4381-9ddf-bc00f49b0e4e&scope=profile%20email"
    }
  }
}
</script>

<style>

</style>