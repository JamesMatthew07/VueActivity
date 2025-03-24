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

// const validatePass = (rule: any, value: any, callback: any) => {
//   if (SignUp.ConfirmPassword !== '') {
//     if (!SignUpRef.value) return
//     SignUpRef.value.validateField('ConfirmPassword')
//   }
//   callback()
// }
const validatePass = (rule: any, value: any, callback: any) => {
  if (SignUp.Password === '') {
    callback(new Error('Please input the password'))
  } else {
    if (SignUp.ConfirmPassword !== '' && SignUpRef.value) {
      if (!SignUpRef.value) return
      SignUpRef.value.validateField('ConfirmPassword')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== SignUp.Password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const SignUpRules = reactive({
  UserName: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
  FirstName: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
  MiddleName: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
  LastName: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
  Birthday: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
  Age: [{ required: true, message: 'Please input full name', trigger: 'blur' }],
  Password: [
    {
      validation: validatePass,
      required: true,
      message: 'Please input full name',
      trigger: 'blur',
    },
  ],
  ConfirmPassword: [
    {
      validation: validatePass2,
      required: true,
      message: 'Please input full name',
      trigger: 'blur',
    },
  ],
})
const router = useRouter()
const GoToLogInForm = (SignUpRef: FormInstance | undefined) => {
  if (!SignUpRef) return
  SignUpRef.value.validate((valid) => {
    if (valid) {
      console.log('submit!')
      router.push('/')
    } else {
      console.log('error submit!')
    }
  })
}

// const GoToLogInForm = async () => {
//   if (!SignUpRef.value) return

//   try {
//     await SignUpRef.value.validate()
//     router.push('/')
//   } catch (errors) {
//     console.log('Registration Failed', errors)
//   }
</script>
