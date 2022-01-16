import axios from 'axios'

const postsStore = {
    namespaced: true,
    state: () => ({
        allPosts: [],
        postDetails: {},
        postMessage: ""
    }),
    mutations: {
        ADD_POST: (state, post) => {
            state.allPosts.unshift(post)
        },
        SET_POSTS: (state, posts) => {
            state.allPosts = posts
        },
        POSTS_MESSAGE: (state, message) => {
            state.postMessage = message
        },
        SET_POST_DETAILS: (state, post) => {
            state.postDetails = post
        },
        SET_LAST_POSTS: (state, last) => {
            state.lastPosts = last
        },
        CLEAR_DETAILS: (state) => {
            state.postDetails = []
        }

    },
    getters: {

    },
    actions: {
        addPost: (store, post) => {
            axios.post('http://localhost:3000/api/posts', post, { headers: { 'Authorization': `Bearer ${store.rootGetters.getUserToken}` } })
                .then((res) => {
                    if (res.status == 201) {
                        store.commit('POSTS_MESSAGE', res.data.message)
                        store.dispatch('getAllPosts')
                    }
                }).catch(err => {
                    console.log(JSON.stringify(err.response))
                })
        },
        getAllPosts: (store) => {
            console.log('store : get all posts')
            axios.get(`http://localhost:3000/api/posts/`, { headers: { 'Authorization': `Bearer ${store.rootGetters.getUserToken}` } })
                .then((allPosts) => {
                    //console.log("all posts store : "+ JSON.stringify(allPosts.data))
                    store.commit('SET_POSTS', allPosts.data)
                })
                .catch(err => {
                    //console.log(err.response.status)
                    if (err.response.status == 404) {
                        //console.log(err.response.data.message)
                        store.commit('POSTS_MESSAGE', err.response.data.message)
                    }
                })
        },
        getPostDetails: (store, postId) => {
            //console.log('post details')
            return axios.get(`http://localhost:3000/api/posts/${postId}`, { headers: { 'Authorization': `Bearer ${store.rootGetters.getUserToken}` } })
                .then((postDetatils) => {
                    //console.log(JSON.stringify(postDetatils.data[0]))
                    store.commit('SET_POST_DETAILS', postDetatils.data[0])
                })
                .catch(err => console.log(err))
        },
        clearPostDetails: (store) => { store.commit('CLEAR_DETAILS') }

    },
    deletePost: (store, commentId) => {
        //console.log("delete com in store "+ JSON.stringify(commentId))
        //console.log("token "+store.rootGetters.getUserToken)
        axios.delete(`http://localhost:3000/api/posts/${commentId.commentId}`, {
            headers: { 'Authorization': `Bearer ${store.rootGetters.getUserToken}` },
            data: { authorId: commentId.authorId }
        })
            .then((res) => {
                console.log("res status " + res.status)
                if (res.status == 200) {
                    store.commit('SET_MESSAGE', res.message)
                    store.commit('CLEAR')
                    store.dispatch('getComments', commentId.postId)
                }
            })
    },

}

export default postsStore