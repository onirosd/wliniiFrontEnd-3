import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

export async function GetPersonaInfo(){
    return await Vue.axios.get(API_URL + '/persona', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function UpdatePersonaInfo(payload){
    return await Vue.axios.put(API_URL + '/persona', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function GetPersonalNames(){
    return await Vue.axios.get(API_URL + '/persona/names', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function GetBrokerPersonaInfo(){
    return await Vue.axios.get(API_URL + '/broker/persona', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function UpdateBrokerPersonaInfo(payload){
    return await Vue.axios.put(API_URL + '/broker/persona', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function UpdateProfileImage(payload){
    return await Vue.axios.post(API_URL + '/perfil/image', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}
