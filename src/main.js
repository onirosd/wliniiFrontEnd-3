import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import VueAxios from 'vue-axios';
import "./components/wlinii_components";
import "./css/main.css";
import VueYouTubeEmbed from 'vue-youtube-embed';
import AspectRatio from "v-aspect-ratio";
import Notifications from 'vue-notification';
import "./components/OverlayLoader/OverlayPageLoader";
import "./components/OverlayLoader/OverlayPageLoader.css";

import Moment from 'moment';
Moment.locale('es');
Vue.prototype.$moment = Moment;

Vue.use(VueAxios, axios);
const VueGoogleMaps = require("vue2-google-maps");
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyCrfoNwsy3VVdbmuO9lr8ITavPXX5l78HI",
        libraries: "places"
    }
});

Vue.use(VueYouTubeEmbed, { global: true, componentId: "youtube-media" });
Vue.use(AspectRatio);
Vue.directive("aspect-ratio", AspectRatio.directive);
Vue.use(Notifications)

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    let token = store.getters.token;
    let user = store.getters.user;
    let metaInfo = to.meta;
    
    if(!metaInfo) next({path: '/'});
    else if(metaInfo.auth && !token) next({path: '/login'});
    else if(metaInfo.roles && !metaInfo.roles.includes(user.type)) next({path: '/'});
    else next();
});

new Vue({
    router,
    store,
    created(){
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (401 === error.response.status) {
                let message = error.response.data.error;
                Vue.notify({
                    group: 'w-notify',
                    type: 'error',
                    title: 'Autenticación',
                    text: message ? message : 'usted no está autorizado. Por favor, inicie sesión o regístrese.'
                });

                let redirectUrl = error.response.data.redirect;
                if(redirectUrl) router.push(redirectUrl);

            } else if( 403 === error.response.status ) {
                let message = error.response.data.message;
                Vue.notify({
                    group: 'w-notify',
                    type: 'warn',
                    title: 'Suscripción',
                    text: message ? message : 'No tienes una suscripción.'
                });
                
                let redirectUrl = error.response.data.redirect;
                if(redirectUrl) router.push(redirectUrl);
            }else {
                return Promise.reject(error);
            }
        });
    },
    render: function(h) {
        return h(App);
    }
}).$mount("#app");
