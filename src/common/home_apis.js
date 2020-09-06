import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

export async function GetFilterOptions(){
    return await Vue.axios.get(API_URL + '/home/home_options');
}

export async function GetGeneralOptions(){
    return await Vue.axios.get(API_URL + '/home/general_options');
}
export async function GetCountries(){
    return await Vue.axios.get(API_URL + '/home/countries');
}
export async function GetNews(){
    return await Vue.axios.get(API_URL + '/home/noticias');
}
export async function GetCurrency(){
    return await Vue.axios.get(API_URL + '/currency', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function GetNewsId(id){
     return await Vue.axios.get(API_URL + '/home/noticias/'+id, {headers: {"Authorization" : `Bearer ${token()}`}});
}


 