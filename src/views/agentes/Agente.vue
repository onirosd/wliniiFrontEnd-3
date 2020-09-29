<template>
    <!-- 
        
        perfil-del-agente-trabajador (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/a82326a5-df19-4a0b-8bf3-0ffc9ebacba4/-perfil-del-agente-trabajador)
        perfil-del-agente-trabajador-1 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/04b236a4-6d84-48b4-95bf-0128bbd86c67/-perfil-del-agente-trabajador-1)
        MB-perfil-del-agente-trabajador (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/78ea51c5-58e6-478d-abb9-a31678b41cf0/MB-perfil-del-agente-trabajador)

    -->

    <div>
        <!-- PERFIL -->
        <div class="agente-container">
            <w-card :shadow="false">
                <Perfil></Perfil>
            </w-card>
        </div>
        <!-- ULTIMOS INGRESOS -->
        <div class="flex flex-row justify-center mt-20">
            <w-btn :outlined="true" color="tertiary" @click="gotoInmuebles('latest')">
                <p class="body bold">ÚLTIMOS INGRESOS</p>
            </w-btn>
        </div>
        <w-carousel
            class="mt-10"
            :items="carrouselItems"
            :pagination="windowWidth < 768"
            :navigation="windowWidth >= 768"
        >
            <slide v-for="(card, i) in latestCards" :key="i">
                <div @click="$router.push('/publicaciones/detalle')" class="px-5">
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
                        <p>Comisión</p>
                        <div class="flex flex-row justify-between">
                            <p class="body bold">{{ card.comision }}</p>
                            <p class="body bold tertiary-text">{{ card.mes }}</p>
                        </div>

                        <template slot="footer">
                            <div class="flex flex-row justify-between flex-wrap">
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

        <!-- MAS DESTACADOS -->
        <div class="flex flex-row justify-center mt-5">
            <w-btn :outlined="true" color="tertiary" @click="gotoInmuebles('featured')">
                <p class="body bold">
                    <span class="secondary-text">+</span> MÁS DESTACADOS
                </p>
            </w-btn>
        </div>
        <w-carousel
            class="mt-10"
            :background="windowWidth >= 768 ? '/images/banners/1.png' : ''"
            :items="carrouselItems"
            :pagination="windowWidth < 768"
            :navigation="windowWidth >= 768"
        >
            <slide v-for="(card, i) in featuredCards" :key="i">
                <div @click="$router.push('/publicaciones/detalle')" class="px-5">
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
                        <p>Comisión</p>
                        <div class="flex flex-row justify-between">
                            <p class="body bold">{{ card.comision }}</p>
                            <p class="body bold tertiary-text">{{ card.mes }}</p>
                        </div>

                        <template slot="footer">
                            <div class="flex flex-row justify-between flex-wrap">
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
        <overlay-page-loader :loading="pageLoading"/>
        <br />
    </div>
</template>

<script>
import { currencySymbol } from "@/common/helpers";
import { GetGeneralOptions } from "@/common/home_apis";
import Perfil from "../../components/agentes/Perfil";
import { GetFeaturedInmueblesByUser, GetLatestInmueblesByUser } from "@/common/inmueble_apis";
import { SERVER_URL } from "@/common/config";

export default {
    data() {
        return {
            windowWidth: window.innerWidth,
            pageLoading: true,
            defaultOptions: null,
            featuredCards: [],
            latestCards: [],
        };
    },

    components: {
        Perfil
    },

    computed: {
        carrouselItems() {
            if (this.windowWidth >= 768) {
                return this.windowWidth >= 1024 ? 3 : 2;
            } else {
                return 1;
            }
        }
    },

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });

        let params = this.$route.query;

        GetGeneralOptions().then(res => {
            if(res) this.initOptions(res.data);

            GetFeaturedInmueblesByUser(params.id).then(res => {
                if(res) this.initInmuebles(res.data, 'featured');
            }).catch(err => {
                console.log('featured inmuebles error', err);
            });

            GetLatestInmueblesByUser(params.id).then(res => {
                if(res) this.initInmuebles(res.data, 'latest');
            }).catch(err => {
                console.log('latest inmuebles error', err);
            });
        }).catch(err => {
            console.log('home filters error');
        });
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
                    if(_comision.Descripcion === "Monto") _comision = _curSymbol+ parseFloat(p.Num_Comision);
                    else _comision = parseFloat(p.Num_ComisionCompartir) + '%';
                }else{
                    _comision = 0;
                }

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
                        baños: p.Num_Banios ? p.Num_Banios : 0,
                        estacionamiento: p.Num_Cochera ? p.Num_Cochera : 0,
                        tamaño: (p.Num_AreaTotal ? p.Num_AreaTotal : 0) + 'M2'
                    },
                });
            })

            if(type === 'featured') this.featuredCards = _pub;
            else if(type === 'latest') this.latestCards = _pub;

            this.pageLoading = false;
        },
        gotoInmuebles(type){
            if(type === 'featured'){
                if( this.featuredCards.length ) this.$router.push({path: '/inmuebles', query: {featured: true}});
                else return;
            } else if(type === 'latest') this.$router.push({path: '/inmuebles', query: {latest: true}});
            else this.$router.push('/inmuebles');
        }
    }
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.agente-container {
    width: 90%;
    margin: auto;

    .divider {
        height: 0px;
        width: 32px;
        border: thin solid $tertiary;
    }

    .full-divider {
        height: 0px;
        width: 100%;
        border: thin solid rgba($color: $primary, $alpha: 0.12);
    }
}
</style>
