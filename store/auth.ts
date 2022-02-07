import { GetterTree, ActionTree, MutationTree } from 'vuex'

export interface IUser {
  id: number
  // eslint-disable-next-line camelcase
  is_admin: boolean,
  created_at: string
  email: string
}

export const state = () => ({
  token: null,
  user: {
    id: -1,
    created_at: '',
    email: '',
  } as IUser,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  token: (state) => {
    return state.token
  },
  isAuth: (state) => {
    return !!state.token
  },
  user: (state) => {
    return state.user! as IUser
  }
}

export const mutations: MutationTree<RootState> = {
  SET_TOKEN(state, payload) {
    state.token = payload
    state.user.id = -1
  },
  SET_USER(state, payload) {
    state.user = payload
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async update({ commit, getters }) {
    if (getters['isAuth']) {
      const response = await this.$axios.get('/v1/user')
      if (response.status == 200) {
        commit('SET_USER', response.data)
      } else {
        commit('SET_TOKEN', null)
      }
    }
  },

  async login({ commit, dispatch }, payload) {
    const response = await this.$axios.post('/v1/login', payload)
    if (response.status == 200) {
      commit('SET_TOKEN', response.data.token)
      await dispatch('update')
      return response.data
    }
    return null
  },

  async register({ commit, dispatch }, payload) {
    const response = await this.$axios.post('/v1/register', payload)
    if (response.status == 200) {
      commit('SET_TOKEN', response.data.token)
      await dispatch('update')
      return response.data
    }
    return null
  },

  logout({ commit }) {
    commit('SET_TOKEN', null)
  },
}
