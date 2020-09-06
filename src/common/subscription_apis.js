import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

export async function GetSubscriptions(){
    return await Vue.axios.get(API_URL + '/subscription/types', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function CheckUserSubscription(){
    return await Vue.axios.get(API_URL + '/subscription/check', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function SendTrialRequest(){
    return await Vue.axios.post(API_URL + '/trial_subscription', {}, {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function SendSubscription(payload){
    return await Vue.axios.post(API_URL + '/subscription', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}
