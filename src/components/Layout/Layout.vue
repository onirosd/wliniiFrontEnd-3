<template>
    <div class="main-layout">
        <!-- NAVBAR -->
        <w-navbar
            :main="currentPath == '/'"
            v-scroll="handleScroll"
            :class="currentPath == '/login' ? 'hidden' : ''"
        >


            <w-top-bar class="desktop-bar">
                <div class="flex flex-row justify-between">
                    <div>
                     <!--    <w-nav-btn :disabled="true">
                            <w-icon icon="flag" h="17px"></w-icon>
                            <p class="caption bold white-text">ENG</p>
                        </w-nav-btn>
                        <w-nav-btn :disabled="true">
                            <w-icon icon="globe" h="17px"></w-icon>
                            <p class="caption bold white-text">ESP</p>

                        </w-nav-btn> -->
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-row justify-end">
                            <div class="custom-items-margin">
                                <w-nav-btn :disabled="true">
                                    <!-- <w-icon icon="phone-brown" h="17px"></w-icon> -->
                                    <!-- <p class="caption bold white-text" @click="contactWithWhatsApp('+51994641341')">+51 994641341</p> -->
                                  
                                    
                                </w-nav-btn>
                            </div>
                            <div class="custom-items-margin hidden lg:block">
                                <w-nav-btn icon="whatsapp-default" iconH="30px" @click="openWindow('https://bit.ly/3refu4q')"></w-nav-btn>
                                <w-nav-btn icon="facebook-white" iconH="30px" @click="openWindow('https://www.facebook.com/WliniiAgentes')"></w-nav-btn>
                                <w-nav-btn icon="instagram-white" iconH="30px" @click="openWindow('https://www.instagram.com/Wliniiperu')"></w-nav-btn>
                                <w-nav-btn icon="twitter-white" iconH="30px" @click="openWindow('https://twitter.com/Wlinii')"></w-nav-btn>
                                <w-nav-btn icon="youtube-white" iconH="30px" @click="openWindow('https://www.youtube.com/channel/UC_PB2P_smfXUSzgDuklfCLg?view_as=subscriber')"></w-nav-btn>
                            </div>
                            <div v-if="logged">
                                <UserLogged :notiCount="notiCount"></UserLogged>
                            </div>
                            <div v-else>
                                <w-nav-btn
                                    @click="$router.push('/login', () => {})"
                                    :icon="
                                        currentPath == '/login'
                                            ? 'user-white'
                                            : 'user-brown'
                                    "
                                    iconH="30px"
                                ></w-nav-btn>
                                <w-nav-btn
                                    @click="$router.push('/register', () => {})"
                                    :icon="
                                        currentPath == '/register'
                                            ? 'edit-circle-white'
                                            : 'edit-circle-brown'
                                    "
                                    iconH="30px"
                                ></w-nav-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </w-top-bar>
            <w-bottom-bar class="desktop-bar">
                <div class="flex flex-row justify-between">
                    <div class="flex-1">
                        <w-nav-btn :icon="logo" iconH="56px" @click="$router.push('/', () => {})"></w-nav-btn>
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-row justify-end">
                            <div v-for="(route, i) in routes" :key="i">
                                <w-nav-btn
                                    @click="gotoPage(route)"
                                    :class="currentPath == route.path ? 'active' : ''"
                                >{{ route.name }}</w-nav-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </w-bottom-bar>

            <w-bottom-bar class="mobile-bar">
                <div class="flex flex-row justify-between">
                    <div class="flex-auto">
                        <w-nav-btn :icon="logo" iconH="56px" @click="$router.push('/', () => {})"></w-nav-btn>
                    </div>
                    <div class="flex-auto">
                        <div class="flex flex-row justify-end">
                            <div v-if="logged" class="mt-3">
                                <UserLogged :notiCount="notiCount" :barIcon="barBtn" @drawerclick="drawer = !drawer"></UserLogged>
                            </div>
                            <div v-else>
                                <w-nav-btn
                                    @click="$router.push('/login', () => {})"
                                    :icon="
                                    currentPath == '/login'
                                        ? 'user-white'
                                        : 'user-brown'
                                "
                                    iconH="30px"
                                ></w-nav-btn>
                                <w-nav-btn
                                    @click="$router.push('/register', () => {})"
                                    :icon="
                                    currentPath == '/register'
                                        ? 'edit-circle-white'
                                        : 'edit-circle-brown'
                                "
                                    iconH="30px"
                                ></w-nav-btn>
                                <w-nav-btn :icon="barBtn" iconH="30px" @click="drawer = true"></w-nav-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </w-bottom-bar>
        </w-navbar>

        <!-- SIDENAV -->
        <div v-if="logged">
            <DrawerLogged v-model="drawer"></DrawerLogged>
        </div>
        <div v-else>
            <Drawer v-model="drawer"></Drawer>
        </div>

        <!-- PAGES -->
        <router-view></router-view>

        <!-- FOOTER -->
        <div class="app-footer">
            <br />
            <br />
            <div class="w-full flex flex-row justify-center">
                <w-icon icon="wlinii-black" h="82px"></w-icon>
            </div>
            <br />
            <div class="w-full flex flex-row justify-center flex-wrap mobile-footer-content">
                <div v-for="(route, i) in routes" :key="i">
                    <w-btn @click="$router.push(route.path, () => {})" color="white mlr-0">
                        <p class="caption bold">{{ route.name }}</p>
                    </w-btn>
                </div>
            </div>
            <br />
            <div class="w-full flex flex-row justify-center items-center flex-wrap">
                <div class="custom-item-margin fix-footer-btn">
                    <w-btn color="white" @click="$router.push('/terminocondiciones', () => {})">
                        <p class="caption">Términos y Condiciones</p>
                    </w-btn>
                </div>
                <div class="custom-item-margin fix-footer-btn">
                    <w-btn color="white" @click="$router.push('/politicapublicacion', () => {})">
                        <p class="caption">Política de publicación</p>
                    </w-btn>
                </div>
                <div class="custom-item-margin fix-footer-btn">
                    <w-btn color="white" @click="$router.push('/politicaprivacidad', () => {})">
                        <p class="caption">Política de Privacidad</p>
                    </w-btn>
                </div>
            </div>
            <br>
            <div class="w-full flex flex-row justify-center items-center flex-wrap">
                <div class="fix-footer-btn social-btn">
                    <w-btn :icon="true" @click="openWindow('https://www.facebook.com/WliniiAgentes')">
                        <w-icon icon="facebook-black" h="26px" ></w-icon>
                    </w-btn>
                    <w-btn :icon="true" @click="openWindow('https://www.instagram.com/Wliniiperu')">
                        <w-icon icon="instagram-black" h="26px"></w-icon>
                    </w-btn>
                    <w-btn :icon="true" @click="openWindow('https://twitter.com/Wlinii')">
                        <w-icon icon="twitter-black" h="25px"></w-icon>
                    </w-btn>
                    <w-btn :icon="true" @click="openWindow('https://www.youtube.com/channel/UC_PB2P_smfXUSzgDuklfCLg?view_as=subscriber')">
                        <w-icon icon="youtube-black" h="23px"></w-icon>
                    </w-btn>
                    <w-btn :icon="true" @click="openWindow('https://bit.ly/2ZJgJ0c')">
                        <w-icon icon="whatsapp-black" h="26px"></w-icon>
                    </w-btn>
                </div>
            </div>
            <br />
            <div class="wlinii-copyright">© Wlinii 2020 - Todos Los Derechos Reservados.</div>
        </div>
    </div>
</template>

<script>
import UserLogged from "./UserLogged";
import Drawer from "./Drawer";
import DrawerLogged from "./DrawerLogged";
import { GetUnreadCount } from "@/common/notification_apis";

export default {
    data: () => ({
        logged: false,
        drawer: false,
        notiCount: 0,
        routes: [
            { name: "Alquiler", path: "/inmuebles", param: {operacion: 'Alquiler'} },
            { name: "Venta", path: "/venta_inmuebles", param: {operacion: 'Venta'} },
            { name: "Nosotros", path: "/nosotros" },
            { name: "Contacto", path: "/contactanos" }
        ],
        currentPath: "/",
        scroll: false
    }),

    components: {
        UserLogged,
        Drawer,
        DrawerLogged
    },

    created() {
        this.intervalID = setInterval(this.checkNotification, 10000);
    },

    beforeDestroy(){
        if(this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    },

    mounted() {
        this.currentPath = this.$router.currentRoute.path;
        this.validAuth();
    },

    watch: {
        $route(to, from) {
            this.currentPath = to.path;
            this.validAuth();
            this.checkNotification();
        }
    },

    computed: {
        logo() {
            if (this.currentPath == "/") {
                return this.scroll ? "wlinii-black" : "wlinii-white";
            } else {
                return "wlinii-black";
            }
        },

        barBtn() {
            if (this.currentPath == "/") {
                return this.scroll ? "bars-black" : "bars-white";
            } else {
                return "bars-black";
            }
        }
    },

    methods: {
        handleScroll(evt, el) {
            window.scrollY > 0 ? (this.scroll = true) : (this.scroll = false);
        },
        validAuth(){
            let token = this.$store.getters.token;
            if(token) this.logged = true;
            else this.logged = false;
        },
        
        checkNotification(){
            if(!this.logged) return;
            
            GetUnreadCount().then(res => {
                if(res) this.notiCount = res.data ? res.data : 0;
            }).catch(err => {
                console.log('check notifications error', error);
            })
        },
        contactWithWhatsApp(phone){
            window.open("https://api.whatsapp.com/send?phone=" + phone, '_blank');
        },
        gotoPage(route){
            if(route.param) this.$router.push({path: route.path, query: route.param});
            else this.$router.push(route.path);
        },
        openWindow(link){
            window.open(link, '_blank');
        }
    }
};
</script>

<style lang="scss">
.main-layout {
    .custom-items-margin {
        margin-right: 65px;
    }

    .custom-icon-margin {
        margin-right: 17px;
    }

    .wlinii-copyright {
        background-color: black;
        color: white;
        padding: 16px;
        text-align: center;
    }

    .app-footer {
        background-color: white;
    }

    @media (max-width: 764px) {
        .mobile-footer-content {
            display: none;
        }
        
    }

    .mobile-footer-content .btn{
        margin-left: 0px;
        margin-right: 0px;
    }
    .fix-footer-btn {
        .btn {
            margin-top: 0px !important;
            &:disabled {
                background-color: white !important;
            }
        }
    }

    .social-btn .btn.icon {
        margin: 0 16px;
    }
}
</style>
