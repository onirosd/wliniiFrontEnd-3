<template>
    <div class="publicacion-detalle">
        <div v-if="isLoaded" class="detalle-container">
            <w-card>
                <div class="flex flex-col-reverse md:flex-row justify-between flex-wrap">
                    <p class="subtitle bold self-start md:self-center ml-5">{{ property.name }}</p>
                    <w-btn
                        :small="true"
                        :disabled="true"
                        :dark="true"
                        class="self-start md:self-center m-btn secondary-fix-color"
                    >Comisión {{ property.comision }}
                   </w-btn>




                </div>


                <div class="flex flex-col-reverse md:flex-row justify-between flex-wrap">
                   <div class="subtitle bold self-start md:self-center ml-5"></div>
                    <w-btn
                        :small="true"
                        :disabled="true"
                        :dark="true"
                        class="self-start md:self-center m-btn secondary-fix-color"
                    >Comisión a Compartir {{ property.comision_compartir }}
                   </w-btn>

                   


                </div>
                <p class="ml-5">{{ property.dir }}</p>
                <div class="block md:hidden my-5">
                    <w-carousel
                        :items="1"
                        :pagination="false"
                        :navigation="true"
                        class="media-carousel"
                    >
                        <slide v-for="(media, i) in property.media" :key="i">
                            <div class="media-item">
                                <div class="media-source">
                                    <div class="media-banner">{{ property.state }}</div>
                                    <div  v-if="media.type == 'img'" class="media-img" :style="`background-image: url(${media.url})`"></div>
                                    <!-- <img :src="media.url" v-if="media.type == 'img'" /> -->
                                    <div v-else class="youtube-video-container">
                                        <youtube-media
                                            :video-id="media.url"
                                            player-width="100%"
                                            player-height="100%"
                                            class="youtube-video"
                                        ></youtube-media>
                                    </div>
                                    <w-icon icon="play" h="50px" v-if="media.type == 'video'"></w-icon>
                                </div>
                            </div>
                        </slide>
                    </w-carousel>
                </div>
                <div class="flex flex-row justify-between flex-wrap m-5">
                    <div class="w-full md:w-1/5 self-center">
                        <p
                            class="subtitle bold tertiary-text text-center md:text-left"
                        >{{ property.price }}</p>
                    </div>
                    <div
                        class="w-full md:w-4/5 self-center flex flex-row justify-center md:justify-end flex-wrap"
                    >
                        <div class="w-full md:w-auto">
                            <w-btn
                                color="#41C541"
                                :dark="true"
                                :fullwidth="windowWidth <= 768"
                                class="m-btn"
                                @click="contactWithWhatsApp"
                            >
                                <div class="flex flex-row justify-center md:justify-between">
                                    <w-icon icon="whatsapp" h="21px" class="self-center mr-5"></w-icon>
                                    <p class="self-center">WHATSAPP</p>
                                </div>
                            </w-btn>
                        </div>
                        <div class="w-full md:w-auto">
                            <w-btn
                                color="#000"
                                :outlined="true"
                                :fullwidth="windowWidth <= 768"
                                class="m-btn"
                                @click="downloadPublicationDetail"
                            >
                                <div class="flex flex-row justify-center md:justify-between">
                                    <w-icon icon="upload-file" h="18px" class="self-center mr-5"></w-icon>
                                    <p class="self-center">FICHA TÉCNICA</p>
                                </div>
                            </w-btn>
                        </div>
                        <div class="w-full md:w-auto">
                            <w-btn
                                color="#000"
                                :outlined="true"
                                :fullwidth="windowWidth <= 768"
                                class="m-btn"
                                @click="contactWithEmail"
                            >
                                <div class="flex flex-row justify-center md:justify-between">
                                    <w-icon icon="mail" h="13px" class="self-center mr-5"></w-icon>
                                    <p class="self-center">CONSULTAR</p>
                                </div>
                            </w-btn>
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="media-player" style="min-height: 300px; background-color: #f3f5f9;">
                        <div v-if="activeMedia">
                            <img width="100%" :src="activeMedia.url" v-if="activeMedia.type == 'img'" />
                            <div v-else class="youtube-video-container" v-aspect-ratio="'16:9'">
                                <youtube-media
                                    :video-id="activeMedia.url"
                                    :player-vars="{...videoOptions, autoplay: 1}"
                                    player-width="100%"
                                    player-height="100%"
                                    @ready="videoReady"
                                    class="youtube-video"
                                ></youtube-media>
                            </div>
                        </div>
                        <div class="media-content">
                            <div class="media-state">{{ property.state }}</div>
                            <div class="media-control" v-if="activeMedia && activeMedia.type == 'video'">
                                <w-btn :icon="true" @click="playPauseVideo">
                                    <w-icon icon="pause" h="132px" v-if="mediaPlay"></w-icon>
                                    <w-icon icon="play" h="132px" v-else></w-icon>
                                </w-btn>
                            </div>
                            <div class="media-description-container">
                                <div class="media-description">{{ property.subtitle }}</div>
                            </div>
                        </div>
                    </div>

                    <w-carousel
                        :items="4"
                        :pagination="false"
                        :navigation="true"
                        :adjustableHeight="true"
                        class="media-carousel"
                    >
                        <slide v-for="(media, i) in property.media" :key="i">
                            <div class="media-item" @click="activeMedia = media">
                                <div
                                    class="media-source"
                                    :class="activeMedia.url == media.url ? 'active' : ''"
                                >
                                    <div  v-if="media.type == 'img'" class="media-img" :style="`background-image: url(${media.url})`"></div>
                                    <!-- <img :src="media.url" v-if="media.type == 'img'" /> -->
                                    <div v-else class="youtube-video-container">
                                        <youtube-media
                                            :video-id="media.url"
                                            player-width="100%"
                                            player-height="100%"
                                            class="youtube-video"
                                        ></youtube-media>
                                    </div>
                                    <w-icon icon="play" h="50px" v-if="media.type == 'video'"></w-icon>
                                </div>
                            </div>
                        </slide>
                    </w-carousel>
                </div>
                <div class="flex flex-row">
                    <div class="p-5 md:p-10">
                        <p>Tipo Propiedad</p>
                        <p class="body bold">{{ property.type }}</p>
                    </div>
                    <div class="my-5 md:my-10">
                        <div class="vertical-divider"></div>
                    </div>
                    <div class="p-5 md:p-10">
                        <p>Publicado</p>
                        <p class="body bold">{{ property.date }}</p>
                    </div>
                </div>
                <div>
                    <w-carousel
                        :items="carrouselItems"
                        :pagination="windowWidth <= 1024"
                        :navigation="false"
                        class="feature-carousel my-5"
                    >
                        <slide class="feature-item">
                            <w-card :shadow="false" class="feature-card">
                                <div class="flex flex-col items-center">
                                    <w-icon icon="plans" h="45px"></w-icon>
                                    <p class="bold mt-5">AREA-T</p>
                                    <div class="divider my-5"></div>
                                    <p class="body bold">{{ property.areat }}</p>
                                </div>
                            </w-card>
                        </slide>
                        <slide class="feature-item">
                            <w-card :shadow="false" class="feature-card">
                                <div class="flex flex-col items-center">
                                    <w-icon icon="plans" h="45px"></w-icon>
                                    <p class="bold mt-5">AREA-C</p>
                                    <div class="divider my-5"></div>
                                    <p class="body bold">{{ property.areac }}</p>
                                </div>
                            </w-card>
                        </slide>
                        <slide class="feature-item">
                            <w-card :shadow="false" class="feature-card">
                                <div class="flex flex-col items-center">
                                    <w-icon icon="room-regular" h="45px"></w-icon>
                                    <p class="bold mt-5">DORMITORIOS</p>
                                    <div class="divider my-5"></div>
                                    <p class="body bold">{{ property.rooms }}</p>
                                </div>
                            </w-card>
                        </slide>
                        <slide class="feature-item">
                            <w-card :shadow="false" class="feature-card">
                                <div class="flex flex-col items-center">
                                    <w-icon icon="bath-regular" h="45px"></w-icon>
                                    <p class="bold mt-5">BAÑOS</p>
                                    <div class="divider my-5"></div>
                                    <p class="body bold">{{ property.bath }}</p>
                                </div>
                            </w-card>
                        </slide>
                        <slide class="feature-item">
                            <w-card :shadow="false" class="feature-card">
                                <div class="flex flex-col items-center">
                                    <w-icon icon="parking-regular" h="45px"></w-icon>
                                    <p class="bold mt-5">COCHERA</p>
                                    <div class="divider my-5"></div>
                                    <p class="body bold">{{ property.parking }}</p>
                                </div>
                            </w-card>
                        </slide>
                    </w-carousel>
                </div>
                <div class="flex flex-row justify-between flex-wrap m-10">
                    <div class="w-full md:w-1/2 md:pr-16">
                        <p class="body bold">Descripción</p>
                        <br />
                        <div class="wql-content" v-html="property.description"></div>
                        <!-- <p>{{ property.description }}</p> -->
                    </div>
                    <div class="w-full md:w-1/2 mt-8 md:mt-0 md:pl-16">
                        <p class="body bold">Características generales</p>
                        <br />
                        <ul>
                            <li v-for="(feature, i) in property.features" :key="i">• {{ feature }}</li>
                        </ul>
                        <br />
                        <p class="body bold">Servicios</p>
                        <br />
                        <ul>
                            <li v-for="(service, i) in property.services" :key="i">• {{ service }}</li>
                        </ul>
                    </div>
                </div>
            
            </w-card>
            <w-card class="my-10">
                <p class="body bold my-10">Ubicación en mapa</p>
                <mapas
                    :center="property.mapLocation.position"
                    :markers="[property.mapLocation]"
                    :showInfo="false"
                ></mapas>
            </w-card>
            <w-card class="my-10">
                <div class="perfil-agente-container">
                    <Perfil></Perfil>
                </div>
            </w-card>
        </div>

        <div class="modal" v-show="showEmailModal">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-body">
                        <form onSubmit="event.preventDefault()">
                            <w-textarea
                                label="Message"
                                placeholder=" "
                                v-model="mailForm.message"
                                :err="mailError.message"
                            ></w-textarea>
                            
                        </form>
                    </div>
                    <div class="modal-footer">
                        <w-btn
                            :small="true"
                            :dark="true"
                            @click="sendMail"
                        >Enviar</w-btn>
                        <w-btn
                            :small="true"
                            :dark="true"
                            color="error"
                            @click="showEmailModal = false"
                        >Cancelar</w-btn>
                    </div>
                </div>
            </div>
        </div>
        <overlay-page-loader :loading="pageLoading"/>
    </div>
</template>

<script>
import Mapas from "../../components/mapas/Mapas";
import Perfil from "../../components/agentes/Perfil";
import { GetPublicationDetailByID } from "@/common/publication_apis";
import { GetGeneralOptions } from "@/common/home_apis";
import { SendEmail, DownloadPropDetail } from "@/common/inmueble_apis";
import { SERVER_URL } from "@/common/config";
import { currencySymbol, notify } from "@/common/helpers";

export default {
    data: () => ({
        windowWidth: window.innerWidth,
        pageLoading: true,
        activeMedia: {
            type: "",
            url: null
        },
        downloading: false,
        videoOptions: {'controls': 0, 'rel' : 0, 'fs' : 0},
        videoPlayer: null,
        mediaPlay: false,
        inmuebletipos: null,
        comisionTypes: null,
        detail: null,
        isLoaded: false,
        isSendingEmail: false,
        showEmailModal: false,
        mailError: {},
        mailForm: {
            message: ''
        },
        property: {
            name: "",
            comision: "",
            comision_compartir:"",
            dir: "",
            price: "",
            state: "",
            description: "",
            type: "",
            date: "",
            areat: 0,
            areac: 0,
            rooms: 0,
            bath: 0,
            parking: 0,
            delivery: "Diciembre 2021",
            metersOut: "40 a 105 m²",
            metersTotals: "40 a 105 m²",
            units: "62",
            features: [],
            services: [],
            media: [],
            mapLocation: {
                position: { lat: -12.1221005, lng: -77.0315953 },
                title: "Miraflores",
                image: "/images/departamentos/8.jpg",
                dir: "Calle los ficus Mz B lt. 10",
                description: " 19 unidades 1 a 3 dormitorio 45m a 97m techados",
                precio: "86,723",
                entrega: "Inmediata",
                condicion: "Preventa en planos"
            }
        }
    }),

    components: {
        Mapas,
        Perfil
    },
    watch: {
        'mailForm.message': function(){
            this.mailError.message = null;
        },
    },
    computed: {
        carrouselItems() {
            if (this.windowWidth >= 640) {
                if (this.windowWidth >= 768) {
                    return this.windowWidth >= 1024 ? 5 : 3;
                } else {
                    return 2;
                }
            } else {
                return 1;
            }
        }
    },

    created() {
        this.publication_id = this.$route.params.id;
        

        GetGeneralOptions().then(res => {
            if(res && res.data){
                this.inmuebletipos = res.data.inmueble_types;
                this.comisionTypes = res.data.comision_types;
            }
            GetPublicationDetailByID(this.publication_id).then(res => {
                if(res && res.data){
                    this.detail = res.data;
                    this.initDetail();
                    this.initProperties();
                    this.isLoaded = true;
                }
                this.pageLoading = false;
            }).catch(err => {
                this.pageLoading = false;
                console.log('publication options...', err);
            });
        }).catch(err => {
            this.pageLoading = false;
            console.log(err);
        });
    },
    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });
    },

    methods: {
        videoReady(event){
            this.videoPlayer = event.target;
            this.videoPlayer.stopVideo();
        },
        playPauseVideo() {
            this.mediaPlay
                ? this.videoPlayer.pauseVideo()
                : this.videoPlayer.playVideo();

            this.mediaPlay = !this.mediaPlay;
        },
        initDetail(){
            let data = this.detail;
            let _media = [];

            if(data.images.length){
                data.images.map(img => {
                    _media.push({
                        type: "img",
                        url: SERVER_URL + img.Des_url
                    })
                })
            };

            if(data.Des_LinkVideo1 && this.getVideoId(data.Des_LinkVideo1)) _media.push({type: "video", url: this.getVideoId(data.Des_LinkVideo1)});
            if(data.Des_LinkVideo2 && this.getVideoId(data.Des_LinkVideo2)) _media.push({type: "video", url: this.getVideoId(data.Des_LinkVideo2)});
            if(data.Des_LinkVideo3 && this.getVideoId(data.Des_LinkVideo3)) _media.push({type: "video", url: this.getVideoId(data.Des_LinkVideo3)});

            this.activeMedia = _media[0] ? _media[0] : null;

            let _maplocation = {
                position: JSON.parse(data.Des_Coordenadas),
                title: data.Des_Titulo,
                image: _media[0] ? _media[0].url : '/images/dummy.jpg',
                isShowAddress: data.Flg_MostrarDireccion
                // dir: data.Des_DireccionManual
            }
            
            let _curSymbol = currencySymbol(data.IdTipoMoneda);

            this.property = {
                ...this.property,
                name: data.Des_Titulo,
                comision: 0,
                comision_compartir:0,
                dir: data.ubigeo.FullText + " " + data.Des_Urbanizacion,
                price: 
                _curSymbol +(data.IdTipoMoneda == 2 ? ' ':'/ ')+  new Intl.NumberFormat().format(data.Num_Precio),

                state: data.tipooperacion.Descripcion,
                description: data.Des_Subtitulo2,
                subtitle: data.Des_Subtitulo,
                type: data.tipoinmueble.Descripcion,
                date: data.FechaModificacion.substr(0, 10),
                areat: data.Num_AreaTotal ? data.Num_AreaTotal : 0,
                areac: data.Num_AreaTechado ? data.Num_AreaTechado : 0,
                rooms: data.Num_Habitaciones ? data.Num_Habitaciones : 0,
                bath: data.Num_Banios ? data.Num_Banios : 0,
                parking: data.Num_Cochera ? data.Num_Cochera : 0,

                media: _media,
                mapLocation: _maplocation
            }
        },

        initProperties(){
            let inmuebleType = this.inmuebletipos.find(e => e.IdTipoInmueble == this.detail.IdTipoInmueble);
            let properties = inmuebleType.properties;

            let featrues = [], services = [];
            properties.map(p => {
                if(p.type === 'caracteristics'){
                    if(this.detail[p.slug]) featrues.push(p.name);
                }else if(p.type === 'service'){
                    if(this.detail[p.slug]) services.push(p.name);
                }
            });
            
            let _curSymbol = currencySymbol(this.detail.IdTipoMoneda);
            let _comision  = this.comisionTypes.find(c => c.IdTipoComision == this.detail.IdTipoComision);
            if(_comision){
                if(_comision.Descripcion === "Monto") _comision = _curSymbol + parseFloat(this.detail.Num_Comision);
                else _comision = parseFloat(this.detail.Num_Comision) + '%';
            }else{
                _comision = 0;
            }


             let _comision_compartir  = this.comisionTypes.find(c => c.IdTipoComision == this.detail.IdTipoComision);
            if(_comision_compartir){
                if(_comision_compartir.Descripcion === "Monto") _comision_compartir = _curSymbol + parseFloat(this.detail.Num_ComisionCompartir);
                else _comision_compartir = parseFloat(this.detail.Num_ComisionCompartir) + '%';
            }else{
                _comision_compartir = 0;
            }

            this.property = {
                ...this.property,
                features: featrues,
                services: services,
                comision: _comision,
                comision_compartir: _comision_compartir
            }
        },

        contactWithWhatsApp(){
            let owner = this.detail.owner;
            if(!owner || !owner.Phone) return;

            window.open("https://api.whatsapp.com/send?phone=" + owner.Phone, '_blank');
        },

        downloadPublicationDetail(){
            if(this.downloading) {
                notify('warn', null, 'descargando ...');
                return;
            };

            this.downloading = true;

            let pubId = this.detail.IdPubCabecera;

            DownloadPropDetail(pubId).then(res => {
                this.downloading = false;
                let _url = URL.createObjectURL(res.data);
                
                const link = document.createElement("a");
                link.href = _url;
                link.download = 'FichaTecnica_'+this.property.name;
                document.body.appendChild(link);
                link.click();
                // window.open(_url, '_blank');
                notify('success', null, 'El documento fue descargado exitosamente');
            }).catch(err => {
                this.downloading = false;
                notify('error', null, 'Error de generación de PDF');
            });
        },

        contactWithEmail(){
            this.mailError = {};
            this.mailForm = {
                message: ''
            };
            this.showEmailModal = true;
        },

        sendMail(){
            if(this.isSendingEmail) return;
            this.isSendingEmail = true;

            let isValid = this.validateMailForm();
            if(!isValid) return;

            let payload = this.mailForm;
            payload['to'] = this.detail.IdUsuario;
            SendEmail(payload).then(res => {
                this.isSendingEmail = false;
                if(res) {
                    notify('success', null, res.data.message);
                    this.showEmailModal = false;
                }else{
                    this.isSendingEmail = false;
                    notify('error', null, 'Correo electrónico fallido');
                }
            }).catch(err => {
                this.isSendingEmail = false;
                notify('error', null, 'Correo electrónico fallido');
            })
        },

        validateMailForm(){
            const { message } = this.mailForm;
            this.mailError = {
                message: message ? null : "Esto es requerido"
            }

            // if(!this.mailError.message && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            //     this.mailError.email = 'email inválido';
            // }
            
            if(!this.mailError.message) return true;
            else return false;
        },

        getVideoId(url){
            let id = null, matched = '';
            if (matched = url.match(/(\?|&)v=([^&#]+)/)) {
                id = matched.pop();
            } else if (matched = url.match(/(\.be\/)+([^\/]+)/)) {
                id = matched.pop();
            } else if (matched = url.match(/(\embed\/)+([^\/]+)/)) {
                id = matched.pop().replace('?rel=0','');
            }
            return id;
        }
    }
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";
@import "../../css/wquill.css";

.publicacion-detalle {
    .detalle-container {
        width: 90%;
        max-width: 1180px;
        margin: auto;

        .m-btn {
            &:not(.full-width) {
                margin: 6px 18px;
            }
        }

        .secondary-fix-color {
            background-color: $secondary !important;
        }

        .media-player {
            position: relative;
            .media-content {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                padding: 26px 0px 52px 0px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                &:hover {
                    .media-control {
                        display: inline;
                    }
                }

                .media-state {
                    background-color: $secondary;
                    width: auto;
                    height: auto;
                    max-height: 45px;
                    margin-left: -16px;
                    padding: 14px 32px;
                    font-size: 13px;
                    color: white;
                    text-align: center;
                    text-transform: uppercase;
                }

                .media-control {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: none;
                }

                .media-description-container {
                    background-color: rgba($color: $primary, $alpha: 0.9);
                    align-self: flex-end;
                    padding: 32px 56px;
                    height: auto;
                    width: auto;
                    max-height: 164px;
                    max-width: 456px;

                    .media-description {
                        max-height: 96px;
                        color: white;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }

        .media-carousel {
            margin-top: -68px;
            .carousel {
                width: 95%;
                .VueCarousel {
                    .VueCarousel-navigation {
                        button {
                            padding: 0px !important;
                        }
                        .VueCarousel-navigation-prev {
                            margin-left: 38px !important;
                        }
                        .VueCarousel-navigation-next {
                            margin-right: 38px !important;
                        }
                    }
                }

                .media-item {
                    width: 100%;
                    height: 100%;
                    padding: 0px 12px;
                    cursor: pointer;
                    .media-source {
                        position: relative;
                        width: inherit;
                        height: 150px;
                        border: 4px solid #fff;
                        &.active {
                            border-color: $primary;
                        }
                        .icon {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                        img,
                        video {
                            width: inherit;
                            height: auto;
                        }
                        .media-img{
                            height: 100%;
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                        }
                        .youtube-video-container{
                            height: 100%;
                        }
                        .media-banner {
                            background-color: $secondary;
                            width: 145px;
                            height: 45px;
                            padding: 12px 32px;
                            font-size: 13px;
                            color: white;
                            text-align: center;
                            text-transform: uppercase;
                            position: absolute;
                        }
                    }
                }
            }
        }

        .vertical-divider {
            width: 0px;
            height: 100%;
            border: 1px solid rgba($color: #000000, $alpha: 0.66);
        }
        .feature-carousel {
            .carousel {
                width: 100%;
                padding: 0px 20px;
                .feature-item {
                    padding: 0px 20px;
                    .feature-card {
                        .card-text {
                            background-color: $primary;
                            color: white;
                            .divider {
                                width: 72px;
                                height: 0px;
                                border: 1px solid $tertiary;
                            }
                        }
                    }
                }
            }
        }
        .feature-banner {
            background-color: rgba($color: #8291a7, $alpha: 0.15);
            border-radius: 15px;
            padding: 32px 0px;
            margin: 0px 24px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: nowrap;
            .banner-item {
                padding: 0px 24px;
                &:not(:first-child) {
                    border-left: 1px solid rgba($color: #000000, $alpha: 0.66);
                }
            }
        }
        .perfil-agente-container {
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
    }
}

@media (max-width: 768px) {
    .publicacion-detalle {
        .detalle-container {
            width: 95%;
        }
    }

    .media-carousel {
        margin-top: 0px !important;
        .carousel {
            width: 100% !important;
            .VueCarousel {
                .VueCarousel-navigation {
                    button {
                        height: 35px !important;
                        width: 35px !important;
                        padding: 0px !important;
                        img {
                            height: inherit !important;
                        }
                    }
                }
            }
            .media-item {
                padding: 0px 2px !important;
                .media-source {
                    border: none !important;
                }
            }
        }
    }

    .feature-carousel {
        .carousel {
            .feature-item {
                padding: 0px 60px !important;
            }
        }
    }

    .feature-banner {
        margin: 0px !important;
        padding: 16px 0px !important;
        flex-wrap: wrap !important;
        .banner-item {
            padding: 12px 24px !important;
            border: none !important;
        }
    }

    
}


.youtube-video-container{
    position: relative;    
 
    .youtube-video{
        position: absolute;
        width: 100%;
        height: 100%;
    }
}
</style>
