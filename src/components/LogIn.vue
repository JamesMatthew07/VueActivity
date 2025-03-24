<template>
  <div class="LogInFormContainer">
    <el-form ref="logInFormRef" :model="LogInForm" :rules="LogInFormRules">
      <el-form-item prop="UserName">
        <el-input
          v-model="LogInForm.UserName"
          placeholder="Username"
          type="text"
          :prefix-icon="User"
        ></el-input>
      </el-form-item>
      <el-form-item prop="Password">
        <el-input
          v-model="LogInForm.Password"
          placeholder="Password"
          type="password"
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>
      <!-- <p class="forgotPassword"><a>Forgot Password?</a></p> -->
      <el-button type="primary" @click="GoToDisplayStudentInformation">Log In</el-button>
      <p>Don't have an account? <a @click="GoToSignUp">Sign Up</a></p>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useInputStore } from '@/stores/studentInfo'
import { User, Lock } from '@element-plus/icons-vue'

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
  FullName: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  Password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
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

const GoToSignUp = () => {
  router.push('/SignUp')
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
  margin-top: 2vh;
}

.el-input::placeholder,
.el-button::placeholder {
  font-size: 14px !important;
  font-weight: 300;
}

.el-input__inner {
  color: white;
  font-size: 14px !important;
}

.forgotPassword {
  margin-top: 0%;
}

/* .el-form-item {
  border: 2px solid red;
} */
</style>
