<template>
  <el-form ref="logInFormRef" :model="LogInForm" :rules="LogInFormRules">
    <el-form-item prop="UserName">
      <el-input v-model="LogInForm.UserName" placeholder="Full Name" type="text"></el-input>
    </el-form-item>
    <el-form-item prop="Password">
      <el-input v-model="LogInForm.Password" placeholder="Password" type="password"></el-input>
    </el-form-item>
    <el-button type="primary" @click="GoToDisplayStudentInformation">Log In</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useInputStore } from '@/stores/studentInfo'

const inputUser = useInputStore()

interface LogInForm {
  UserName: string
  Password: string
}

const logInFormRef = ref<InstanceType<typeof ElForm>>()

const LogInForm = reactive<LogInForm>({
  UserName: '',
  Password: '',
})

const LogInFormRules = reactive({
  FullName: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
  Password: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
})

const router = useRouter()

const GoToDisplayStudentInformation = () => {
  logInFormRef.value?.validate((valid) => {
    if (valid) {
      const isLoggedIn = inputUser.LogIn(LogInForm.UserName, LogInForm.Password)
      if (isLoggedIn) {
        router.push('/DisplayStudentInformation')
      } else {
        console.log('Invalid Credentials')
      }
    } else {
      console.log('Validation Failed')
    }
  })
}
</script>

<style>
body {
  height: 100%;
  width: 100%;
  background-image: url('@/assets/BackgroundImage.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #2148c0;
}

.el-input__wrapper,
.el-button {
  width: 300px;
  height: 45px;
  background-color: transparent;
  border: 1px;
}

.el-button {
  background-color: white;
  color: black;
}

.el-input::placeholder,
.el-button::placeholder {
  font-size: 14px;
  font-weight: 300;
}
</style>
