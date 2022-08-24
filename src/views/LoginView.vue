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
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
    lineLogin() {
      location.href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657401047&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fmain&state=12345abcde&scope=profile%20openid"
    }
  }
}
</script>

<style>

</style>