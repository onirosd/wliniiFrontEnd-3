<template>
	<div class="ml-10 my-10 md:ml-20">
		 <div class=" flex precios-container text-2xl ">
            <w-card :shadow="false">

               <h2 class="title p-1">{{title}}</h2>
               <h4 class="subtitle p-1">{{subtitulo}}</h4>

               <h6 style="color:#9f8528; font-weight: bold;"> Fecha de Realización : {{fecpub}}</h6>

  

             
<!-- BANNER MERCADO -->
            <div class="mt-20" :style="`background-image: url(${image})`"
             style = " background-repeat: no-repeat;  background-position: center;">

                <div class="flex flex-row justify-center md:justify-end py-56">
                    <div class="flex flex-col justify-center items-center">

                    </div>
                </div>
            </div>


   <div class="flex flex-row justify-center  ">
                    <div class="flex flex-col justify-left ">
                     {{body}}
               
                    </div>
                </div>


            </w-card>


           
        </div>
        <br>
	</div>
</template>	




<script>
	
import moment from "moment";
import { currencySymbol } from "@/common/helpers";
import { GetGeneralOptions, GetNewsId, TestRequest } from "@/common/home_apis";
import { SERVER_URL } from "@/common/config";



export default {
    data: () => ({
        isManager: false,
        isLogged : false,
        homeForm: {},
        windowWidth: window.innerWidth,
        defaultOptions: null,
        locations: [],
        detail: null,
        
                date: "2020-01-25",
                image: "/images/departamentos/6.jpg",
                title: "",
                body:  "",
                subtitulo: "",
                fecpub : ""
          
       
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
        }
    },
    created(){

     this.publication_id = this.$route.params.id;

        GetNewsId(this.publication_id).then(res => {
                // if(res && res.data){
                    // this.title = res.data[0].Titulo;

                    this.date = res.data[0].FechaCreacion ?  res.data[0].FechaCreacion.substr(0, 10) : '';
                    this.image= res.data[0].Image ? SERVER_URL + res.data[0].Image : "/images/dumy_news.jpg";
                    this.title= res.data[0].Titulo;
                    this.body = res.data[0].Descripcion;
                    this.subtitulo= res.data[0].SubTitulo;
                    this.fecpub= res.data[0].FechaCurso;

                    // this.initNews();
                  
                // }
            }).catch(err => {
                console.log('publication options...', err);
            });
  
    },

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });


    },

      methods: {
     
        // initNews(){
        //     let data = this.detail;
      
      

            
              
                    // date = data.FechaCreacion ? data.FechaCreacion.substr(0, 10) : '';
                    // image= data.Image ? SERVER_URL + data.Image : "/images/dumy_news.jpg";
                    // title= data.SubTitulo;
                    // body = data.Descripcion;
                    // subtitulo= data.SubTitulo;
                    // fecpub= data.FechaCurso;
                
           
        // }
    

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
