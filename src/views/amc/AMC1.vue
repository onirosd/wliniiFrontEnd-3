<template>
    <!--
        
        AMC-1 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/429a258a-2780-4f5f-8cb3-6bcf4b4673ea/AMC-1)
        MB-AMC-1 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/63922af1-b1ae-4f85-89ee-8dc06a07e288/MB-AMC-1)

    -->
    <div class="amc-1">
        <div class="amc-container">
            <w-card :shadow="false">
                <div>
                    <p class="body subtitle-md bold ml-5">Análisis de Mercado Comparativo (AMC)</p>
                    <p class="caption primary-text ml-5">Aplicación de analisis de precios</p>
                    <w-btn
                        :disabled="true"
                        :rounded="true"
                        :dark="true"
                        :small="true"
                        class="step-btn"
                    >01 PASO</w-btn>
                    <p class="body subtitle-md bold ml-5">Completar Formulario</p>
                    <div class="w-full px-5">
                        <progress value="25" max="100" class="amc-progress"></progress>
                    </div>
                </div>
                <div class="px-5 my-5">
                    <form @submit.prevent>
                        <div class="flex flex-row flex-wrap">
                            <div class="w-full md:w-1/2 md:px-16">
                                <w-select
                                    label="TIPO DE OPERACIÓN"
                                    :options="operationOptions"
                                    v-model="form.operation"
                                ></w-select>
                                <w-select
                                    label="TIPO DE INMUEBLE"
                                    :options="inmuebleOptions"
                                    v-model="form.inmueble"
                                ></w-select>
                                <w-select
                                    label="TIPO DE MONEDA"
                                    :options="monedaOptions"
                                    v-model="form.moneda"
                                ></w-select>
                                <w-input
                                    label="Client"
                                    placeholder=""
                                    v-model="form.client"
                                ></w-input>
                            </div>
                            <div class="w-full md:w-1/2 md:px-16">
                                <w-input
                                    label="Area total"
                                    type="number"
                                    placeholder=""
                                    v-model="form.totalarea"
                                ></w-input>
                                <w-input
                                    label="Area construida"
                                    type="number"
                                    placeholder=""
                                    v-model="form.coverarea"
                                ></w-input>
                                <w-input
                                    label="Dirección"
                                    placeholder=""
                                    v-model="form.address"
                                ></w-input>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center">
                            <div class="w-full md:w-1/3">
                                <div class="flex flex-row justify-between flex-wrap">
                                    <!-- <div class="w-full md:w-1/2 px-2">
                                        <w-btn
                                            type="submit"
                                            :fullwidth="true"
                                            :large="true"
                                            :dark="true"
                                            color="secondary"
                                            @click="saveConfig"
                                        >GUARDAR CAMBIOS</w-btn>
                                    </div> -->
                                    <div class="w-full px-2">
                                        <w-btn
                                            :fullwidth="true"
                                            :large="true"
                                            :dark="true"
                                            color="primary"
                                            @click="nextStep"
                                        >SIGUIENTE</w-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </w-card>
            <br />
        </div>
    </div>
</template>

<script>
import { CheckUserSubscription } from "@/common/subscription_apis";
import { GetGeneralOptions } from "@/common/home_apis";

export default {
    data() {
        return {
            form: {
                operation: null,
                inmueble: null,
                totalarea: '',
                coverarea: null,
                address: '',
                client: '',
                moneda: null                
            },
            monedaOptions: [],
            operationOptions: [],
            inmuebleOptions: []
        };
    },
    created() {
        CheckUserSubscription();
    },
    mounted() {
        GetGeneralOptions().then(res => {
            if(res) this.initOptions(res.data);
        });
    },
    methods: {
        initOptions(options){
            this.clearAllConfig();
            this.monedaOptions = [];
            options.moneda_types.map(m => { this.monedaOptions.push(m.Descripcion); });

            this.operationOptions = [];
            options.operation_types.map(m => { 
               
               if(m.IdTipoOperacion == 1 || m.IdTipoOperacion == 2){
                 this.operationOptions.push(m.Descripcion); 
               }
               

            });

            this.inmuebleOptions = [];
            options.inmueble_types.map(m => { this.inmuebleOptions.push(m.Descripcion); });
            
            // this.form = {...this.form, operation: this.operationOptions[0], inmueble: this.inmuebleOptions[0]};
        },
        nextStep(){
            this.saveConfig();
            this.$router.push('/amc/2');
        },
        saveConfig(){
            localStorage.setItem('AMC_CONFIG', JSON.stringify(this.form));
        },
        clearAllConfig(){
            localStorage.removeItem('AMC_CONFIG');
            localStorage.removeItem('AMC_2');
            localStorage.removeItem('AMC_3');
            localStorage.removeItem('AMC_TMP');
        }
    },
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.amc-1 {
    .amc-container {
        width: 90%;
        max-width: 1180px;
        margin: auto;
        .step-btn {
            padding: 5px 25px;
            margin: 20px 18px;
            background-color: $primary !important;
        }

        .amc-progress {
            width: inherit;
            margin: 20px 0px;
            &[value] {
                &::-webkit-progress-bar {
                    background-color: #aaaaaa;
                    border-radius: 15px;
                }
                &::-webkit-progress-value {
                    background-color: #ff7500;
                    border-radius: 15px;
                }
            }
        }
    }
}
</style>
