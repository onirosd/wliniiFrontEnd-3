import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

export async function GetNotifications(payload){
    return await Vue.axios.get(API_URL + '/notifications',  {params: payload, headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function GetUnreadCount(){
    return await Vue.axios.get(API_URL + '/notifications/unread_count', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function GetUnreadNotifications(payload){
    return await Vue.axios.get(API_URL + '/notifications/unread',  {params: payload, headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function UpdateNotification(notiId, payload){
    return await Vue.axios.put(API_URL + '/notification/' + notiId,  payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}
