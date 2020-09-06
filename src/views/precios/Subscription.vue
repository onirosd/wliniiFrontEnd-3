<template>
    <!-- 
        
        precios-de-subscripcion (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/e20ae64d-28f7-44bf-8603-409a756dd42c/precios-de-suscripcion)
        MB-precios-de-subscripcion (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/03edf50b-3d03-4f00-a638-3757612172fa/MB-precios-de-suscripcion)

    -->
    <div>
        <div class="precios-container py-16">
            <w-card :shadow="false">
                <div v-if="verified"  class="flex flex-row flex-wrap justify-center">
                    <div class="md:w-1/3 text-center">
                        <br /><br /><br /><br />
                        <div>
                            Se enviaron los datos de suscripcion En breve le llegara un correo de habilitacion de su usuario
                        </div>
                        <br /><br /><br /><br />
                        <div class="flex flex-row justify-center">
                            <w-btn :dark="true" :large="true" @click="closeSubscription">Volver al initio</w-btn>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="flex justify-center">
                        <p class="subtitle bold ml-5 my-5 md:ml-0">Gestión de Suscripciones</p>
                    </div>
                    <br />
                    <div class="flex flex-row flex-wrap justify-center ">
                        <div class="md:w-1/2">
                            <form @submit.prevent>
                                <div class="form-section">
                                    <div class="form-body">
                                        <div class="flex flex-row flex-wrap justify-center">
                                            <div class="w-full px-2">
                                                <w-select
                                                    label="Promocion Elegida"
                                                    placeholder="Pendientes"
                                                    :options="promotions"
                                                    v-model="form.promotion"
                                                ></w-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <div style="color: black; font-weight: 600; margin-left: 24px;">Documento/Foto</div>
                                    <div class="w-full">
                                        <div class="flex flex-row justify-center">
                                            <w-card :shadow="false" class="upload-file-card">
                                                <div class="flex flex-col items-center">
                                                    <w-icon icon="upload-image" h="137px"></w-icon>
                                                    <!-- <p class="text-center mt-5">Sube fotos desde tu computadora</p> -->
                                                    <p class="text-center mt-5">
                                                        Permitidos: PDF, JPG, JPEG (Tamaño máximo: 5Mb)
                                                    </p>
                                                    <w-btn
                                                        color="#57BCD1"
                                                        :dark="true"
                                                        :rounded="true"
                                                        :small="true"
                                                    >
                                                        <p>seleccionar documentos/fotos</p>
                                                        <input
                                                            class="fileInput"
                                                            type="file"
                                                            ref="docFile"
                                                            accept=".pdf, .jpg, .jpeg, .png"
                                                            @change="addDocument()"
                                                        />
                                                    </w-btn>
                                                </div>
                                            </w-card>
                                        </div>
                                    </div>

                                    <br />
                                    
                                    <div class="flex flex-row justify-center">
                                        <w-btn color="#f37777" :dark="true" :large="true" @click="cancelSubscription">Cancelar</w-btn>
                                        <w-btn :dark="true" :large="true" @click="submitVerifyDocument">Acceptar</w-btn>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </w-card>
        </div>
    </div>
</template>

<script>
import { GetSubscriptions, SendSubscription } from '@/common/subscription_apis';
import { UserLogout } from "@/common/auth_apis";
import { notify } from "@/common/helpers";

export default {
    data() {
        return {
            windowWidth: window.innerWidth,
            promotionDetails: [],
            promotions: [],
            form: {},
            verified: false,
            submitting: false
        };
    },

    computed: {   
    },

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });

        let selectedId = this.$route.params.type.trim();
        GetSubscriptions().then(res => {
            if(res) this.initSubscriptions(res.data, selectedId);
        }).catch(err => {
            console.log('get subscriptiones', err);
        });
    },

    methods: {
        initSubscriptions(data, id){
            if(!data || !data.items || !data.items.length) return;

            this.promotionDetails = data.items;
            this.promotions = [];
            data.items.forEach(item => {
                this.promotions.push(item.Des_Descripcion);
                if(id && id == item.IdSuscripcion.trim()) this.form.promotion = item.Des_Descripcion;
            });
        },
        addDocument(){
            const files = this.$refs["docFile"].files;
            if(files.length) this.form.file = files[0];
        },
        closeSubscription(){
            UserLogout();
            this.$router.push('/login');
        },
        cancelSubscription(){
            this.$router.push('/precios');
        },
        submitVerifyDocument(){
            if(!this.form.promotion || !this.form.file){
                notify('warning', null, 'El documento no está cargado');
                return;
            }

            let _selectedPromotion = this.promotionDetails.find(p => p.Des_Descripcion === this.form.promotion);
            if(_selectedPromotion){
                if(this.submitting) return;
                this.submitting = true;

                let formData = new FormData();
                formData.append("promotion_id", _selectedPromotion.IdSuscripcion);
                formData.append("document", this.form.file);

                SendSubscription(formData).then(res => {
                    this.submitting = false;
                    if(res) {
                        this.verified = true;
                        this.form = {};
                        notify('success', null, res.data.message);
                    }
                }).catch(err => {
                    this.submitting = false;
                    notify('error', null, 'suscripción fallida');
                })
            }
        },
    },
};
</script>

<style lang="scss">
.precios-container {
    width: 90%;
    margin: auto;
}

@media (max-width: 764px) {
    .precios-container {
        width: 95%;
    }
}

.upload-file-card {
    border: 1px solid #e6e6e6;
    .card-text {
        background-color: #fcfcfc;
        .fileInput {
            cursor: pointer;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 99;
            font-size: 50px;
            opacity: 0;
            -moz-opacity: 0;
            filter: Alpha(opacity=0);
        }
    }
}
</style>
