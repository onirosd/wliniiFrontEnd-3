<template>
    <!-- 
      
      perfil-brocker (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/b5f0b7d5-a936-492b-8c21-281c3b652875/perfil-brocker)
      MB-perfil-brocker (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/d1ba886f-f9ef-46e6-9300-740ebcbb070d/MB-perfil-broker)

    -->
    <div>
        <div class="brocker-container">
            <w-card :shadow="false">
                <!-- PERFIL -->
                <div class="flex flex-row justify-between flex-wrap">
                    <div class="w-full block md:hidden ml-2">
                        <p class="bold">PERFIL BROKER</p>
                        <div class="divider my-3"></div>
                        <p class="bold" style="font-size: 28px;">{{ company.name }}</p>
                        <p class="mb-8">{{ company.dir }}</p>
                    </div>
                    <div class="w-full md:w-1/3">
                        <div class="flex flex-col items-center flex-wrap">
                            <div class="w-full flex flex-row justify-center">
                                <div class="brocker-img" style="background-image: url('/images/banners/3.png')"></div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-2/3">
                        <div class="hidden md:block">
                            <p class="bold">PERFIL BROKER</p>
                            <div class="divider my-5"></div>
                            <div class="flex justify-between items-center">
                                <p class="subtitle bold mt-5 md:mt-0">{{ company.name }}</p>
                                <w-snackbar class="mt-1">
                                    <w-icon icon="info" h="24px"></w-icon>
                                    <template slot="content">
                                        <p class="bold">Importante!</p>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit</p>
                                    </template>
                                </w-snackbar>
                            </div>

                            <p class="mb-8">{{ company.dir }}</p>
                        </div>
                        <div class="full-divider hidden md:block mt-5"></div>
                        <div class="flex flex-row flex-wrap mt-5 ml-2 md:mt-0 md:ml-0">
                            <div class="w-full md:w-1/3 my-0 md:my-3">
                                <p class="bold tertiary-text">Cel.</p>
                            </div>
                            <div class="w-full md:w-2/3 my-3 md:my-3">
                                <div class="flex flex-row justify-between">
                                    <p>{{ company.tel }}</p>
                                    <div
                                        class="hidden md:w-auto md:flex md:flex-row md:justify-end"
                                    >
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
                            <div class="w-full md:w-1/3 my-0 md:my-3">
                                <p class="bold tertiary-text">Email</p>
                            </div>
                            <div class="w-full md:w-2/3 my-3 md:my-3">
                                <p>{{ company.email }}</p>
                            </div>
                            <div class="w-full md:w-1/3 my-0 md:my-3">
                                <p class="bold tertiary-text">Acerca de mi</p>
                            </div>
                            <div class="w-full md:w-2/3 my-3 md:my-3">
                                <p>{{ company.description }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex flex-row justify-start md:hidden">
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
                <!-- USERS -->
                <div class="my-6 hidden md:block my-5" v-for="(user, i) in users" :key="i">
                    <w-card :shadow="false" class="user-row">
                        <div class="flex flex-row justify-between">
                            <div class="w-1/2 flex flex-row justify-between flex-wrap">
                                <!-- BOTON -->
                                <div class="w-1/2 xl:w-1/3 self-center px-0 md:px-5">
                                    <w-btn
                                        :color="user.state ? 'secondary' : 'primary'"
                                        :dark="true"
                                        :rounded="true"
                                        :fullwidth="true"
                                        :small="true"
                                        style="margin: 0px;"
                                        @click="changePersonState(i)"
                                    >{{ user.state ? 'Desafiliar' : 'Afiliar' }}</w-btn>
                                </div>
                                <!-- ESTRELLAS -->
                                <div
                                    class="w-1/2 xl:w-1/3 md:hidden xl:flex flex-row justify-center px-1 md:px-5"
                                >
                                    <w-btn
                                        :icon="true"
                                        v-for="i in 5"
                                        :key="i"
                                        :disabled="true"
                                        style="margin: 2px; background-color: transparent !important;"
                                    >
                                        <w-icon
                                            :icon="user.stars >= i ? 'star-brown' : 'star-grey'"
                                            h="14px"
                                        ></w-icon>
                                    </w-btn>
                                </div>
                                <!-- NOMBRE Y FOTO -->
                                <div class="w-1/2 xl:w-1/3 self-center">
                                    <div
                                        class="flex flex-row justify-center user-check mx-2"
                                        :class="user.state ? 'user-check-active' : ''"
                                        @click="selectPerson(i)"
                                    >
                                        <div class="w-1/2">
                                            <div class="avatar">
                                                <img :src="user.image" />
                                            </div>
                                        </div>
                                        <div class="w-1/2 self-center">
                                            <p
                                                class="bold"
                                                style="line-height: 1.2;"
                                            >{{ user.name }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="w-1/2 flex flex-row justify-between flex-wrap">
                                <div class="w-4/6 self-center px-2">
                                    <p>{{ user.content }}</p>
                                </div>
                                <div class="w-1/6 self-center px-2">
                                    <p>ESTADO</p>
                                    <p
                                        :class="user.state ? 'success-text' : ''"
                                    >{{ user.state ? "AFILIADO": "Sin afiliar" }}</p>
                                </div>
                            </div>
                        </div>
                    </w-card>
                </div>

                <div class="hidden md:flex lg:flex xl:flex justify-center lg:justify-end">
                    <w-pagination v-model="page" :length="totalpage" @click="navigate()"></w-pagination>
                </div>

                <div class="block md:hidden my-5">
                    <w-carousel :items="1" :pagination="true" :navigation="false">
                        <slide v-for="(user, i) in users" :key="i">
                            <div class="px-1">
                                <w-card :shadow="false" class="user-card">
                                    <div class="flex flex-row justify-center flex-wrap">
                                        <div class="w-full self-center">
                                            <div
                                                class="flex flex-row justify-between user-check mx-2"
                                                :class="user.state ? 'user-check-active' : ''"
                                                @click="selectPerson(i)"
                                            >
                                                <div class="w-1/4">
                                                    <div class="avatar">
                                                        <img :src="user.image" />
                                                    </div>
                                                </div>
                                                <div class="w-2/4 self-center">
                                                    <p
                                                        class="bold"
                                                        style="line-height: 1.2;"
                                                    >{{ user.name }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-full my-5 px-5">
                                            <p class="text-center">{{ user.content }}</p>
                                        </div>
                                        <div class="w-full flex flex-row justify-center px-1">
                                            <w-btn
                                                :icon="true"
                                                v-for="i in 5"
                                                :key="i"
                                                :disabled="true"
                                                style="margin: 2px;"
                                            >
                                                <w-icon
                                                    :icon="user.stars >= i ? 'star-brown' : 'star-grey'"
                                                    h="14px"
                                                ></w-icon>
                                            </w-btn>
                                        </div>
                                        <div class="w-full my-5">
                                            <p class="text-center">
                                                Estado:
                                                <span
                                                    :class="user.state ? 'success-text' : ''"
                                                >{{ user.state ? "AFILIADO" : "Sin afiliar" }}</span>
                                            </p>
                                        </div>
                                        <w-btn
                                            :color="user.state ? 'secondary' : 'primary'"
                                            :dark="true"
                                            :rounded="true"
                                            :small="true"
                                            style="margin: 0px;"
                                            @click="changePersonState(i)"
                                        >{{ user.state ? 'Desafiliar' : 'Afiliar' }}</w-btn>
                                    </div>
                                </w-card>
                            </div>
                        </slide>
                    </w-carousel>
                </div>
            </w-card>
            <br />
        </div>
    </div>
</template>

<script>
import { GetBrokerProfile, GetRelatedPersonas, UnAfiliarPerson, AfiliarPerson } from "@/common/broker_apis";
import { SERVER_URL } from "@/common/config";
import { notify } from "@/common/helpers";

export default {
    data() {
        return {
            page: 1,
            totalpage: 1,
            perPage: 10,
            updatingIndex: -1,
            windowWidth: window.innerWidth,
            company: {},
            totalPersons: [],
            users: [],
            selectedPerson: 1
        };
    },
    watch: {
        page: function(curPage){
            this.navigate();
        },
    },
    computed: {
        // carrouselItems() {
        //     if (this.windowWidth >= 768) {
        //         return this.windowWidth >= 1024 ? 3 : 2;
        //     } else {
        //         return 1;
        //     }
        // }
    },

    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });

        GetBrokerProfile().then(res => {
            if(res) this.initCompanyInfo(res.data);
        }).catch(err => {
            console.log('Broker profile error', err);
        });

        this.page = 1;
        this.refreshPersons();
    },
    methods: {
        refreshPersons(){
            GetRelatedPersonas().then(res => {
                if(res) this.initRelatedPersonas(res.data);
            }).catch(err => {
                console.log('Related Persona error', err);
            });
        },
        initCompanyInfo(data){
            this.company = {
                name: data.Des_NombreCompleto,
                dir: data.Des_Ubicacion,
                tel: data.Des_Telefono1,
                email: data.Des_Correo1,
                description: data.Des_ComentarioPersona,
                image: data.Img_Personal
            }
        },
        initRelatedPersonas(data){
            let _persons = [...data.affiliated, ...data.unAffiliated];
            
            this.totalPersons = [];
            _persons.map(p => {
                let _person = {
                    state: parseInt(p.Estado) ? true: false,
                    stars: 3,
                    image: p.Img_Personal ?  SERVER_URL + p.Img_Personal : '/images/dummy_user.jpg',
                    name: p.Nombre,
                    select: false,
                    content: p.Comentario
                }

                if(p.IdPersonal) _person['IdPersonal'] = p.IdPersonal;
                else if(p.IdbdSolicitudes) _person['IdbdSolicitudes'] = p.IdbdSolicitudes;

                this.totalPersons.push(_person);
            });

            this.totalpage = Math.ceil(this.totalPersons.length/this.perPage);
            this.navigate();
        },

        selectPerson(index){
            this.selectedPerson = index;
        },

        changePersonState(index){
            if(this.updatingIndex == index) return;
            this.updatingIndex = index;

            let _indexInTotal = (this.page - 1) * this.perPage + index;
            let _person = this.totalPersons[_indexInTotal];

            let staf, id;
            if(_person.IdPersonal){
                id = _person.IdPersonal;
                staf = 0;
            }else if(_person.IdbdSolicitudes){
                id = _person.IdbdSolicitudes;
                staf = 1;
            }else return;

            AfiliarPerson(id, staf).then(res => {
                this.refreshPersons();
                this.updatingIndex = -1;
                notify('success', null, 'Persona afiliada correctamente.');
            }).catch(err => {
                notify('error', null, err.data.response ? err.data.response.error : 'Persona no afiliada a una empresa.');
                this.refreshPersons();
                this.updatingIndex = -1;
            });
        },

        navigate(){
            let _start = (this.page - 1) * this.perPage;
            let _end = this.page * this.perPage;
            this.users = this.totalPersons.slice(_start, _end);
        }
    },
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.brocker-container {
    width: 90%;
    margin: auto;

    .brocker-img {
        width: 90%;
        height: 370px;
        max-width: 290px;
        max-height: 370px;
        background-repeat: no-repeat;
        background-position: top center;
    }

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

    .user-row {
        .card-text {
            background-color: #f5f5f5;
            .user-check {
                cursor: pointer;
                padding: 6px 0px;
                border-radius: 5px;
                &.user-check-active {
                    background-color: $primary;
                    color: white;
                }

                .avatar {
                    width: 45px;
                    height: 45px;
                    margin: auto;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid $secondary;
                }
            }
        }
    }

    .user-card {
        .card-text {
            background-color: #f5f5f5;
            padding: 16px;
            .user-check {
                cursor: pointer;
                padding: 8px 16px;
                border-radius: 5px;
                &.user-check-active {
                    background-color: $primary;
                    color: white;
                }

                .avatar {
                    width: 52px;
                    height: 52px;
                    margin: auto;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid $secondary;
                }
            }
        }
    }
}

@media (max-width: 764px) {
    .brocker-container {
        width: 95%;
        font-size: 12px;
    }
}
</style>
