import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

export async function UserLogin(payload){
    return await Vue.axios.post(API_URL + '/usuario', payload, {headers: {"Authorization" : {api_key: API_KEY}}});
}
export async function UserLogout(){
    store.dispatch('clear');
    localStorage.setItem("logged", JSON.stringify(false));
}
export async function ChangePassword(payload){
    return await Vue.axios.post(API_URL + '/usuario/changepassword', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function UserRegister(payload){
    return await Vue.axios.post(API_URL + '/solicitud', payload, {headers: {"Authorization" : {api_key: API_KEY}}});
}

export async function UserRecuperar(payload){
    return await Vue.axios.post(API_URL + '/usuario/recuperar', payload, {headers: {"Authorization" : {api_key: API_KEY}}});
}

