<template>
  <div class="student-container">
    <!-- Add Profile Section -->
    <div class="profile-section">
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="profile-trigger">
          <el-avatar :size="40" :icon="UserFilled" />
          <span class="profile-name">{{ currentUser?.FirstName || 'User' }}</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">My Profile</el-dropdown-item>
            <el-dropdown-item command="logout" divided>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="header">
      <h2>Student Information</h2>
      <el-button type="primary" @click="openDrawer(null)" :icon="Plus">Add Student</el-button>
    </div>

    <div class="student-grid">
      <el-card v-for="(user, index) in filteredStudents" :key="index" class="student-card">
        <div class="student-info">
          <div class="avatar-section">
            <el-avatar :size="64" :icon="UserFilled" />
          </div>
          <div class="student-details">
            <div class="name-section">
              <h3>{{ user.FirstName }} {{ user.MiddleInitial }}. {{ user.LastName }}</h3>
              <p class="username">@{{ user.UserName }}</p>
            </div>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Birth Date</span>
                <span class="value">{{ formatDate(user.BirthDate) }}</span>
              </div>
              <div class="info-item">
                <span class="label">Age</span>
                <span class="value">{{ user.Age }}</span>
              </div>
              <div class="info-item full-width">
                <span class="label">Address</span>
                <span class="value">{{ user.Address }}</span>
              </div>
              <div class="info-item full-width">
                <span class="label">Course</span>
                <span class="value">{{ user.Course }}</span>
              </div>
            </div>
          </div>
          <div class="card-actions">
            <el-button type="primary" text :icon="Edit" @click="openDrawer(user)" />
            <el-button type="danger" text :icon="Delete" @click="deleteStudent(index)" />
          </div>
        </div>
      </el-card>
    </div>

    <!-- Student Form Drawer -->
    <el-drawer
      v-model="drawerVisible"
      :title="isEditing ? 'Edit Student' : 'Add Student'"
      direction="rtl"
      size="400px"
    >
      <student-form
        :student="selectedStudent"
        @submit="handleFormSubmit"
        @cancel="drawerVisible = false"
      />
    </el-drawer>

    <!-- Add Profile Drawer -->
    <el-drawer
      v-model="profileDrawerVisible"
      title="My Profile"
      direction="rtl"
      size="400px"
    >
      <div class="profile-drawer-content">
        <div class="profile-header">
          <el-avatar :size="80" :icon="UserFilled" />
          <h3>{{ currentUser?.FirstName }} {{ currentUser?.LastName }}</h3>
          <p class="profile-username">@{{ currentUser?.UserName }}</p>
        </div>

        <el-form :model="currentUser" label-position="top" class="profile-form">
          <el-form-item label="Username">
            <el-input v-model="currentUser.UserName" disabled />
          </el-form-item>

          <el-row :gutter="12">
            <el-col :span="12">
              <el-form-item label="First Name">
                <el-input v-model="currentUser.FirstName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Last Name">
                <el-input v-model="currentUser.LastName" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="Birth Date">
            <el-date-picker
              v-model="currentUser.BirthDate"
              type="date"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="Address">
            <el-input
              v-model="currentUser.Address"
              type="textarea"
              :rows="2"
            />
          </el-form-item>

          <el-form-item label="Course">
            <el-select v-model="currentUser.Course" style="width: 100%">
              <el-option
                v-for="course in courseOptions"
                :key="course"
                :label="course"
                :value="course"
              />
            </el-select>
          </el-form-item>

          <div class="profile-actions">
            <el-button @click="profileDrawerVisible = false">Cancel</el-button>
            <el-button type="primary" @click="updateProfile">Save Changes</el-button>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
// Add these imports
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
// ...existing imports...
import { useInputStore } from '@/stores/studentInfo'
import { Delete, Edit, Plus, UserFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import StudentForm from './StudentForm.vue'

const userDisplay = useInputStore()
const StudentInfo = userDisplay.users
const drawerVisible = ref(false)

interface Student {
  UserName: string;
  FirstName: string;
  MiddleInitial: string;
  LastName: string;
  BirthDate: string;
  Age: number;
  Address: string;
  Course: string;
  Password?: string;
  ConfirmPassword?: string;
}

const selectedStudent = ref<Student | undefined>(undefined)
const isEditing = ref(false)

const openDrawer = (student: Student | undefined) => {
  selectedStudent.value = student
  isEditing.value = !!student
  drawerVisible.value = true
}

const handleFormSubmit = (studentData: Student) => {
  if (isEditing.value) {
    // Update existing student
    userDisplay.updateStudent(studentData)
  } else {
    // Add new student
    userDisplay.SignUp(studentData)
  }
  drawerVisible.value = false
}

const deleteStudent = (index) => {
  ElMessageBox.confirm('Are you sure you want to delete this student?', 'Warning', {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    userDisplay.deleteStudent(index)
    ElMessage.success('Student deleted successfully')
  })
}

// Add this function to format the date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const router = useRouter()
const profileDrawerVisible = ref(false)
const currentUser = ref<Student | null>(null)

// Add these to your existing code
const courseOptions = [
  'Bachelor of Science in Information and Technology',
  'Bachelor in Computer Science',
  'Bachelor of Science in Tourism',
  'Bachelor of Science in Hotel and Restaurant Management',
  'Bachelor of Science in Nursing'
]

onMounted(() => {
  // Get logged in user from localStorage or store
  const loggedInUsername = localStorage.getItem('currentUser')
  if (loggedInUsername) {
    currentUser.value = StudentInfo.find(user => user.UserName === loggedInUsername) || null
  }
})

const handleCommand = (command: string) => {
  if (command === 'profile') {
    profileDrawerVisible.value = true
  } else if (command === 'logout') {
    localStorage.removeItem('currentUser')
    router.push('/')
  }
}

const updateProfile = () => {
  if (currentUser.value) {
    userDisplay.updateStudent(currentUser.value)
    profileDrawerVisible.value = false
    ElMessage.success('Profile updated successfully')
  }
}

// Update your display logic to filter out current user
const filteredStudents = computed(() => 
  StudentInfo.filter(user => user.UserName !== currentUser.value?.UserName)
)
</script>

<style scoped>
/* Add these styles */
.profile-section {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.profile-trigger:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-name {
  font-size: 0.9rem;
  color: #2c3e50;
}

.profile-drawer-content {
  padding: 1.5rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-header h3 {
  margin: 1rem 0 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.profile-username {
  color: #64748b;
  margin: 0.25rem 0 0;
}

.profile-form {
  margin-top: 2rem;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.student-container {
  max-width: 1600px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h2 {
  font-family: 'Montserrat', sans-serif;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.student-card {
  background: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  max-width: 300px;
}

.student-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.student-info {
  padding: 1rem;
}

.avatar-section {
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;
}

.avatar-section :deep(.el-avatar) {
  width: 48px;
  height: 48px;
}

.name-section {
  text-align: center;
  margin-bottom: 1rem;
}

.name-section h3 {
  font-size: 1rem;
}

.username {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.info-item.full-width {
  grid-column: span 2;
}

.label {
  font-size: 0.7rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 0.85rem;
  color: #334155;
}

.card-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

/* Updated Responsive Design */
@media (max-width: 1400px) {
  .student-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .student-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .student-grid {
    grid-template-columns: 1fr;
  }
  .student-card {
    max-width: 100%;
  }
}
</style>
