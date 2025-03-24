<template>
  <el-card v-for="(student, index) in StudentInfo" :key="index">
    {{ student.fullname }}
    {{ student.studentId }}
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const StudentInfo = reactive([
  { fullname: 'John Doe', studentId: 1234565 },
  { fullname: 'Jane Doe', studentId: 3699821 },
])
</script>
