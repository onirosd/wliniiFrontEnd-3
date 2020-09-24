<template>
    <!--

        registro-sin-codigo (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/7c7bfe78-40ab-441b-b500-9cf1297f15ff/registro-sin-codigo)
        registro-con-codigo (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/1c2a9608-f90b-48de-9ff4-7e247249a814/registro-con-codigo)
        MB-registro-sin-codigo (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/5b5935e0-77f9-4408-b7de-e6fde27896b5/MB-regiistro-sin-con-codigo-)
        MB-registro-con-codigo (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/4e00a66b-b194-4b13-a8f5-8c46b71041a3/MB-regiistro-con-codigo-2con-codigo-2)

    -->
    <div class="register mb-20">
        <div class="register-container" style="background-image: url('/images/banners/3.png')">
            <div class="responsive-register">
                <p class="subtitle bold white-text ml-5">Registro</p>
                <div class="divider ml-5 mt-1"></div>
                <p class="white-text mt-10 ml-5 hidden md:block">Crear una cuenta</p>
                <w-card :shadow="false" class="mt-5 register-card">
                    <form @submit.prevent="">
                        <div class="flex flex-row justify-between">
                            <w-switch
                                activeLabel="ASESORES INMOBILIARIAS"
                                inactiveLabel="REGISTRADOS MVCS"
                                v-model="code"
                                color="secondary"
                            ></w-switch>
                            <w-snackbar class="mt-1">
                                <w-icon icon="info" h="24px"></w-icon>
                                <template slot="content">
                                    <p class="bold">Importante!</p>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit</p>
                                </template>
                            </w-snackbar>
                        </div>
                    </form>
                    <hr />
                    <div v-if="!code" class="mt-5">
                        <form @submit.prevent="">
                            <p class="bold h-100 ">INGRESAR NUEVO USUARIO</p>
                            <div class="mt-10"></div>
                            <w-input
                                v-model="form.code"
                                label="Código MVCS"
                                placeholder="Ingresar nombre / Codigo"
                            >
                                <template slot="snackbar">
                                    <p class="bold">Importante!</p>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                </template>
                            </w-input>

                            <w-select
                                label="TIPO"
                                placeholder="Tipo"
                                :options="['Agente', 'Empresa']"
                                v-model="form.tipoempresa"
                            ></w-select>

                            <w-input
                                v-model="form.phone"
                                label="Número Teléfono"
                                placeholder="Ingresar número"
                            >
                                <template slot="snackbar">
                                    <p class="bold">Importante!</p>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                </template>
                            </w-input>

                            <!-- <div class="my-5">
                                <p class="bold ml-5">AFILIARSE</p>
                                <w-switch
                                    activeLabel="Si"
                                    inactiveLabel="No"
                                    v-model="afiliarse"
                                    color="secondary"
                                ></w-switch>
                                <w-input
                                    v-model="form.afiliado"
                                    v-if="afiliarse"
                                    label="Codigo"
                                    placeholder="Ingresar el codigo"
                                    class="mt-5"
                                >
                                    <template slot="snackbar">
                                        <p class="bold">Importante!</p>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                    </template>
                                </w-input>
                            </div>
                            <br />
                            <w-textarea
                                v-model="form.description"
                                label="Ingresar breve descripción"
                                placeholder="Descripción"
                            ></w-textarea> -->
                            <div class="flex flex-row justify-center">
                                <w-btn
                                    color="tertiary"
                                    :dark="true"
                                    class="register-btn"
                                    :fullwidth="windowWidth <= 768"
                                    @click="registerUser"
                                >REGISTRAR</w-btn>
                            </div>
                        </form>
                    </div>
                    <div v-else class="mt-5">
                        <form @submit.prevent="">
                            <p class="bold ml-5">INGRESAR NUEVO USUARIO</p>
                            <div class="mt-10"></div>
                            <w-filterselect
                                label="CODIGO MVCS O NOMBRE EMPRESA INMOBILIARIA"
                                placeholder="Pendientes"
                                :value="form2.code"
                                :options="brokerList"
                                @input="handleChangeCodigoPadre">
                                    <template slot="snackbar">
                                        <p class="bold">Importante!</p>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                    </template>
                            </w-filterselect>
                            <!-- <div class="flex flex-row justify-center flex-wrap">
                                <div class="w-full md:w-1/2 pr-0 md:pr-2">
                                    <w-input
                                        v-model="form2.code"
                                        label="Código MVCS"
                                        placeholder="Ingresar nombre / Codigo"
                                    >
                                        <template slot="snackbar">
                                            <p class="bold">Importante!</p>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                        </template>
                                    </w-input>
                                </div>
                                <div class="w-full md:w-1/2 pl-0 md:pl-2 mb-8 md:mb-0">
                                    <w-btn
                                        color="tertiary"
                                        :rounded="true"
                                        :fullwidth="true"
                                        :dark="true"
                                        style="margin-top: 0px !important;"
                                        @click="seachAgente"
                                    >Buscar</w-btn>
                                </div>
                            </div> -->
                            <div
                                class="primary-alert"
                            >* Usted elegio la empresa: Corredores Peru SAC</div>
                            <div class="grey-alert">
                                <p>Empresa: {{company.Nombres}}</p>
                                <p>Estado: {{company.Estado}}</p>
                                <p>Codigo: {{company.CodigoMVCS}}</p>
                            </div>
                            <div class="flex flex-row justify-center flex-wrap">
                                <div class="w-full md:w-1/2 pr-0 md:pr-2">
                                    <w-input
                                        v-model="form2.firstname"
                                        label="Primer Nombre"
                                        placeholder=" "
                                    >
                                        <template slot="snackbar">
                                            <p class="bold">Importante!</p>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                        </template>
                                    </w-input>
                                </div>
                                <div class="w-full md:w-1/2 pl-0 md:pl-2">
                                    <w-input
                                        v-model="form2.secondname"
                                        label="Segundo Nombre"
                                        placeholder=" "
                                    >
                                        <template slot="snackbar">
                                            <p class="bold">Importante!</p>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                        </template>
                                    </w-input>
                                </div>
                            </div>
                            <div class="flex flex-row justify-center flex-wrap">
                                <div class="w-full md:w-1/2 pr-0 md:pr-2">
                                    <w-input
                                        v-model="form2.lastname1"
                                        label="Apellido Paterno"
                                        placeholder=" "
                                    >
                                        <template slot="snackbar">
                                            <p class="bold">Importante!</p>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                        </template>
                                    </w-input>
                                </div>
                                <div class="w-full md:w-1/2 pl-0 md:pl-2">
                                    <w-input
                                        v-model="form2.lastname2"
                                        label="Apellido Materno"
                                        placeholder=" "
                                    >
                                        <template slot="snackbar">
                                            <p class="bold">Importante!</p>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                        </template>
                                    </w-input>
                                </div>
                            </div>
                            <w-input
                                v-model="form2.documentId"
                                type="number"
                                label="DNI"
                                placeholder="123..."
                            >
                                <template slot="snackbar">
                                    <p class="bold">Importante!</p>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                </template>
                            </w-input>
                            <w-input
                                v-model="form2.email"
                                label="Ingresar correo electrónico"
                                placeholder="example@gmail.com"
                            >
                                <template slot="snackbar">
                                    <p class="bold">Importante!</p>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                </template>
                            </w-input>
                            <div style="margin-top: 1.25rem">
                                <p class="bold ml-5">¿Posee usuario WLINII ?</p>
                                <w-switch
                                    activeLabel="Si"
                                    inactiveLabel="No"
                                    v-model="usuario"
                                    color="secondary"
                                ></w-switch>
                                <w-input
                                    v-model="form2.usuario"
                                    v-if="usuario"
                                    label="Usuario"
                                    placeholder="Ingresar el Usuario"
                                    class="mt-5"
                                >
                                    <template slot="snackbar">
                                        <p class="bold">Importante!</p>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                    </template>
                                </w-input>
                            </div>
                            <!-- <br /> -->
                            <!-- <w-textarea
                                v-model="form2.description"
                                label="Ingresar breve descripción"
                                placeholder="Descripción"
                            ></w-textarea> -->
                            <div class="flex flex-row justify-center">
                                <w-btn
                                    color="tertiary"
                                    :dark="true"
                                    class="register-btn"
                                    :fullwidth="windowWidth <= 768"
                                    @click="registerUser"
                                >REGISTRAR</w-btn>
                            </div>
                        </form>
                    </div>
                </w-card>
            </div>
        </div>
    </div>
</template>

<script>
import { UserRegister } from "@/common/auth_apis";
import { SearchAgenteByCode, GetAgenteCodes } from "@/common/agente_apis";
import { notify } from "@/common/helpers";

export default {
    data: () => ({
        submitting: false,
        brokerList: [],
        code: false,
        form: {},
        form2: {},
        windowWidth: window.innerWidth,
        afiliarse: false,
        usuario: false,
        company: {}
    }),

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });

        GetAgenteCodes().then(res => {
            if(res && res.data.length){
                res.data.forEach(broker => {
                    this.brokerList.push(broker.name.trim() + " ( " + broker.code.trim() + " ) ");
                });
            }
        }).catch(err => {
            console.log('Agente codes error');
        });
    },
    methods: {
        seachAgente(){
            this.company = {};
            if(!this.form2.code) return;

            let _code = this.getCodeFromBrokerInfo(this.form2.code);
            SearchAgenteByCode(_code).then(res => {
                if(res) this.company = res.data;
            }).catch(err => {
                notify('error', null, 'La empresa no existe');
            });
        },
        handleChangeCodigoPadre(code){
            this.form2['code'] = code;
            this.seachAgente();
        },
        registerUser(){
            if(this.submitting) return;
            this.submitting = true;
            
            let payload = {};

            if(this.code){
                payload = {
                    CodigoMVCSPadre: this.getCodeFromBrokerInfo(this.form2.code),
                    Telefono: '123123',
                    Correo: this.form2.email,
                    DocumentoID: this.form2.documentId,
                    Mensaje: "",//this.form2.description,
                    PrimerNombre: this.form2.firstname,
                    SegundoNombre: this.form2.secondname,
                    ApellidoPaterno: this.form2.lastname1,
                    ApellidoMaterno: this.form2.lastname2,
                    CodigoMVCS: this.form2.usuario ? this.form2.usuario : "",
                    IdTipoPersona: "2"
                };
            }else{ 
                payload = {
                    CodigoMVCS: this.form.code,
                    IdTipoPersona: this.form.tipoempresa == "Empresa" ? "3" : "1",
                    Telefono: '123123',
                    Mensaje: "",//this.form.description,
                    CodigoMVCSPadre: ""//this.form.afiliado ? this.form.afiliado : ""
                }
            }

            UserRegister(payload).then(res => {
                this.submitting = false;
                if(res) {
                    this.$router.push('/register/successful');
                    notify('success', null, 'Registro exitoso');
                }
            }).catch(err => {
                this.submitting = false;
                notify('error', null, 'Registro fallido');
            })
        },
        getCodeFromBrokerInfo(info){
            if(!info.trim()) return "";

            let index = info.lastIndexOf(" ( ") + 3;
            return info.slice(index).slice(0, -3);
        }
    },
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.register {
    margin-top: -20px;
    .register-container {
        background-size: 100% 425px;
        background-repeat: no-repeat;
        background-position: top center;
        padding: 75px 0px;
        .divider {
            height: 0px;
            width: 32px;
            border: thin solid $tertiary;
        }

        .responsive-register {
            width: 90%;
            max-width: 768px;
            margin: auto;
            .register-card {
                .card-text {
                    padding: 40px 95px;
                }
                .register-btn {
                    padding: 12px 56px;
                }

                .primary-alert {
                    background-color: $primary;
                    color: white;
                    padding: 24px;
                    border-radius: $full-radius;
                }

                .grey-alert {
                    background-color: #eeeeee;
                    border: thin #9e9e9e solid;
                    color: black;
                    padding: 24px;
                    border-radius: $full-radius;
                    margin: 20px 0px 40px 0px;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .register {
        .register-container {
            padding: 45px 15px;
            .responsive-register {
                .register-card {
                    .card-text {
                        padding: 25px;
                    }
                }
            }
        }
    }
}
</style>
