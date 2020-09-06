import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

export async function GetPublications(payload){
    return await Vue.axios.get(API_URL + '/amc/publications', {params: payload, headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function GeneratePDF(payload){
    return await Vue.axios.post(API_URL + '/amc/pdf', payload, {responseType: 'blob', headers: {"Authorization" : `Bearer ${token()}`}});
}
