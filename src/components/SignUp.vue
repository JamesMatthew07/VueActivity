<template>
  <el-form ref="SignUpRef" :model="SignUp" :rules="SignUpRules">
    <el-form-item prop="UserName">
      <el-input v-model="SignUp.UserName" placeholder="Username"></el-input>
    </el-form-item>
    <el-form-item prop="FirstName">
      <el-input v-model="SignUp.FirstName" placeholder="First Name"></el-input>
    </el-form-item>
    <el-form-item prop="MiddleName">
      <el-input v-model="SignUp.MiddleName" placeholder="Middle Name"></el-input>
    </el-form-item>
    <el-form-item prop="LastName">
      <el-input v-model="SignUp.LastName" placeholder="Last Name"></el-input>
    </el-form-item>
    <el-form-item prop="Birthday">
      <el-input v-model="SignUp.Birthday" placeholder="Birthday"></el-input>
    </el-form-item>
    <el-form-item prop="Age">
      <el-input v-model="SignUp.Age" placeholder="Age"></el-input>
    </el-form-item>
    <el-form-item prop="Password">
      <el-input v-model="SignUp.Password" placeholder="Password" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="ConfirmPassword">
      <el-input
        v-model="SignUp.ConfirmPassword"
        placeholder="Confirm Password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-button @click="GoToLogInForm">Sign Up</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm, type FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { useInputStore } from '@/stores/studentInfo'

const inputUser = useInputStore()

interface SignUp {
  UserName: string
  FirstName: string
  MiddleName: string
  LastName: string
  Birthday: string
  Age: string
  Password: string
  ConfirmPassword: string
}

const SignUpRef = ref<FormInstance>()

const SignUp = reactive<SignUp>({
  UserName: '',
  FirstName: '',
  MiddleName: '',
  LastName: '',
  Birthday: '',
  Age: '',
  Password: '',
  ConfirmPassword: '',
})

// Custom password validation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass = (rule: any, value: any, callback: any) => {
  if (SignUp.Password === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== SignUp.Password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

// Validation rules
const SignUpRules = reactive({
  UserName: [{ required: true, message: 'Please input your username', trigger: 'blur' }],
  FirstName: [{ required: true, message: 'Please input your first name', trigger: 'blur' }],
  MiddleName: [{ required: true, message: 'Please input your middle name', trigger: 'blur' }],
  LastName: [{ required: true, message: 'Please input your last name', trigger: 'blur' }],
  Birthday: [{ required: true, message: 'Please input your birthday', trigger: 'blur' }],
  Age: [{ required: true, message: 'Please input your age', trigger: 'blur' }],
  Password: [
    {
      validator: validatePass,
      required: true,
      message: 'Please input your password',
      trigger: 'blur',
    },
  ],
  ConfirmPassword: [
    {
      validator: validatePass2,
      required: true,
      message: 'Please confirm your password',
      trigger: 'blur',
    },
  ],
})

const router = useRouter()

const GoToLogInForm = () => {
  if (!SignUpRef.value) return

  // Trigger validation for all fields
  SignUpRef.value.validate((valid) => {
    if (valid) {
      inputUser.SignUp(SignUp)
      router.push('/') // Redirect to login page or any other page
    } else {
      console.log('Validation failed!')
    }
  })
}
</script>
