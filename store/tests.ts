import { GetterTree, ActionTree, MutationTree } from 'vuex'


export const state = () => ({
  test: null as any,
  question: 0,
  answers: [] as Array<any>
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  test: (state) => state.test,
  question: (state) => {
    if (state.test != null) {
      return {
        index: state.question,
        ...state.test.questions[state.question]
      }
    }
    return {
      index: state.question
    }
  },
  answers: (state) => state.answers,
}

export const mutations: MutationTree<RootState> = {
  load(state, payload) {
    state.test = payload
  },

  nextQuestion(state) {
    state.question++
  },

  prevQuestion(state) {
    state.question--
  },

  addAnswer(state, payload: any) {
    state.answers.push(payload)
  }
}

export const actions: ActionTree<RootState, RootState> = {
  load({ commit }, payload) {
    return new Promise((resolve: (value?: unknown) => void, reject) => {
      this.$axios
        .get(`/v1/tests/${payload}`)
        .then((response) => {
          if (response.status === 200) {
            commit('load', response.data)
          }
          resolve(response)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
}
