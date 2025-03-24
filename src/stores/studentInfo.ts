import { defineStore } from 'pinia'

interface User {
  UserName: string
  FirstName: string
  MiddleInitial: string
  LastName: string
  BirthDate: string
  Age: number
  Address: string
  Course: string
  Password: string
  ConfirmPassword: string
}

export const useInputStore = defineStore('user', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
    currentUser: localStorage.getItem('currentUser') || null,
  }),

  actions: {
    SignUp(user: User) {
      this.users.push(user)
      localStorage.setItem('users', JSON.stringify(this.users))
    },

    LogIn(UserName: string, Password: string): boolean {
      const FoundUser = this.users.find(
        (user) => user.UserName === UserName && user.Password === Password,
      )
      if (FoundUser) {
        this.currentUser = UserName
        localStorage.setItem('currentUser', UserName)
        return true
      }
      return false
    },

    getAllUser() {
      return this.users
    },

    updateStudent(studentData: User) {
      const index = this.users.findIndex(user => user.UserName === studentData.UserName)
      if (index !== -1) {
      this.users[index] = studentData
      }
    },
    
    deleteStudent(index: number) {
      this.users.splice(index, 1)
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    }
  },
})
