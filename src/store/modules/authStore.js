import axios from 'axios'


const visitor = {
    id: null,
    uuid: null,
    role: 'visitor',
    pseudo: 'visiteur',
    avatar: 'default',
    isLogged: false
}

const authStore = {
    state: () => ({
        user: visitor,
        authMessage: "",
        isValid: false,
        notValid: false,
        credentials: null
    }),
    mutations: {
        LOGIN: (state, user) => {
            state.user = user
        },
        LOGOUT: (state) => { state.user = visitor },
        AUTH_MESSAGE: (state, message) => { state.authMessage = message },
        VALID: (state, bool) => { state.isValid = bool },
        NOTVALID: (state, bool) => { state.notValid = bool },
        CREDENTIALS : (state, credentials) => {state.credentials = credentials}
    },
    getters: {
        getUserToken: state => state.user.token,
    },
    actions: {
        register: async (store, credentials) => {
            await axios.post('http://localhost:3000/api/auth/signup', credentials)
                .then((res) => {
                    if (res.status == 201) {
                        store.commit('AUTH_MESSAGE', res.data.message)
                        store.commit('VALID', true)
                        setTimeout(() => {
                            store.dispatch('logUser', credentials)
                        }, 2000)
                    }
                }).catch((err) => {
                    console.log("catch err " + err.response.status)
                    if (err.response.status == 400 || err.response.status == 404) {
                        console.log('register')
                        console.log("message " + err.response.data.message)
                        store.commit('NOTVALID', true)
                        store.commit('VALID', false)
                        store.commit('AUTH_MESSAGE', err.response.data.message)
                    }
                })
        },
        logUser: async (store, credentials) => {
            await axios.post(`http://localhost:3000/api/auth/login`, credentials).then((res) => {
                if (res.status == 200) {
                    let user = {
                        ... res.data.user,
                        token: res.data.token,
                        password: null,
                        isLogged: true,
                    }
                    store.commit('LOGIN', user)
                    store.commit('VALID', true)
                    store.commit('NOTVALID', false)
                    store.commit('AUTH_MESSAGE', res.data.message)

                }
            }).catch((err) => {
                console.log("catch err " + err.response.status)
                if (err.response.status == 400 || err.response.status == 404) {
                    console.log('loguser')
                    console.log("message" + err.response.data.message)
                    store.commit('NOTVALID', true)
                    store.commit('VALID', false)
                    store.commit('AUTH_MESSAGE', err.response.data.message)
                }
            })
        },
        logout: (store) => {
            store.commit('LOGOUT')
        },
    }

}

export default authStore