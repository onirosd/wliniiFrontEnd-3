
<template>
 <div class="register mb-20">
        <div class="register-container" >
            <div class="responsive-register">


                          <!--   <div class="mt-10"></div> -->

               <form onSubmit="event.preventDefault()">
                     <div class="flex flex-row justify-between">

                     <w-card :shadow="false" class="mt-5 register-card">  
                     <h4 class="subtitle p-1">CONTACTANOS </h4>
                     <div class="mt-10"></div>

                                    <w-input
                                        v-model="mailForm.nombrecompleto"
                                        label="Nombre Completo"
                                        placeholder=" "
                                        :err="mailError.nombrecompleto"

                                    >
                                        <template slot="snackbar">
                                            <p class="bold">Importante!</p>
                                            <p></p>
                                        </template>
                                    </w-input>
                          
                                
                                    <w-input
                                        v-model="mailForm.correo"
                                        label="Correo Electronico"
                                        placeholder=" "
                                        :err="mailError.correo"
                                    >
                                        <template slot="snackbar">
                                            <p class="bold">Importante!</p>
                                            <p></p>
                                        </template>
                                    </w-input>
                                    <br>

                                

                             <w-textarea
                                label="Mensaje"
                                placeholder=" Ingresar Mensaje"
                                v-model="mailForm.message"
                                :err="mailError.message"
                            ></w-textarea>


                             <div class="flex flex-row justify-center">
                                <w-btn
                            :small="true"
                            :dark="true"
                            @click="sendMail"
                        >Enviar Mensaje</w-btn>
                            </div>
                        </w-card>
                      </div>
               </form> 

                
            
        

        </div>
     </div>
  </div>
</template> 



<script>
//import { UserRegister } from "@/common/auth_apis";
import { SendEmailContactanos } from "@/common/inmueble_apis";
// import { SearchAgenteByCode, GetAgenteCodes } from "@/common/agente_apis";
import { notify } from "@/common/helpers";


export default {
    data: () => ({
        submitting: false,
        mailForm: {},
        mailError:{},
        windowWidth: window.innerWidth,
        isSendingEmail: false,
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }),

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });

    },
    methods: {
       

        sendMail(){


            // if(this.isSendingEmail) return;
            // this.isSendingEmail = true;

            let isValid = this.validateMailForm();
            if(!isValid) return;

            let payload = this.mailForm;
           // payload['to'] = this.detail.IdUsuario;
            SendEmailContactanos(payload).then(res => {
              //  this.isSendingEmail = false;
                if(res) {
                    this.mailForm = {};
                    notify('success', null, "Se envio el mensaje con exito !!");
                   // this.showEmailModal = false;
                }else{
                //    this.isSendingEmail = false;
                    notify('error', null, 'Correo electrónico fallido');
                }
            }).catch(err => {
                //this.isSendingEmail = false;
                notify('error', null, 'Correo electrónico fallido');
            })
        },

        validateMailForm(){
          this.mailError = {message:null, correo:null, nombrecompleto:null};
            // const { message } = this.mailForm.message;
            // const { correo }  = this.mailForm.correo;
            // const { nombrecompleto } = this.mailForm.nombrecompleto;
            let mail =  this.mailForm.message;
            this.mailError = {
                message: this.mailForm.message ? null : "Esto es requerido",
                correo: this.mailForm.correo ? null : "Esto es requerido",
                nombrecompleto: this.mailForm.nombrecompleto ? null : "Esto es requerido"
            };


           if (!mail.length) {
             this.mailError.correo = false;
           }

          // if (!mail.match(/^\w+([.-]?\w+)_@\w+(_[_.-]?\w+)_(.\w{2,3})+$/)) {
          //    this.mailError.correo = false;
          //  }
            // if(this.reg.test(this.email)){
                // this.mailError.correo = this.reg.test(this.mailForm.correo);
            // }
            
            if(this.mailForm.message && this.mailForm.correo && this.mailForm.nombrecompleto) return true;
            else return false;

        }


    },
};
// import { UserLogin } from "@/common/auth_apis";
// import { notify } from "@/common/helpers";
// import { CheckUserSubscription } from "@/common/subscription_apis";

// export default {
//     data: () => ({
//         form: {}
//     }),

//     methods: {
//         login() {
          
//         }
//     }
// };

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
