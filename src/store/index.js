import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        user_id: null,
        user_name: null,
        user_type: null,
        user_avatar: null,
        access_token: null,
    },
    mutations: {
        setUserID (state, id) {
            state.user_id = id
        },
        setUserName (state, name) {
            state.user_name = name
        },
        setUserType (state, type) {
            state.user_type = type
        },
        setUserAvatar (state, avatar) {
            state.user_avatar = avatar
        },
        setToken (state, token) {
            state.access_token = token
        },
        clearUserInfo (state) {
            state.user_id = null
            state.user_name = null
            state.user_type = null
            state.user_avatar = null
            state.access_token = null
        }
    },
    actions: {
        setToken ({commit}, token) {
            commit('setToken', token);
        },
        setUserName ({commit}, name) {
            commit('setUserName', name.trim());
        },
        setUserType ({commit}, type) {
            commit('setUserType', type.trim());
        },
        setUserAvatar ({commit}, avatar) {
            commit('setUserAvatar', avatar ? avatar.trim() : null);
        },
        clear ({commit}){
            commit('clearUserInfo');
        }
    },
    getters: {
        user: state => {
            return {
                id: state.user_id,
                name: state.user_name,
                type: state.user_type,
                avatar: state.user_avatar
            }
        },
        token: state => {
            return state.access_token;
        }
    },
    modules: {}
});
