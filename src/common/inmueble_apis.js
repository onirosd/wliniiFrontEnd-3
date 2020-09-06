import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

export async function GetInmuebles(payload){
    return await Vue.axios.get(API_URL + '/inmuebles', {params: payload});
}

export async function GetFeaturedInmuebles(){
    return await Vue.axios.get(API_URL + '/inmuebles/featured');
}

export async function GetLatestInmuebles(){
    return await Vue.axios.get(API_URL + '/inmuebles/latest');
}

export async function GetFeaturedInmueblesByUser(personId){
    if(personId) return await Vue.axios.get(API_URL + '/inmuebles/featured/' + personId.trim());
    else return await Vue.axios.get(API_URL + '/inmuebles/myfeatured', {headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function GetLatestInmueblesByUser(personId){
    if(personId) return await Vue.axios.get(API_URL + '/inmuebles/latest/' + personId.trim());
    else return await Vue.axios.get(API_URL + '/inmuebles/mylatest', {headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function SendEmail(payload){
    return await Vue.axios.post(API_URL + '/send_email', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function SendEmailContactanos(payload){
    return await Vue.axios.post(API_URL + '/send_email_contactanos', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function DownloadPropDetail(pubId){
    return await Vue.axios.get(API_URL + '/download_detail/' + pubId, {responseType: 'blob', headers: {"Authorization" : `Bearer ${token()}`}});
}

// Mapa Inmuebles APIs
export async function GetInmueblesInMapa(payload){
    return await Vue.axios.get(API_URL + '/inmuebles/mapa', {params: payload, headers: {"Authorization" : `Bearer ${token()}`}});
}
