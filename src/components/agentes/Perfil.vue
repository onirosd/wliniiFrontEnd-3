<template>
    <div>
        <div class="flex flex-row justify-between flex-wrap agent-component">
            <div class="w-full md:w-1/3">
                <div class="block md:hidden ml-1">
                    <p class="bold">PERFIL AGENTES</p>
                    <div class="divider my-5"></div>
                </div>
                <div class="flex flex-col items-center flex-wrap">
                    <div class="w-full flex flex-row justify-center">
                        <img :src="agent.img" class="agent-img" />
                    </div>
                    <div class="hidden md:w-full md:flex md:flex-row md:justify-center md:flex-wrap">
                        <p class="my-3">Valoración del agente</p>
                        <div class="w-full flex flex-row justify-center">
                            <w-btn
                                :icon="true"
                                v-for="i in 5"
                                :key="i"
                                :disabled="true"
                                style="margin: 2px; background-color: white !important;"
                            >
                                <w-icon :icon="agent.stars >= i ? 'star-brown' : 'star-grey'" h="14px"></w-icon>
                            </w-btn>
                        </div>
                        <div class="w-full flex flex-row justify-center my-5">
                            <w-btn :icon="true">
                                <w-icon icon="mail-grey" h="12px"></w-icon>
                            </w-btn>
                            <w-btn :icon="true">
                                <w-icon icon="facebook-grey" h="15px"></w-icon>
                            </w-btn>
                            <w-btn :icon="true">
                                <w-icon icon="linkedin-grey" h="17px"></w-icon>
                            </w-btn>
                            <w-btn :icon="true">
                                <w-icon icon="twitter-grey" h="15px"></w-icon>
                            </w-btn>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-2/3">
                <div class="hidden md:block">
                    <div class="flex justify-between items-center">
                        <p class="bold">PERFIL AGENTES</p>
                        <w-snackbar class="mt-1">
                            <w-icon icon="info" h="24px"></w-icon>
                            <template slot="content">
                                <p class="bold">Importante!</p>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit</p>
                            </template>
                        </w-snackbar>
                    </div>
                    <div class="divider my-5"></div>
                </div>
                <p class="subtitle bold mt-5 md:mt-0">{{ agent.name }}</p>
                <p class="mb-8">{{ agent.dir }}</p>
                <p class="bold">{{ agent.empresa }}</p>
                <p class="md:mb-10">Codigo Ministerio de vivienda: {{ agent.NUsuario }}</p>
                <div class="full-divider block md:hidden mt-5"></div>
                <div class="flex flex-row flex-wrap md:hidden">
                    <div class="w-1/2 self-center">
                        <p class="my-3">Valoración del agente</p>
                    </div>
                    <div class="w-1/2 self-center">
                        <div class="w-full flex flex-row justify-center">
                            <w-btn
                                :icon="true"
                                v-for="i in 5"
                                :key="i"
                                :disabled="true"
                                style="margin: 2px;"
                            >
                                <w-icon :icon="agent.stars >= i ? 'star-brown' : 'star-grey'" h="14px"></w-icon>
                            </w-btn>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="w-full flex flex-row justify-start mb-5" style="margin-left: -6px;">
                            <w-btn :icon="true">
                                <w-icon icon="mail-grey" h="12px"></w-icon>
                            </w-btn>
                            <w-btn :icon="true">
                                <w-icon icon="facebook-grey" h="15px"></w-icon>
                            </w-btn>
                            <w-btn :icon="true">
                                <w-icon icon="linkedin-grey" h="17px"></w-icon>
                            </w-btn>
                            <w-btn :icon="true">
                                <w-icon icon="twitter-grey" h="15px"></w-icon>
                            </w-btn>
                        </div>
                    </div>
                </div>
                <div class="full-divider block md:hidden mb-5"></div>
                <div class="flex flex-row flex-wrap">
                    <div class="w-full md:w-1/3 my-0 md:my-3">
                        <p class="bold tertiary-text">Cel.</p>
                    </div>
                    <div class="w-full md:w-2/3 my-3 md:my-3">
                        <p>{{ agent.cel }}</p>
                    </div>
                    <div class="w-full md:w-1/3 my-0 md:my-3">
                        <p class="bold tertiary-text">Email</p>
                    </div>
                    <div class="w-full md:w-2/3 my-3 md:my-3">
                        <p>{{ agent.email }}</p>
                    </div>
                    <div class="w-full md:w-1/3 my-0 md:my-3">
                        <p class="bold tertiary-text">Acerca de mi</p>
                    </div>
                    <div class="w-full md:w-2/3 my-3 md:my-3">
                        <p>{{ agent.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-end">
            <div class="w-full lg:w-2/3">
                <div class="flex flex-row md:justify-end flex-wrap">
                    <div
                        class="w-1/2 md:w-1/4 info-card-container"
                        v-for="(t, i) in transacciones"
                        :key="i"
                    >
                        <div class="info-card">
                            <p class="bold">{{ t.name }}</p>
                            <p class="title">{{ t.n }}</p>
                            <div class="flex flex-row">
                                <p>{{ t.state }} {{ t.percentaje }}</p>
                                <div v-if="t.state == 'up'" class="arrow-up"></div>
                                <div v-if="t.state == 'down'" class="arrow-down"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GetResumenAgenteById, GetResumenAgenteByPublication } from "@/common/agente_apis";
import { SERVER_URL } from "@/common/config";

export default {
    data: () => ({
        agent: {},
        transacciones: [
            {
                name: "Transacciones",
                n: 0,
                state: "up",
                percentaje: "3%"
            },
            {
                name: "Activas",
                n: 0,
                state: "down",
                percentaje: "1%"
            },
            {
                name: "Cancelada",
                n: 0
            }
        ],
        
    }),
    mounted() {
        let query = this.$route.query;
        let param = this.$route.params;
        if(param && param.id){
            GetResumenAgenteByPublication(param.id).then(res => {
                if(res) this.initAgente(res.data);
            }).catch(err => {
                console.log('find agente error', err);
                this.$router.push('/');
            })
        }else{
            GetResumenAgenteById(query.id).then(res => {
                if(res) this.initAgente(res.data);
            }).catch(err => {
                console.log('find agente error', err);
                this.$router.push('/');
            })
        }
    },
    methods: {
        initAgente(data){
            this.agent = {
                name: data.Des_NombreCompleto,
                dir: data.Des_Ciudad,
                job: "???",
                cod: data.CodigoMVCS,
                description: data.Des_ComentarioPersona,
                img: data.Img_Personal ? SERVER_URL + data.Img_Personal : "/images/dummy_user.jpg",
                cel: data.Des_Telefono1,
                email: data.Des_Correo1,
                NUsuario:data.NUsuario,
                empresa : data.Des_Empresa,
                stars: parseInt(data.Num_Valoracion)
            }

            this.transacciones[0].n = parseInt(data.Num_Transacciones) || 0;
            this.transacciones[1].n = parseInt(data.Num_Activas) || 0;
            this.transacciones[2].n = parseInt(data.Num_canceladas) || 0;
        }
    },
};
</script>

<style lang="scss">
.agent-component {
    .agent-img {
        width: 90%;
        height: auto;
        max-width: 290px;
    }
}
.info-card-container {
    padding: 10px;
    .info-card {
        background-color: #2f3a4a;
        border-radius: 7px;
        padding: 12px 20px;
        color: white;
        height: 100%;
        .arrow-up {
            height: 13px;
            width: 13px;
            border: 2px solid #56d837;
            border-top: none;
            border-left: none;
            margin: 8px 0px 0px 12px;
            transform: rotate(-135deg);
        }
        .arrow-down {
            height: 13px;
            width: 13px;
            border: 2px solid #ff0000;
            border-left: none;
            border-bottom: none;
            margin: 0px 0px 8px 12px;
            transform: rotate(135deg);
        }
    }
}
@media (max-width: 764px) {
    .agente-container {
        width: 95%;
        font-size: 12px;
        .info-card-container {
            padding: 5px;
        }
    }
}
</style>