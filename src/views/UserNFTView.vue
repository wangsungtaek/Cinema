<template>
  <h1>
    Redirect PAGE
  </h1>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import axios from "axios";

// hooks
onMounted(() => {
  getAccessToken();
});


const getCode = () => {
  const route = useRoute();
  return route?.query?.code;
};

const getAccessToken = async() => {
  const requestBody = {
    'grant_type': 'authorization_code',
    'code': getCode(),
    'client_id': 'pgp_jT6IDWPBQYmWqy7T',
    'client_secret': 'KZloUfJqVO'
  }

  await axios({
    method: 'POST',
    url: '/api/v1/oauth2/token',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: requestBody
  })
}

</script>

<style>

</style>