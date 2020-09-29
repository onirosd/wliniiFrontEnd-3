<template>
    <!-- 
        
        inicio (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/)
        logeado-inicio (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/a761e489-2781-4fc0-8d1f-6853ec803c9b/logeado-inicio)
        MB-inicio (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/44d3fef0-9f22-4e6b-a5a9-688fbb628403/MB-inico)
        MB-inicio-logueo (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/f4572e37-78b9-48ad-9f33-4ca30e529602/MB-inico-logeo)

    -->

    <div class="home">
        <!-- BANNER PRINCIPAL -->

        <w-parallax image="/images/banners/4.png" :height="parallaxHeight">
            <div
                class="flex flex-row justify-center lg:justify-between flex-wrap lg:flex-no-wrap home-container"
            >
                <div class="w-full md:w-2/3 lg:w-2/3 mb-10 lg:md-0 self-center">
                    <h1 class="home-title bold white-text">La Herramienta Web de los Agentes Inmobiliarios</h1>
                </div>
                <div class="hidden lg:block w-1/3"></div>
                <div class="w-full md:w-2/3 lg:w-2/3 self-center">
                    <w-card :shadow="false" class="banner-card" style="overflow: visible">
                        <div class="flex flex-row items-center">
                            <h1 class="body bold white-text">Busqueda</h1>
                            <w-icon icon="map" h="17px"></w-icon>
                        </div>
                        <!-- <p class="white-text mt-5 hidden md:block">
                            Atención!! Se filtraran las propiedades en el mapa
                            automáticamente se elija la condición
                        </p> -->
                        {{provamos}}
                        <form class="mt-10" @submit.prevent>
                            <w-filterselect 
                                :dark="true"
                                color="tertiary"
                                label="Buscar"
                                placeholder=" "
                                :options="locations"
                                v-model="homeForm.buscar"
                            />
                            <w-select
                                :dark="true"
                                color="tertiary"
                                label="Tipo de Operación"
                                placeholder=""
                                :options="operaciones"
                                v-model="homeForm.operacion"
                            ></w-select>
                            <w-select
                                :dark="true"
                                color="tertiary"
                                label="Tipo de inmueble"
                                placeholder=""
                                :options="inmueblelist"
                                v-model="homeForm.inmueble"
                            ></w-select>
                            <w-checkbox
                                :dark="true"
                                label="¿Mostrar busqueda en el mapa?"
                                style=" font-size:30px;"
                                v-model="homeForm.mapa"

                                color="tertiary"
                            ></w-checkbox>
                            <w-btn
                                :rounded="true"
                                :fullwidth="true"
                                color="tertiary"
                                :dark="true"
                                @click="searchInmueble"
                            >Buscar</w-btn>
                        </form>
                    </w-card>
                </div>
            </div>
            <div class="parallax-tag">
                <div
                    class="flex flex-row justify-center md:justify-start flex-wrap lg:flex-no-wrap"
                >
                    <div class="w-2/2 lg:w-2/3 flex flex-row justify-center md:justify-start">
                        <w-icon icon="lock" h="45px" class="hidden md:block mt-3 mr-5"></w-icon>
                        <div>
                            <p
                                class="body subtitle-md light white-text text-center md:text-left"

                            >¿ Eres Agente Inmobiliario ?</p>
                            <p
                                class="body tertiary-text text-center md:text-left"
                            >solicíta tu cuenta en pocos minutos</p>
                        </div>
                    </div>
                    <div class="hidden md:block md:w-1/3"></div>
                    <div v-if="!isLogged" class="w-full md:w-1/3 mb-2 flex flex-row justify-center">
                        <w-btn
                            color="secondary"
                            :dark="true"
                            :fullwidth="true"
                            style="max-height: 56px !important;"
                            @click="$router.push('/register')"
                        >REGISTRA TU CUENTA AHORA</w-btn>
                    </div>
                </div>
            </div>
        </w-parallax>
        <div class="home-fix"></div>
        <!-- PORQUE WLINII -->
        <div class="flex flex-row justify-center">
            <h1 class="subtitle bold">¿Porqué usar Wlinii?</h1>
        </div>
        <div class="divider"></div>
        <div class="flex flex-row justify-between flex-wrap">
            <div class="w-3/3 md:w-1/3 home-item">
         <!--        <w-icon icon="house-man" h="130px"></w-icon> -->
                <w-icon icon="house-graph_1" h="130px"></w-icon>
                <p class="body bold mt-5">Inventario compartido</p>
                <p class="mt-5">
                    Encontrarás la mayor cantidad de agentes inmobiliarios que comparten comisiones y el inventario más grande de inmuebles compartidos
                </p>
            </div>
            <div class="w-3/3 md:w-1/3 home-item">
                <w-icon icon="building-price" h="130px"></w-icon>
                <p class="body bold mt-5">Aumenta tus cierres</p>
                <p class="mt-5">
                   Wlinii facilita la búsqueda de tus pedidos aumentando la cantidad de cierres de operaciones inmobiliarias.
                </p>
            </div>
            <div class="w-3/3 md:w-1/3 home-item">
              <!--   <w-icon icon="house-secure" h="130px"></w-icon> -->
                <w-icon icon="building_1" h="130px"></w-icon>
                <p class="body bold mt-5">Confiabilidad y experiencia</p>
                <p class="mt-5">
                    Wlinii es una herramienta web hecha por agentes inmobiliarios para agentes inmobiliarios.
                </p>
            </div>
        </div>
        <!-- CAROUSELES -->
        <div class="white">
            <!-- PROPIEDADES -->
            <div class="flex flex-row justify-center">
                <w-icon icon="lock" h="45px" class="mt-5"></w-icon>
            </div>
            
            <div class="flex flex-row justify-center mt-5">
                <h1 class="subtitle bold">Propiedades</h1>
            </div>
            <div class="divider"></div>
            <div class="flex flex-row justify-center mt-5">
                <w-btn :outlined="true" color="tertiary" @click="gotoInmuebles('featured')">
                    <p class="body bold">
                        <span class="secondary-text">+</span> MÁS DESTACADOS
                    </p>
                </w-btn>
            </div>
            <w-carousel
                class="mt-10"
                :background="windowWidth >= 768 ? 'images/banners/1.png' : ''"
                :items="carrouselItems"
                :pagination="windowWidth < 768"
                :navigation="windowWidth >= 768"
            >
                <slide v-for="(card, i) in featuredCards" :key="i">
                    <div @click="gotoPublicationDetail(card)" class="px-10 lg:px-5" style="margin-bottom: 15px">
                        <w-card :image="card.image" :pointer="true" hover="full-hover">
                            <template slot="image">
                                <p class="bold">{{ card.direccion }}</p>
                                <p class="mt-5">{{ card.descripcion }}</p>
                            </template>
                            <template slot="state">
                                <p class="white-text">{{ card.tipo }}</p>
                            </template>
                            <br />
                            <p class="bold">{{ card.title }}</p>
                            <p>{{ card.body }}</p>
                            <div v-if="isManager">
                                <!-- <p>Comisión</p> -->
                                <div class="flex flex-row justify-between">
                                    <div><p>Comisión</p><p class="body bold">{{ card.comision }}</p></div>
                                    <div><p>Precio</p><p class="body bold tertiary-text">{{ card.mes }}</p></div>
                                </div>
                            </div>

                            <template v-if="isManager" slot="footer">
                                <div class="flex flex-row justify-between">
                                    <div class="flex flex-row justify-between">
                                        <div class="info-item">
                                            <w-icon icon="room-solid" h="12px"></w-icon>
                                            <p class="white-text">{{ card.info.habitaciones }}</p>
                                        </div>
                                        <div class="info-item">
                                            <w-icon icon="bath-solid" h="15px"></w-icon>
                                            <p class="white-text">{{ card.info.baños }}</p>
                                        </div>
                                        <div class="info-item">
                                            <w-icon icon="parking-solid" h="12px"></w-icon>
                                            <p class="white-text">{{ card.info.estacionamiento }}</p>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <w-icon icon="size" h="15px"></w-icon>
                                        <p class="white-text">{{ card.info.tamaño }}</p>
                                    </div>
                                </div>
                            </template>
                        </w-card>
                    </div>
                </slide>
            </w-carousel>
            <!-- INGRESOS -->
            <div class="flex flex-row justify-center mt-20">
                <w-btn :outlined="true" color="tertiary"  @click="gotoInmuebles('latest')">
                    <p class="body bold">ÚLTIMOS INGRESOS</p>
                </w-btn>
            </div>
            <w-carousel
                class="mt-10"
                :background="windowWidth >= 768 ? 'images/banners/1.png' : ''"
                :items="carrouselItems"
                :pagination="windowWidth < 768"
                :navigation="windowWidth >= 768"
            >
                <slide v-for="(card, i) in latestCards" :key="i">
                    <div @click="gotoPublicationDetail(card)" class="px-10 lg:px-5" style="margin-bottom: 15px">
                        <w-card :image="card.image" :pointer="true" hover="full-hover">
                            <template slot="image">
                                <p class="bold">{{ card.direccion }}</p>
                                <p class="mt-5">{{ card.descripcion }}</p>
                            </template>
                            <template slot="state">
                                <p class="white-text">{{ card.tipo }}</p>
                            </template>
                            <p class="bold">{{ card.title }}</p>
                            <p>{{ card.body }}</p>
                            <div v-if="isManager">
                              

                           
                                <div class="flex flex-row justify-between">
                                    <div><p>Comisión</p><p class="body bold">{{ card.comision }}</p></div>
                                    <div><p>Precio</p><p class="body bold tertiary-text">{{ card.mes }}</p></div>
                                </div>

                            </div>

                            <template v-if="isManager" slot="footer">
                                <div class="flex flex-row justify-between">
                                    <div class="flex flex-row justify-between">
                                        <div class="info-item">
                                            <w-icon icon="room-solid" h="12px"></w-icon>
                                            <p class="white-text">{{ card.info.habitaciones }}</p>
                                        </div>
                                        <div class="info-item">
                                            <w-icon icon="bath-solid" h="15px"></w-icon>
                                            <p class="white-text">{{ card.info.baños }}</p>
                                        </div>
                                        <div class="info-item">
                                            <w-icon icon="parking-solid" h="12px"></w-icon>
                                            <p class="white-text">{{ card.info.estacionamiento }}</p>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <w-icon icon="size" h="15px"></w-icon>
                                        <p class="white-text">{{ card.info.tamaño }}</p>
                                    </div>
                                </div>
                            </template>
                        </w-card>
                    </div>
                </slide>
            </w-carousel>
            <div class="flex flex-row justify-center mt-10">
                <w-btn
                    :dark="true"
                    :large="true"
                    @click="gotoInmuebles()"
                >VER MÁS PROPIEDADES</w-btn>
            </div>
            
            <!-- AGENTES -->
            <div class="flex flex-row justify-center mt-20">
                <h1 class="subtitle bold">Agentes</h1>
            </div>
            <div class="divider"></div>
            <div class="flex flex-row justify-center mt-5">
                <div class="w-2/3 md:1/3">
                    <p class="text-center">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Donec odio. Quisque volutpat mattis eros. Nullam
                        malesuada erat ut turpis. Suspendisse urna nibh, viverra
                        non, semper suscipit, posuere a, pede.
                    </p>
                </div>
            </div>
            <w-carousel
                :background="windowWidth >= 768 ? 'images/banners/1.png' : ''"
                :items="carrouselItemsAgentes"
                :pagination="windowWidth < 768"
                :navigation="windowWidth >= 768"
                class="agent-carousel mt-10"
            >
                <slide v-for="(agent, i) in agents" :key="i">
                    <div @click="agent.id && $router.push({path: '/agente', query: {id: agent.id}})" class="px-10 lg:px-5">
                        <w-card :image="agent.image" :pointer="true" hover="top-hover">
                            <template slot="image">
                                <div style="margin-top: 160px;">
                                    <div class="flex flex-row justify-center">
                                        <div
                                            class="w-full flex flex-row justify-between items-center px-8"
                                        >
                                            <w-icon icon="mail-white" h="16px"></w-icon>
                                            <w-icon icon="facebook-white" h="20px"></w-icon>
                                            <w-icon icon="instagram-white" h="18px"></w-icon>
                                            <w-icon icon="twitter-white" h="18px"></w-icon>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="flex flex-row justify-between">
                                <div class="w-auto flex flex-row justify-between self-center">
                                    <w-icon
                                        style="margin: 0px 2px !important;"
                                        icon="star-brown"
                                        h="13px"
                                        v-for="i in 5"
                                        :key="i"
                                    ></w-icon>
                                </div>
                                <div class="w-auto flex flex-row justify-end">
                                    <w-btn
                                        style="margin: 0px !important;"
                                        :rounded="true"
                                        :small="true"
                                        :outlined="true"
                                        color="secondary"
                                    >
                                        <p class="secondary-text">ver más</p>
                                    </w-btn>
                                </div>
                            </div>
                            <div class="w-full mt-3 mb-2">
                                <p
                                    class="bold text-center"
                                    style="white-space: nowrap;"
                                >{{ agent.name }}</p>
                            </div>
                            <hr style="border-color: #9e9e9e;" />
                            <div class="flex flex-row justify-center items-center mt-2">
                                <w-icon icon="phone-brown" h="13px" class="mr-2"></w-icon>
                                <p>{{ agent.tel }}</p>
                            </div>
                            <template slot="footer">
                                <p class="text-center white-text">{{ agent.posts }} Pub. Activas</p>
                            </template>
                        </w-card>
                    </div>
                </slide>
            </w-carousel>

            <!-- BANNER MERCADO -->
            <div class="publi-banner mt-20" style="background-image: url('/images/banners/2.png')">
                <div class="flex flex-row justify-center md:justify-end py-16">
                    <div class="flex flex-col justify-center items-center">
                        <w-icon icon="lock-transparent" h="217px" class="absolute"></w-icon>
                        <p class="subtitle light white-text">Realiza el Análisis de Mercado Comparativo </p>
                        <p class="subtitle light white-text">de tu cliente desde Wlinii. </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- NOTICIAS -->
        <div class="flex flex-row justify-center mt-20">
            <h1 class="subtitle bold">Noticias</h1>
        </div>
        <div class="divider"></div>
        <div class="flex flex-row justify-between flex-wrap px-10 mt-10">
            <div
                class="w-full md:w-1/2 lg:w-1/3 p-5 px-0 md:px-5"
                v-for="(noti, i) in news"
                :key="i"
            >
              <div @click="gotoNoticiasDetail(noti)" >
                 <w-card  :image="noti.image" :pointer="true" imageHeight="200px" state="tile" >
                    <template slot="state">
                        <p class="body bold white-text">{{ parseDate(noti.fecpub).day }}</p>
                        <p class="caption bold white-text">{{ parseDate(noti.fecpub).month }}</p>
                    </template>
                    <p class="body bold mt-5">{{ noti.title }}</p>
                    <p>{{ noti.body }}</p>
                 </w-card>
                </div>
            </div>
        </div>

        <!-- BANNER ESTADISTICAS -->
        <div class="graph-banner mt-20" style="background-image: url('/images/banners/3.png')">
            <div class="flex flex-row justify-between flex-wrap">
                <div class="w-full md:mt-20 md:w-2/4 lg:mt-0 lg:w-1/4">
                    <div class="flex flex-col justify-center items-center">
                        <w-icon icon="house-price" h="130px"></w-icon>
                       <!--  <p class="subtitle title-md bold white-text mt-5">755 300</p> -->
                        <p class="caption bold white-text">TRANSACCIONES REALIZADAS</p>
                    </div>
                </div>
                <div class="w-full mt-20 md:w-2/4 lg:mt-0 lg:w-1/4">
                    <div class="flex flex-col justify-center items-center">
                        <w-icon icon="house-care" h="130px"></w-icon>
                   <!--      <p class="subtitle title-md bold white-text mt-5">17 620</p> -->
                        <p class="caption bold white-text">AGENTES EN LINEA</p>
                    </div>
                </div>
                <div class="w-full mt-20 md:w-2/4 lg:mt-0 lg:w-1/4">
                    <div class="flex flex-col justify-center items-center">
                        <w-icon icon="building" h="130px"></w-icon>
                   <!--      <p class="subtitle title-md bold white-text mt-5">790</p> -->
                        <p class="caption bold white-text">INMOBILIARIA</p>
                    </div>
                </div>
                <div class="w-full mt-20 md:w-2/4 lg:mt-0 lg:w-1/4">
                    <div class="flex flex-col justify-center items-center">
                        <w-icon icon="house-graph" h="130px"></w-icon>
                   <!--      <p class="subtitle title-md bold white-text mt-5">1 580 715</p> -->
                        <p class="caption bold white-text">MONTOS DE TRANSACCIÓN</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { currencySymbol } from "@/common/helpers";
import { GetGeneralOptions, GetNews, TestRequest } from "@/common/home_apis";
import { GetFeaturedInmuebles, GetLatestInmuebles } from "@/common/inmueble_apis";
import { GetResumenAgentes } from "@/common/agente_apis";
import { SERVER_URL } from "@/common/config";


export default {
    data: () => ({
        provamos : "",
        isManager: false,
        isLogged : false,
        homeForm: {},
        windowWidth: window.innerWidth,
        defaultOptions: null,
        locations: [],
        operaciones: [],
        inmueblelist: [],
        featuredCards: [],
        latestCards: [],
        agents: [],
        news: [],
        tipooperacion:{}
    }),

    computed: {
        parallaxHeight() {
            if (this.windowWidth >= 768) {
                return this.windowWidth <= 1024 ? "150" : "140";
            } else {
                return "130";
            }
        },

        carrouselItems() {
            if (this.windowWidth >= 768) {
                return this.windowWidth >= 1024 ? 3 : 2;
            } else {
                return 1;
            }
        },

        carrouselItemsAgentes() {
            if (this.windowWidth >= 640) {
                if (this.windowWidth >= 1024) {
                    return this.windowWidth >= 1280 ? 4 : 3;
                } else {
                    return this.windowWidth >= 1024 ? 3 : 2;
                }
            } else {
                return 1;
            }
        }
    },

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });

        let userToken = this.$store.getters.token;
        let user = this.$store.getters.user;
        if(userToken && user){

             this.isLogged  = true;
            if(user.type == "1" || user.type == "2") {
                
                this.isManager = true;
               
            }
        } 

        GetGeneralOptions().then(res => {
            if(res) this.initOptions(res.data);
            this.tipooperacion = res.data;

            GetFeaturedInmuebles().then(res => {
                if(res) this.initInmuebles(res.data, 'featured');
            }).catch(err => {
                console.log('featured inmuebles error', err);
            });

            GetLatestInmuebles().then(res => {
                if(res) this.initInmuebles(res.data, 'latest');
            }).catch(err => {
                console.log('latest inmuebles error', err);
            });

            GetResumenAgentes().then(res => {
                if(res) this.initAgentList(res.data);
            }).catch(err => {
                console.log('agentes error', err);
            });

            GetNews().then(res =>{
                if(res) this.initNewsList(res.data);
            }).catch(err => {
                console.log('news error', err);
            })
        }).catch(err => {
            console.log('home filters error');
        });
    },
    watch: {
     'homeForm.operacion': function(value, before){
            if(value === before) return;
            this.provamos = "";

            //this.updateProvinces(value);

            if(value === "Traspaso") {

                this.inmueblelist = [];
                this.tipooperacion.inmueble_types.map(i => { 

                    if(i.IdTipoInmueble == 4 || i.IdTipoInmueble == 5 || i.IdTipoInmueble == 6 || i.IdTipoInmueble == 7){
                           this.inmueblelist.push(i.Descripcion); 
                    }
                   

                });
                 
            }else{

                this.inmueblelist = [];
                this.tipooperacion.inmueble_types.map(i => { this.inmueblelist.push(i.Descripcion); });

            }
        }

     },
    methods: {
        initOptions(options){
            this.defaultOptions = options;

            this.locations = [];
            options.locations.map(l => { this.locations.push(l.FullText); });

            this.operaciones = [];
            options.operation_types.map(o => { this.operaciones.push(o.Descripcion); });

            this.inmueblelist = [];
            options.inmueble_types.map(i => { this.inmueblelist.push(i.Descripcion); });
        },
        initInmuebles(data, type){
            if(!data || !data.length){
                if(type === 'featured') this.featuredCards = [];
                else if(type === 'latest') this.latestCards = [];
                return;
            }

            let _pub = [];
            data.map(p => {
                let _curSymbol = currencySymbol(p.IdTipoMoneda);
                let _operacion = this.defaultOptions.operation_types.find(o => o.IdTipoOperacion === p.IdTipoOperacion);

                let _addr = this.defaultOptions.locations.find(a => a.IdUbigeo === p.IdUbigeo);
                if(_addr) _addr = _addr.Distrito + ( p.Des_Urbanizacion ? ', ' + p.Des_Urbanizacion : '');
                else _addr = '';

                let _comision = this.defaultOptions.comision_types.find(c => c.IdTipoComision === p.IdTipoComision);
                if(_comision){
                    if(_comision.Descripcion === "Monto") _comision = _curSymbol + parseFloat(p.Num_Comision);
                    else _comision = parseFloat(p.Num_Comision) + '%';
                }else{
                    _comision = 0;
                }

                let _banios        = p.Num_Banios ? p.Num_Banios : 0;
                let _banios_visita = p.Num_BaniosVisita ? p.Num_BaniosVisita : 0;
                let _banios_total  = _banios + _banios_visita; 

                _pub.push({
                    IdPubCabecera : p.IdPubCabecera,
                    tipo: _operacion ? _operacion.Descripcion : null,
                    title: p.Des_Titulo,
                    body: _addr,
                    image: p.images.length ? SERVER_URL + p.images[0].Des_url : 'images/dummy.jpg',
                    comision: _comision,
                    mes: _curSymbol + '/ ' + parseFloat(p.Num_Precio),
                    direccion: '',
                    descripcion: '',
                    info: {
                        habitaciones: p.Num_Habitaciones ? p.Num_Habitaciones : 0,
                        baños: _banios_total,
                        estacionamiento: p.Num_Cochera ? p.Num_Cochera : 0,
                        tamaño: (p.Num_AreaTotal ? p.Num_AreaTotal : 0) + 'M2'
                    },
                });
            })

            if(type === 'featured') this.featuredCards = _pub;
            else if(type === 'latest') this.latestCards = _pub;
        },
        initAgentList(data){
            this.agents = [];
            if(!data || !data.length) return;

            data.map(a => {
                this.agents.push({
                    id: a.persona && a.persona.IdPersonal.trim(),
                    image: a.persona && a.persona.Img_Personal ? SERVER_URL + a.persona.Img_Personal : "/images/dummy_user.jpg",
                    name: a.Des_NombreCompleto ? a.Des_NombreCompleto : "DESCONOCIDO",
                    tel: a.persona && a.persona.Des_Telefono1,
                    posts: a.Num_Activas ? parseInt(a.Num_Activas) : 0
                })
            })
        },
        initNewsList(data){
            this.news = [];
            if(!data || !data.length) return;

            data.map(n => {
                this.news.push({
                    date: n.FechaCreacion ? n.FechaCreacion.substr(0, 10) : '',
                    image: n.Image ? SERVER_URL + n.Image : "/images/dumy_news.jpg",
                    title: n.Titulo,
                    body: n.Descripcion,
                    fecpub:n.FechaCurso,
                    idnoticias:n.IdNoticias
                });
            });
        },
        parseDate(date) {
            let parseDate = {
                day: moment(date).format("DD"),
                month: moment(date).format("MMM")
            };

            return parseDate;
        },
        searchInmueble(){
            let _query = {
                buscar: this.homeForm.buscar ? this.homeForm.buscar : null,
                inmueble: this.homeForm.inmueble ? this.homeForm.inmueble: null,
                operacion: this.homeForm.operacion ? this.homeForm.operacion: null,                                
            }

            if(this.homeForm.mapa){
                this.$router.push({path: '/inmuebles/mapa', query: _query});
            }else{
                this.$router.push({path: '/inmuebles', query: _query});
            }
        },
        gotoInmuebles(type){
            if(type === 'featured'){
                this.$router.push({path: '/inmuebles', query: {featured: true}});
                // if( this.featuredCards.length ) this.$router.push({path: '/inmuebles', query: {featured: true}});
                // else return;
            } else if(type === 'latest') this.$router.push({path: '/inmuebles', query: {latest: true}});
            else this.$router.push('/inmuebles');
        },
        gotoPublicationDetail(pub){
            if(!this.isManager) return;
            this.$router.push('/publicaciones/detalle/' + pub.IdPubCabecera.trim());
        },
        gotoNoticiasDetail(noti){
            // if(!this.isManager) return;
            this.$router.push('/noticias/detalle/' + noti.idnoticias.trim());
        },
        contactWithWhatsApp(){
            let owner = this.detail.owner;
            if(!owner || !owner.Phone) return;

            window.open("https://api.whatsapp.com/send?phone=" + owner.Phone, '_blank');
        },
    }
};
</script>

<style lang="scss">
@import "../components/wlinii_components/sass/_variables.scss";
.home {
    .home-container {
        padding: 165px 150px 0px 150px;
        .home-title {
            font-size: 55px;
            font-weight: bold;
            text-align: left;
            color: white;
        }
    }
    .banner-card {
        &.card {
            &:not(.active-state) {
                &:not(:hover) {
                    background: transparent !important;
                }
            }
            &:hover {
                background-color: transparent !important;
            }
            .card-text {
                background-color: rgba($color: #000000, $alpha: 0.66);
                padding-right: 50px;
                padding-left: 50px;
            }

            .icon {
                margin-left: 10px;
            }
        }
    }

    .parallax-tag {
        position: absolute;
        bottom: -86px;
        left: 5%;
        width: 90%;
        background-color: $primary;
        border-top: 2px solid $tertiary;
        padding: 32px 64px;
        border-radius: 0px 0px 15px 15px;
    }

    .home-fix {
        border: 2px solid transparent;
        margin-bottom: 128px;
    }

    .divider {
        height: 0px;
        width: 32px;
        border: thin solid $tertiary;
        margin: auto;
    }

    .home-item {
        text-align: center;
        padding: 50px;
        .icon {
            img {
                margin: auto !important;
            }
        }
    }

    .agent-carousel {
        .carousel {
            width: 95%;
            .VueCarousel {
                .VueCarousel-navigation {
                    button {
                        padding: 0px !important;
                    }
                    .VueCarousel-navigation-prev {
                        margin-left: 48px !important;
                    }
                    .VueCarousel-navigation-next {
                        margin-right: 48px !important;
                    }
                }
            }
        }
    }

    .publi-banner {
        // background-image: url("/images/banners/2.png");
        text-align: center;
    }

    // .graph-banner {
    //     background-image: url("/images/banners/3.png");
    // }

    .publi-banner,
    .graph-banner {
        background-size: cover;
        background-position: center center;
        padding: 85px 75px;
    }
}

@media (max-width: 1024px) {
    .home {
        .home-container {
            padding: 165px 48px 0px 48px;
            .home-title {
                font-size: 45px;
                font-weight: bold;
                text-align: center;
                color: white;
            }
        }
    }

    .parallax-tag {
        bottom: -216px !important;
        width: 95% !important;
        left: 2.5% !important;
    }

    .home-fix {
        margin-bottom: 250px !important;
    }
}

@media (max-width: 768px) {
    .home {
        .home-container {
            padding: 128px 48px 0px 48px;
            .home-title {
                font-size: 30px;
            }
        }

        .banner-card {
            &.card {
                .card-text {
                    padding-right: 24px;
                    padding-left: 24px;
                }
            }
        }
    }

    .publi-banner {
        background-position: top right !important;
        padding-right: 12px !important;
        padding-left: 12px !important;
    }

    .parallax-tag {
        bottom: -190px !important;
        left: 0 !important;
        width: 100% !important;
        border-top: none !important;
    }

    .home-fix {
        margin-bottom: 300px !important;
    }
}
</style>
