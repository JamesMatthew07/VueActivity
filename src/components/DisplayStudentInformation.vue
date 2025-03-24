<template>
  <el-card v-for="(student, index) in StudentInfo" :key="index">
    {{ student.UserName }}
    {{ student.FirstName }}
  </el-card>
</template>

<script setup lang="ts">
import { useInputStore } from '@/stores/studentInfo'

const userDisplay = useInputStore()

const StudentInfo = userDisplay.users
</script>
