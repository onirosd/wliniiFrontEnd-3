<template>
	<div class="ml-10 my-10 md:ml-20">
		 <div class=" flex precios-container text-2xl ">
            <w-card :shadow="false">

 
<p>POLÍTICA DE PRIVACIDAD</p>
<br>
Este documento es parte integrante de las Términos y Condiciones de Uso de Wlinii. Mediante la aceptación de los Términos y Condiciones de Uso en el momento del registro, el Usuario acepta las políticas aquí contenidas.
<br>
La presente Política de Privacidad establece los términos en que Wlinii usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su portal web. Esta empresa está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo, esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.
<br><br>
<p></p>INFORMACIÓN QUE ES RECOGIDA</p>
Nuestro sitio web podrá recoger información personal, por ejemplo: Nombre, numero de teléfono, información de contacto como su dirección de correo electrónica e información demográfica. Así mismo cuando sea necesario podrá ser requerida información específica para realizar una entrega física.
<br><br>
<p>USO DE LA INFORMACIÓN RECOGIDA </p>
Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios y mejorar nuestros productos y servicios. Es posible que sean enviados correos electrónicos periódicamente a través de nuestro sitio con ofertas especiales, nuevos productos y otra información publicitaria que consideremos relevante para usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la dirección que usted proporcione y podrán ser cancelados en cualquier momento.

Wlinii está altamente comprometido para cumplir con el compromiso de mantener su información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.
<br><br>
<p>COOKIES</p>
Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las webs pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su portal web.

Nuestro portal web emplea las cookies para poder identificar las páginas que son visitadas y su frecuencia. Esta información es empleada únicamente para análisis estadístico y después la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo, las cookies ayudan a proporcionar un mejor servicio de los portales web, estás no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente, visitas a una web. Usted puede aceptar o negar el uso de cookies, no obstante, la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios.
<br><br>
<p>ENLACES A TERCEROS</p>
Este portal web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.
<br><br>
CONTROL DE SU INFORMACIÓN PERSONAL
En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro portal web. Cada vez que se le solicite rellenar un formulario, como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo electrónico. En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted puede cancelarla en cualquier momento.
<br><br>
Esta empresa no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial.
<br><br>
Wlinii se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.


             

            </w-card>


           
        </div>
        <br>
	</div>
</template>	

<script>
  
import moment from "moment";
import { SERVER_URL } from "@/common/config";



export default {
    data: () => ({
        isManager: false,
        isLogged : false,
        homeForm: {},
        windowWidth: window.innerWidth,
        defaultOptions: null,
        locations: [],
        detail: null
  
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

    },

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });


    },
      methods: {
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

</style>
