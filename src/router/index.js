import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";

// AUTH
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import RegisterSuccessful from "../views/auth/RegisterSuccessful";
import ForgetPassword from "../views/auth/ForgetPassword";

// PRECIOS
import Precios from "../views/precios/Precios";
import Subscription from "../views/precios/Subscription";

// NOSOTROS
import Nosotros from "../views/nosotros/Nosotros.vue";

import TerminoCondiciones from "../views/documentos/TerminoCondiciones.vue";
import PoliticaPublicacion from "../views/documentos/PoliticaPublicacion.vue";
import PoliticaPrivacidad from "../views/documentos/PoliticaPrivacidad.vue";

// CONTACTANOS
import Contactanos from "../views/contactanos/Contactanos.vue";

// PUBLICACIONES
import Publicaciones from "../views/publicaciones/Publicaciones";
import NuevaPublicacion from "../views/publicaciones/NuevaPublicacion";
import EditarPublicacion from "../views/publicaciones/EditarPublicacion";
import DetallePublicacion from "../views/publicaciones/DetallePublicacion";

// NOTICIASDETALLE

import NoticiasDetalle from "../views/noticias/NoticiasDetalle";

// INMUEBLES
import Inmuebles from "../views/inmuebles/Inmuebles";
import InmueblesMapa from "../views/inmuebles/InmuebleMapa";

// NOTIFICACIONES
import Notificaciones from "../views/notificaciones/Notificaciones";

// AMC
import AMC1 from "../views/amc/AMC1";
import AMC2 from "../views/amc/AMC2";
import AMC3 from "../views/amc/AMC3";
import AMC4 from "../views/amc/AMC4";
import AMCDetail from "../views/amc/AMCDetail";

// Brocker
import Brocker from "../views/brocker/Brocker";

// Agente
import Agente from "../views/agentes/Agente";
import PerfilDeAgente from "../views/agentes/PerfilDeAgente";

Vue.use(Router);

export default new Router({
    mode: "history",
    // base: process.env.NODE_ENV === 'production' ? '/Front/' : '/',
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                auth: false
            }
        },

        // AUTH
        {
            path: "/recuperar",
            name: "recuperar",
            component: ForgetPassword,
            meta: {
                auth: false
            }
        },

        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                auth: false
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                auth: false
            }
        },
        {
            path: "/register/successful",
            name: "register_successful",
            component: RegisterSuccessful,
            meta: {
                auth: false
            }
        },
        // NOSOTROS
        {
            path: "/nosotros",
            name: "nosotros",
            component: Nosotros,
            meta: {
                auth: false
            }
        },

        {
            path: "/terminocondiciones",
            name: "terminocondiciones",
            component: TerminoCondiciones,
            meta: {
                auth: false
            }
        },

        {
            path: "/politicapublicacion",
            name: "politicapublicacion",
            component: PoliticaPublicacion,
            meta: {
                auth: false
            }
        },

        {
            path: "/politicaprivacidad",
            name: "politicaprivacidad",
            component: PoliticaPrivacidad,
            meta: {
                auth: false
            }
        },

        // PRECIOS
        {
            path: "/precios",
            name: "precios",
            component: Precios,
            meta: {
                auth: true
            }
        },
         // CONTACTANOS
        {
            path: "/contactanos",
            name: "contactanos",
            component: Contactanos,
            meta: {
                auth: false
            }
        },

        {
            path: "/subscripcion/:type",
            name: "subscripcion",
            component: Subscription,
            meta: {
                auth: true
            }
        },

        // PUBLICACIONES

        {
            path: "/publicaciones",
            name: "publicaciones",
            component: Publicaciones,
            meta: {
                auth: true,
                roles: ["1", "2", "3"]
            }
        },
        {
            path: "/publicaciones/editar/:id",
            name: "publicacion_editar",
            component: EditarPublicacion,
            meta: {
                auth: true,
                roles: ["1", "2"]
            }
        },
        {
            path: "/publicaciones/nueva",
            name: "publicaciones_nueva",
            component: NuevaPublicacion,
            meta: {
                auth: true,
                roles: ["1", "2"]
            }
        },
        {
            path: "/publicaciones/detalle/:id",
            name: "publicaciones_detalle",
            component: DetallePublicacion,
            meta: {
                auth: true,
                roles: ["1", "2"]
            }
        },

        // INMUEBLES
        {
            path: "/inmuebles",
            name: "inmuebles",
            component: Inmuebles,
            meta: {
                auth: false
            }
        },
        {
            path: "/venta_inmuebles",
            name: "venta_inmuebles",
            component: Inmuebles,
            meta: {
                auth: false
            }
        },
        {
            path: "/inmuebles/mapa",
            name: "inmuebles_mapa",
            component: InmueblesMapa,
            meta: {
                auth: false,
                // roles: ["1", "2"]
            }
        },

        // NOTIFICACIONES
        {
            path: "/notificaciones",
            name: "notificaciones",
            component: Notificaciones
        },

        // NOTICIAS

           {
            path: "/noticias/detalle/:id",
            name: "noticias",
            component: NoticiasDetalle,
            meta: {
                auth: false
                //roles: ["1", "2", "3"]
            }
        },

        // AMC
        {
            path: "/amc/1",
            name: "amc_1",
            component: AMC1,
            meta: {
                auth: true,
                roles: ["1", "2"]
            }
        },
        {
            path: "/amc/2",
            name: "amc_2",
            component: AMC2,
            meta: {
                auth: true,
                roles: ["1", "2"]
            }
        },
        {
            path: "/amc/3",
            name: "amc_3",
            component: AMC3,
            meta: {
                auth: true,
                roles: ["1", "2"]
            }
        },
        {
            path: "/amc/4",
            name: "amc_4",
            component: AMC4,
            meta: {
                auth: true,
                roles: ["1", "2"]
            }
        },

        {
            path: "/amc/detallepublicacion/:id",
            name: "amc_detail",
            component: AMCDetail,
            meta: {
                auth: true,
                roles: ["1", "2"]
            }
        },

        // Brocker
        {
            path: "/perfil/brocker",
            name: "perfil_brocker",
            component: Brocker,
            meta: {
                auth: true,
                roles: ["3"]
            }
        },

        // Agente
        {
            path: "/agente",
            name: "agente",
            component: Agente
        },
        {
            path: "/agente/perfil",
            name: "agente_perfil",
            component: PerfilDeAgente
        },

        {
            path: "*",
            name: "home",
            component: Home,
            meta: {
                auth: false
            }
        }
    ],
    scrollBehavior(to, from) {
        return { x: 0, y: 0 };
    },
});
