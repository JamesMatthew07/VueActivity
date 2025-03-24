<template>
  <el-card v-for="(user, index) in StudentInfo" :key="index">
    {{ user.UserName }}
    {{ user.FirstName }}
  </el-card>
</template>

<script setup lang="ts">
import { useInputStore } from '@/stores/studentInfo'

const userDisplay = useInputStore()

const StudentInfo = userDisplay.users
</script>
