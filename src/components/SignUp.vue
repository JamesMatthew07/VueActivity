<template>
  <div class="signup-container">
    <h2 class="signup-title">Create Account</h2>
    <el-form ref="SignUpRef" :model="SignUp" :rules="SignUpRules" class="signup-form">
      <el-form-item prop="UserName">
        <el-input v-model="SignUp.UserName" placeholder="Username" :prefix-icon="User"></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="FirstName">
            <el-input v-model="SignUp.FirstName" placeholder="First Name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="MiddleInitial">
            <el-input v-model="SignUp.MiddleInitial" placeholder="Middle Initial"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="LastName">
            <el-input v-model="SignUp.LastName" placeholder="Last Name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="BirthDate">
            <el-date-picker
              v-model="SignUp.BirthDate"
              type="date"
              placeholder="Birth Date"
              style="width: 100%"
              @change="calculateAge"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="Age">
            <el-input v-model="SignUp.Age" placeholder="Age" type="number" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="Address">
        <el-input v-model="SignUp.Address" placeholder="Address" type="textarea" :rows="2"></el-input>
      </el-form-item>

      <el-form-item prop="Course">
        <el-select v-model="SignUp.Course" placeholder="Select Course" style="width: 100%">
          <el-option
            v-for="course in courseOptions"
            :key="course"
            :label="course"
            :value="course"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="Password">
        <el-input 
          v-model="SignUp.Password" 
          placeholder="Password" 
          type="password"
          :prefix-icon="Lock"
        ></el-input>
      </el-form-item>

      <el-form-item prop="ConfirmPassword">
        <el-input
          v-model="SignUp.ConfirmPassword"
          placeholder="Confirm Password"
          type="password"
          :prefix-icon="Lock"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="GoToLogInForm" class="submit-button">Create Account</el-button>
      </el-form-item>

      <p class="login-link">Already have an account? <el-link type="primary" @click="router.push('/')">Log In</el-link></p>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useInputStore } from '@/stores/studentInfo'
import { Lock, User } from '@element-plus/icons-vue'
import { ElForm, type FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const inputUser = useInputStore()
const SignUpRef = ref<FormInstance>()

interface SignUp {
  UserName: string
  FirstName: string
  MiddleInitial: string
  MiddleName: string
  LastName: string
  BirthDate: string
  Birthday: string
  Age: string
  Address: string
  Course: string
  Password: string
  ConfirmPassword: string
}

const SignUp = reactive<SignUp>({
  UserName: '',
  FirstName: '',
  MiddleInitial: '',
  MiddleName: '',
  LastName: '',
  BirthDate: '',
  Birthday: '',
  Age: '',
  Address: '',
  Course: '',
  Password: '',
  ConfirmPassword: '',
})

// Add course options constant
const courseOptions = [
  'Bachelor of Science in Information and Technology',
  'Bachelor in Computer Science',
  'Bachelor of Science in Tourism',
  'Bachelor of Science in Hotel and Restaurant Management',
  'Bachelor of Science in Nursing'
]

// Custom password validation
const validatePass = (rule: unknown, value: string, callback: (error?: Error) => void) => {
  if (SignUp.Password === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const validatePass2 = (rule: unknown, value: string, callback: (error?: Error) => void) => {
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
  MiddleInitial: [{ required: true, message: 'Please input your middle initial', trigger: 'blur' }],
  LastName: [{ required: true, message: 'Please input your last name', trigger: 'blur' }],
  BirthDate: [{ required: true, message: 'Please select your birth date', trigger: 'blur' }],
  Age: [{ required: true, message: 'Age is required', trigger: 'blur' }],
  Address: [{ required: true, message: 'Please input your address', trigger: 'blur' }],
  Course: [{ required: true, message: 'Please select your course', trigger: 'blur' }],
  Password: [{ validator: validatePass, trigger: 'blur' }],
  ConfirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
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

const calculateAge = () => {
  if (SignUp.BirthDate) {
    const birthDate = new Date(SignUp.BirthDate)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    SignUp.Age = age
  }
}
</script>

<style>
.signup-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.signup-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.signup-form {
  width: 100%;
}

.el-input__wrapper {
  background-color: transparent;
  border: 1px solid #dcdfe6;
  transition: all 0.3s;
}

.el-input__wrapper:hover {
  border-color: #409eff;
}

.el-input__inner {
  height: 40px;
  color: #2c3e50;
}

.submit-button {
  width: 100%;
  height: 40px;
  margin-top: 1rem;
  background-color: #409eff;
  border: none;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #606266;
}

.el-form-item {
  margin-bottom: 1.2rem;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 !important;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff !important;
}
</style>
