<template>
    <!-- 
        
       perfil-del-agente (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/040862ab-5d60-4397-a888-53a600060565/perfil-del-agente)
       MB-perfil-del-agente (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/1a5e262d-c8f4-4584-9cc7-fa5788a05d10/MB-perfil-del-agente)
    
    -->

    <div class>
        <div class="agente-perfil-container">
            <w-card :shadow="false">
                <p class="subtitle bold mt-5 ml-5">Perfil de Agente</p>
                <p class="ml-5 mb-4">Agregar y editar información litado</p>

                <!-- <div class="lg:w-2/3 primary rounded-bl-full rounded-r-full lg:ml-5 mb-4 p-4">
                    <p
                        class="caption white-text truncate"
                    >Configuración flexible y formas de edición, agregue y edite información de listado, fotos y ubicación de la posición</p>
                </div> -->

                <form @submit.prevent style="padding-top: 20px">
                    <!-- <div class="mb-4">
                        <div class="w-full md:w-1/2 ml-5 mt-5 mb-10">
                            <w-checkbox label="Soy un agente" v-model="soyagente"></w-checkbox>
                        </div>
                    </div> -->
                    <div class="flex-wrap lg:flex">
                        <div class="w-full md:w-1/2 px-2">
                            <div class="flex justify-center">
                                <div class="perfil-avatar" :style="`background-image: url(${this.perfilImage})`">
                                    <div class="overback"></div>
                                    <input
                                        hidden
                                        type="file"
                                        ref="photoFile"
                                        accept=".jpg, .jpeg, .png"
                                        @change="addPerfilPhoto"
                                    />
                                    <w-btn
                                        color="#57BCD1"
                                        :dark="true"
                                        :rounded="true"
                                        :small="true"
                                        class="sel-btn"
                                        @click="$refs.photoFile.click()"
                                    >seleccionar foto
                                    </w-btn>
                                </div>    
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 px-2" style="padding-top: 36px">
                            <w-select
                                label="pais"
                                placeholder="Choose a country"
                                :options="countryList"
                                v-model="paisName"
                            ></w-select>
                            <w-input
                                label="Direccion Exacta"
                                placeholder="Ingrese ..."
                                v-model="form.Des_Direccion"
                            ></w-input>
                            <w-input
                                label="Nombre Empresa (optional)"
                                placeholder="Ingrese ..."
                                v-model="form.Nombre_Empresa"
                            ></w-input>
                        </div>
                    </div>
                    <div style="margin-top: 24px">
                        <p class="tertiary-text bold body ml-5 mb-5">Información de Contacto</p>
                        <br />
                        <div class="flex-wrap lg:flex">
                            <div class="w-full md:w-1/4 px-2">
                                <w-input
                                    label="Primer Nombre"
                                    placeholder="Ingrese ..."
                                    v-model="form.Des_PrimerNombre"
                                ></w-input>
                            </div>
                            <div class="w-full md:w-1/4 px-2">
                                <w-input
                                    label="Segundo Nombre"
                                    placeholder="Ingrese ..."
                                    v-model="form.Des_SegundoNombre"
                                ></w-input>
                            </div>
                            <div class="w-full md:w-1/4 px-2">
                                <w-input
                                    label="Apellido Paterno"
                                    placeholder="Ingrese ..."
                                    v-model="form.Des_ApePaterno"
                                ></w-input>
                            </div>
                            
                            <div class="w-full md:w-1/4 px-2">
                                <w-input
                                    label="Apellido Materno"
                                    placeholder="Ingrese ..."
                                    v-model="form.Des_AperMaterno"
                                ></w-input>
                            </div>
                            
                            <div class="w-full md:w-1/3 px-2">
                                <w-input
                                    label="celular de trabajo"
                                    placeholder="Ingrese ..."
                                    v-model="form.Des_Telefono1"
                                ></w-input>
                            </div>
                            <div class="w-full md:w-1/3 px-2">
                                <w-input
                                    label="email"
                                    placeholder="email@example.com"
                                    v-model="form.Des_Correo1"
                                ></w-input>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="tertiary-text bold body ml-5 mb-5">Acerca de mi</p>
                        <br />
                        <div class="flex flex-row flex-wrap">
                            <div class="w-full lg:w-2/3 md:w-2/3 px-2">
                                <w-textarea
                                    label="DESCRIPCIÓN"
                                    placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
                                    v-model="form.Des_ComentarioPersona"
                                ></w-textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </w-card>
        </div>
        <br />
        <div class="agente-perfil-container">
            <w-card :shadow="false">
                <p class="tertiary-text bold body ml-5 mb-5">Mis redes sociales</p>
                <br />
                <form @submit.prevent>
                    <div class="w-full lg:w-2/3 md:w-2/3">
                        <w-input
                            label="facebook"
                            placeholder="https://www.facebook.com/messages"
                            v-model="form.Des_Rs_Facebook"
                        ></w-input>
                    </div>
                    <div class="w-full lg:w-2/3 md:w-2/3">
                        <w-input
                            label="twitter"
                            placeholder="https://www.twitter.com/messages"
                            v-model="form.Des_Rs_Twitter"
                        ></w-input>
                    </div>
                    <div class="w-full lg:w-2/3 md:w-2/3">
                        <w-input
                            label="instagram"
                            placeholder="https://www.instagram.com/messages"
                            v-model="form.Des_Rs_Instagram"
                        ></w-input>
                    </div>
                    <div class="w-full lg:w-2/3 md:w-2/3">
                        <w-input
                            label="linkedin"
                            placeholder="https://www.linkedin.com/messages"
                            v-model="form.Des_Rs_Linkedin"
                        ></w-input>
                    </div>
                    <div class="flex flex-row justify-center md:justify-start">
                        <w-btn dark large :color="$wlinii.tertiary" @click="updatePersonInfo" class="bold">GUARDAR CAMBIOS</w-btn>
                    </div>
                </form>
            </w-card>
        </div>
        <br />
        <div class="hidden lg:block md:block agente-perfil-container">
            <w-card :shadow="false">
                <div class="flex justify-around">
                    <div class="w-1/2 px-4">
                        <p class="tertiary-text bold body ml-5 mb-5">Cambia tu contraseña</p>
                        <br />
                        <form @submit.prevent>
                            <div class="w-4/5">
                                <w-input
                                    label="CONTRASEÑA ACTUAL"
                                    type="password"
                                    placeholder=" "
                                    v-model="authForm.currentpassword"
                                ></w-input>
                            </div>
                            <div class="w-4/5">
                                <w-input
                                    label="NUEVA CONTRASEÑA"
                                    type="password"
                                    placeholder=" "
                                    v-model="authForm.newpassword"
                                ></w-input>
                            </div>
                            <div class="w-4/5">
                                <w-input
                                    label="CONFIRMACIÓM NUEVA CONTRASEÑA"
                                    type="password"
                                    placeholder=" "
                                    v-model="authForm.confirmpassword"
                                ></w-input>
                            </div>

                            <div class="flex flex-row justify-center md:justify-start">
                                <w-btn
                                    dark
                                    large
                                    :color="$wlinii.tertiary"
                                    class="bold"
                                    @click="changePassword"
                                >GUARDAR CAMBIOS</w-btn>
                            </div>
                        </form>
                    </div>
                    <div class="w-1/2 px-4">
                        <p class="bold caption mt-10 mb-2">INSINUACIÓN</p>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. lor sit amet, consectetuer adipiscing elit. Donec odio</p>
                    </div>
                </div>
            </w-card>
            <br />
        </div>
        <overlay-page-loader :loading="pageLoading"/>
    </div>
</template>

<script>
import { GetPersonaInfo, UpdatePersonaInfo, GetBrokerPersonaInfo, UpdateBrokerPersonaInfo, UpdateProfileImage } from "@/common/persona_apis";
import { ChangePassword, UserLogout } from "@/common/auth_apis";
import { GetCountries } from "@/common/home_apis";
import { SERVER_URL } from "@/common/config";
import { notify } from "@/common/helpers";

export default {
    data: () => ({
        isManager: false,
        perfilImage: null,
        windowWidth: window.innerWidth,
        countries: [],
        pageLoading: true,
        form: {},
        authForm: {},
        paisName: null
    }),
    computed: {
        countryList(){
            if(!this.countries || !Array.isArray(this.countries)) return [];

            let _countries = [];
            this.countries.forEach(c => {
                _countries.push(c.Des_Pais);
            });

            return _countries;
        }
    },
    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });

        let userToken = this.$store.getters.token;
        let user = this.$store.getters.user;
        if(userToken && user && (user.type == "1" || user.type == "2")) this.isManager = true;

        GetCountries().then(res => {
            if(res) this.countries = res.data;
            let PersonalAPI = this.isManager ? GetPersonaInfo : GetBrokerPersonaInfo;
            
            PersonalAPI().then(res => {
                if(res) this.initPersonaInfo(res.data);
                this.pageLoading = false;
            }).catch(err => {
                console.log('get Person info', err);
                this.pageLoading = false;
            });
            
        });
    },
    methods: {
        initPersonaInfo(data){
            let _pais = this.countries.find(c => c.IdPais == data.IdPais);
            this.paisName = _pais ? _pais.Des_Pais : null;
            this.perfilImage = data.Img_Personal ? SERVER_URL + data.Img_Personal :  '/images/dummy_user.jpg';
            this.form = data;
        },
        changePassword(){
            if(this.pageLoading) return;
            this.pageLoading = true;

            ChangePassword(this.authForm).then(res => {
                this.pageLoading = false;
                if(res && res.data.status === 'success') {
                    notify('success', null, 'Contraseña cambiada');
                    UserLogout();
                    this.$router.push('/login');
                }
            }).catch(err => {
                this.pageLoading = false;
                notify('error', null, 'Solicitud fallida');
            });
        },
        updatePersonInfo(){
            if(this.pageLoading) return;
            this.pageLoading = true;

            let _pais = this.countries.find(c => c.Des_Pais == this.paisName);

            let payload = {
                ...this.form,
                IdPais: _pais ? _pais.IdPais : null
            };
            
            let UpdatePersonAPI = this.isManager ? UpdatePersonaInfo : UpdateBrokerPersonaInfo;
            UpdatePersonAPI(payload).then(res => {
                this.pageLoading = false;
                if(res) notify('success', null, 'Perfil actualizado con éxito');
            }).catch(err => {
                this.pageLoading = false;
                notify('error', null, 'Actualización de perfil fallida');
            });
        },
        addPerfilPhoto(e){
            const { files } = e.target;

            if(!files && !files[0]) return;
            let file = files[0];

            let formData = new FormData();
            formData.append('file', file);
            UpdateProfileImage(formData).then(res => {
                if(res && res.data.status == 'success') {
                    notify('success', null, 'Imagen cargada exitosamente');
                    this.$store.dispatch('setUserAvatar', res.data.url);
                    window.location.reload();
                }
            }).catch(err => {
                notify('error', null, 'La carga de la imagen falló');
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.agente-perfil-container {
    width: 90%;
    max-width: 1180px;
    margin: auto;
}
.perfil-avatar{
    height: 300px;
    width: 300px;
    background-image: url(/images/dummy_user.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 3px 5px 0px #9c9c9c;
    
    .overback{
        display: none;
        background-color: #13131354;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .sel-btn{
        display: none;
    }

    &:hover .overback,
    &:hover .sel-btn{
        display: block;
    }
}
</style>
