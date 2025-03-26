<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-position="top"
    class="student-form"
  >
    <el-form-item label="Username" prop="UserName">
      <el-input v-model="formData.UserName" />
    </el-form-item>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="First Name" prop="FirstName">
          <el-input v-model="formData.FirstName" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Middle Name" prop="MiddleName">
          <el-input v-model="formData.MiddleName" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Last Name" prop="LastName">
          <el-input v-model="formData.LastName" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Birthday" prop="Birthday">
          <el-date-picker v-model="formData.Birthday" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Age" prop="Age">
          <el-input v-model="formData.Age" type="number" />
        </el-form-item>
      </el-col>
    </el-row>

    <div class="form-actions">
      <el-button @click="$emit('cancel')">Cancel</el-button>
      <el-button type="primary" @click="submitForm">Submit</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

const props = defineProps({
  student: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'cancel'])

const formRef = ref()
const formData = reactive({
  UserName: '',
  FirstName: '',
  MiddleName: '',
  LastName: '',
  Birthday: '',
  Age: '',
})

const rules = {
  UserName: [{ required: true, message: 'Username is required', trigger: 'blur' }],
  FirstName: [{ required: true, message: 'First name is required', trigger: 'blur' }],
  LastName: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
}

onMounted(() => {
  if (props.student) {
    Object.assign(formData, props.student)
  }
})

const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', { ...formData })
    }
  })
}
</script>

<style scoped>
.student-form {
  padding: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}
</style>