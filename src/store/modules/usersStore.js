import axios from 'axios'

const usersStore = {
    namespaced: true,
    state: () => ({
        usersList: [],
        PostAuthor: "",
        usersMessage: ""
    }),
    mutations: {
        USERSLIST: (state, users) => {
            state.usersList = users
        },
        USER_DETAILS: (state) => {
            state;
        },
        POST_AUTHOR : (state, author) => {
            state.PostAuthor = author
        }
    },
    getters: {

    },
    actions: {
        getAllUsers: (store) => {
            console.log('get all users')
           axios.get('http://localhost:3000/api/users/', { headers: { 'Authorization': `Bearer ${store.rootGetters.getUserToken}` } })
                .then((res) => {
                    //enregistre res dans le state
                    //console.log('all users ' + JSON.stringify(res.data))
                    if(res.status == 200) {
                        //console.log('all users ' + JSON.stringify(res.data))
                       store.commit('USERSLIST', res.data)
                    }
                }).catch(err => {
                    //console.log(err.response.status)
                    if(err.response.status == 404) {
                        console.log(err.response.data.message)
                        store.commit('POSTS_MESSAGE', err.response.data.message)
                    }
                })
        },
        getUser: (store , userId) => {
            //console.log("id  " + userId)
            axios.get(`http://localhost:3000/api/users/${userId}`, { headers: { 'Authorization': `Bearer ${store.rootGetters.getUserToken}` } })
                .then((res) => {
                    //enregistre res dans le state
                    console.log('getUser ' + JSON.stringify(res.data))
                    if(res.status == 200) {
                        //console.log('all users ' + JSON.stringify(res.data))
                       store.commit('POST_AUTHOR', res.data)
                    }
                }).catch(err => {
                    //console.log(err.response.status)
                    if(err.response.status == 404) {
                        console.log(err.response.data.message)
                        store.commit('POSTS_MESSAGE', err.response.data.message)
                    }
                })
        }
    },

}

export default usersStore