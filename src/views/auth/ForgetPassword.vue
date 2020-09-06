<template>

    <div class="login">
        <div class="login-container">
            <w-card image="/images/login.png" class="login-card" :shadow="false">
                <div class="flex flex-row ml-4">
                    <p class="bold">RECUPERA TU CONTRASEÑA</p>
                   
                </div>
                <form class="mt-6"  @submit.prevent>
                    <w-input
                        label="Ingresar Correo"
                        beforeIcon="user"
                        color="tertiary"
                        v-model="form.correo"
                    ></w-input>
                   
                    <w-btn @click="EnviarCorreo()" color="tertiary" :dark="true" :fullwidth="true">Enviar Nueva Clave al Correo</w-btn>
                    <p> * Le llegara un correo con la nueva contraseña , si es que realmente esta registrado en el sistema.</p>
                   
                </form>
                <p class="ml-4">
                    ¿Aun no eres usuario?
                    <a class="login-link" @click="gotoRegistrar()">Obtener una cuenta</a>
                </p>
            </w-card>
        </div>
    </div>
</template>

<script>
import { UserRecuperar } from "@/common/auth_apis";
import { notify } from "@/common/helpers";
import { CheckUserSubscription } from "@/common/subscription_apis";

export default {
    data: () => ({
        form: {}
    }),

    methods: {
        EnviarCorreo() {

             UserRecuperar(this.form).then(res => {


                 notify(res.data.status, null, res.data.message);
                 if(res.data.status == 'success'){

                 this.$router.push('/');

                 }
                 
                // if(res && res.data){

                //     notify('success', null, 'Inicia sesión correctamente');
                // }else{
                //     notify('error', null, ' Error : Se tuvo problemas en la petición.');
                // }
            }).catch(err => {
                notify('error', null, 'Error : No se puede enviar formulario');
            });
           
        },

         gotoRegistrar(){
            // if(!this.isManager) return;
            this.$router.push('/register/');
        }
    }
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.login {
    .login-container {
        padding: 75px;
        display: flex;
        justify-content: center;
        .login-card {
            display: flex !important;
            flex-direction: row-reverse;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
            max-width: 982px;
            .image,
            .card-text {
                max-width: 50%;
                height: 490px !important;
                flex: 1 1 auto;
            }

            .card-text {
                padding: 65px;
            }
        }
    }

    .login-link {
        color: #000;
        text-decoration: underline;
        cursor: pointer;
    }
}

@media (max-width: 1024px) {
    .login {
        .login-container {
            .login-card {
                justify-content: center;
                .image {
                    display: none;
                }
                .card-text {
                    max-width: 100% !important;

                    flex: 0 1 auto;
                    padding: 25px;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .login {
        .login-container {
            padding: 15px;
        }
    }
}
</style>
