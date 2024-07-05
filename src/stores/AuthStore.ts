interface AuthState {
  authToken: string
}
const AuthStore = {
  namespaced: true,
  state: {
    authToken: ''
  } as AuthState,
  mutations: {
    setAuthToken(state: { authToken: string }, token: string) {
      state.authToken = token
    }
  },
  actions: {
    login({ commit }: any, token: string) {
      commit('setAuthToken', token)
    }
  },
  getters: {
    getRole: (state: { authToken: any }) => {
      return state.authToken
    }
  }
}

export default AuthStore
