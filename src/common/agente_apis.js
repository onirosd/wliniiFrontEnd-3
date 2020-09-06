import Vue from "vue";
import { API_URL, API_KEY } from "@/common/config";
import store from "../store/index";

const token = () => store.getters.token;

export async function GetResumenAgentes(){
    return await Vue.axios.get(API_URL + '/resumenagentes');
}
export async function GetResumenAgenteById(personalId){
    if(personalId) return await Vue.axios.get(API_URL + '/resumenagente/' + personalId);
    else return await Vue.axios.get(API_URL + '/myagente', {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function GetResumenAgenteByPublication(pubId){
    return await Vue.axios.get(API_URL + '/resumenagenteByPublicacion/' + pubId, {headers: {"Authorization" : `Bearer ${token()}`}});
}
export async function SearchAgenteByCode(code){
    return await Vue.axios.get(API_URL + '/agenteByCode/' + code);
}
export async function GetAgenteCodes(){
    return await Vue.axios.get(API_URL + '/agente/codigos');
}

