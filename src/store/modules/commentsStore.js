import axios from 'axios'

const postsStore = {
    namespaced: true,
    state: () => ({
        commentMessage: "",
        comments: ""
    }),
    mutations: {
        SET_MESSAGE: (state, message) => { state.commentMessage = message },
        SET_COMMENTS: (state, comments) => { state.comments = comments },
        CLEAR: (state) => {
            state.commentMessage = "",
                state.comments = ""
        }
    },
    getters: {

    },
    actions: {
        addComment: (store, comment) => {
            console.log('addComment store' + JSON.stringify(comment))
            axios.post('http://localhost:3000/api/comments', comment, { headers: { 'Authorization': `Bearer ${store.rootGetters.getUserToken}` } })
                .then((res) => {
                    console.log(res.data.message)
                    console.log('post id to fetch ' + comment.postId)
                    store.dispatch('getComments', comment.postId)
                })
        },
        getComments: (store, postId) => {
            console.log('store get comment')
            console.log('post id ' + postId)
            console.log('post id ' + typeof(postId))
            axios.get(`http://localhost:3000/api/comments/${postId}`, { headers: { 'Authorization': `Bearer ${store.rootGetters.getUserToken}` } })
                .then((comments) => {
                        store.commit('SET_COMMENTS', comments.data)
                    
                })
                .catch(err => {
                    //console.log("status " + JSON.stringify(err.response)) 
                    if (err.response.status == 404) {
                        store.commit('SET_MESSAGE', err.response.data.message)
                    }
                })
        },
        deleteComment: (store, commentId) => {
            //console.log("delete com in store "+ JSON.stringify(commentId))
            //console.log("token "+store.rootGetters.getUserToken)
            axios.delete(`http://localhost:3000/api/comments/${commentId.commentId}`, {
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
        clearComments: (store) => {
            store.commit('CLEAR')
        }
    },

}

export default postsStore