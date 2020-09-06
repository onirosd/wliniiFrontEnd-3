import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

export async function GetBrokerProfile(){
    return await Vue.axios.get(API_URL + '/broker/profil', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function GetRelatedPersonas(){
    return await Vue.axios.get(API_URL + '/broker/related_pesonas', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function AfiliarPerson(id, staf){
    // return true;
    return await Vue.axios.put(API_URL + `/afilia/${id}/${staf}`, {}, {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function UnAfiliarPerson(){
    return true;
    // return await Vue.axios.get(API_URL + '/broker/realted_pesonas', {headers: {"Authorization" : `Bearer ${token()}`}});
}
