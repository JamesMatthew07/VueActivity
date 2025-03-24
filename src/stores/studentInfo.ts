import { defineStore } from 'pinia'

interface User {
  UserName: string
  FirstName: string
  MiddleName: string
  LastName: string
  Birthday: string
  Age: string
  Password: string
  ConfirmPassword: string
}

export const useInputStore = defineStore('user', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]') as User,
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
      return FoundUser != undefined
    },

    getAllUser() {
      return this.users
    },
  },
})
