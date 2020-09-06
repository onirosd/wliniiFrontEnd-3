import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

// Publication APIs
export async function CreatePublication(payload){
    return await Vue.axios.post(API_URL + '/publication', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function GetPublications(payload){
    return await Vue.axios.get(API_URL + '/publications', {params: payload, headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function GetPublicationsByBroker(payload){
    return await Vue.axios.get(API_URL + '/broker/publications', {params: payload, headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function GetPublicationByID(id){
    return await Vue.axios.get(API_URL + '/publication/'+id, {headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function GetPublicationDetailByID(id){
    return await Vue.axios.get(API_URL + '/publication/detail/'+id, {headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function UpdatePublication(id, payload){
    return await Vue.axios.put(API_URL + '/publication/' + id, payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function UploadImages(payload){
    return await Vue.axios.post(API_URL + '/publication/images', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}

export async function RemoveImage(id){
    return await Vue.axios.delete(API_URL + '/publication/image/' + id, {headers: {"Authorization" : `Bearer ${token()}`}});
}



export async function UpdatePublicacionDetail(payload){
    return await Vue.axios.put(API_URL + '/publicationdetalle', payload, {headers: {"Authorization" : `Bearer ${token()}`}});
}

// 