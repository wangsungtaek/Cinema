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
      location.href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657612324&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fmain&state=12345abcde&scope=profile%20openid"
    },

    dosiWalletLogin() {
      location.href="https://dosi-members.line-apps-beta.com/api/v1/auth/login/login-bridge?mode=OAUTH&channelId=pgp_jT6IDWPBQYmWqy7T&scope=profile%20email&returnUri=http%3A%2F%2Flocalhost%3A8080%2Fmain"
      // location.href="https://dosi-members.line-apps-alpha.com/api/v1/auth/login/login-bridge?mode=OAUTH&channelId=yOTNDbqmomqZLK3Fk30j&scope=profile%20email&returnUri=https%3A%2F%2Fdosi-game.line-apps-alpha.com%2Fauth%2Flogin%2Foauth%2Fcode1"
    }
  }
}
</script>

<style>

</style>