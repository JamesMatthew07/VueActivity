<template>
  <el-form ref="logInFormRef" :model="LogInForm" :rules="LogInFormRules">
    <el-form-item prop="FullName">
      <el-input v-model="LogInForm.FullName" placeholder="Full Name" type="text"></el-input>
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

interface LogInForm {
  FullName: string
  Password: string
}

const logInFormRef = ref<InstanceType<typeof ElForm>>()

const LogInForm = reactive<LogInForm>({
  FullName: '',
  Password: '',
})

const LogInFormRules = reactive({
  FullName: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
  Password: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
})

const router = useRouter()

const GoToDisplayStudentInformation = async () => {
  if (!logInFormRef.value) return

  try {
    await logInFormRef.value.validate()
    router.push('/DisplayStudentInformation')
  } catch (errors) {
    console.log('Validation Failed:', errors)
  }
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
