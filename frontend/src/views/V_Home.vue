<template>
  <!-- Much of the stuff is hardcoded here and will be added once login/users is implemented properly with Keycloak -->
  <h1>Hi, {{ loggedUser }}.</h1>
  <p>The date is: {{ formattedDate }}</p>

  <p>
    You <strong>{{ hasLogged ? 'have' : `haven't` }}</strong> logged work hours today.
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'

const loggedUser = ref('Name')
const now = dayjs()
const formattedDate = now.format('DD MMM YYYY')
const hasLogged = ref(false)
</script>

<style scoped></style>
