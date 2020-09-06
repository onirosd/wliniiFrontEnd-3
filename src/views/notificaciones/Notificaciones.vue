<template>
    <!-- 

        lista-de-notificaciones-del-usuario (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/629a1aff-a853-4e98-926d-2a4724a012d5/logeado-Lista-de-Notiicaciones-del-usuario-)
        MB-lista-de-notificaciones-del-usuario (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/0543b284-4a94-4a3b-a981-643ca857c6d3/MB-notificaciones/)    

    -->
    <div class="notificaciones">
        <div class="notificaciones-container">
            <w-card :shadow="false" class="container-card">
                <p class="subtitle bold ml-2">Notificaciones</p>
                <p class="ml-2">Se tienen {{total}} notificaciones</p>
                <div class="my-6" v-for="(noti, i) in notifications" :key="i">
                    <w-card :shadow="false" class="noti-card">
                        <div class="flex flex-row justify-between flex-wrap">
                            <div class="w-1/6 md:hidden">
                                <div class="avatar">
                                    <img :src="noti.image" />
                                </div>
                            </div>
                            <div
                                class="w-5/6 md:w-full flex flex-col-reverse md:flex-row justify-between"
                            >
                                <div class="w-full md:w-3/4 flex flex-row flex-wrap">
                                    <!-- BOTON -->
                                    <div class="w-1/2 md:w-1/3 self-center px-0 md:px-5">
                                        <w-btn
                                            :color="noti.state ? 'primary' : 'secondary'"
                                            :dark="true"
                                            :rounded="true"
                                            :fullwidth="true"
                                            :small="true"
                                            style="margin: 0px;"
                                            @click="updateNotification(i)"
                                        >{{ noti.state ? 'finalizado' : 'guardar' }}</w-btn>
                                    </div>
                                    <!-- ESTRELLAS -->
                                    <div v-if="noti.state" class="w-1/2 md:w-1/3 md:flex flex-row justify-center px-1 md:px-5">
                                        <w-btn
                                            :icon="true"
                                            v-for="s in 5"
                                            :key="s"
                                            :disabled="true"
                                            style="margin: 2px; background-color: transparent !important;"
                                        >
                                            <w-icon
                                                :icon="noti.stars >= s ? 'star-brown' : 'star-grey'"
                                                h="14px"
                                            ></w-icon>
                                        </w-btn>
                                    </div>
                                    <div v-else class="w-1/2 md:w-1/3 md:flex flex-row justify-center px-1 md:px-5">
                                        <w-btn
                                            :icon="true"
                                            v-for="s in 5"
                                            :key="s"
                                            @click="setValoracion(i, s)"
                                            style="margin: 2px; background-color: transparent !important;"
                                        >
                                            <w-icon
                                                :icon="noti.formData.valoracion >= s ? 'star-brown' : 'star-grey'"
                                                h="14px"
                                            ></w-icon>
                                        </w-btn>
                                    </div>
                                    <!-- IMAGEN Y NOMBRE -->
                                    <div class="hidden md:block w-1/2 md:w-1/3 self-center">
                                        <div class="flex flex-row justify-center">
                                            <div class="w-1/3">
                                                <div class="avatar">
                                                    <img :src="noti.image" />
                                                </div>
                                            </div>
                                            <div class="w-2/3 self-center">
                                                <p
                                                    class="bold"
                                                    style="line-height: 1.2;"
                                                >{{ noti.name }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    class="w-full md:w-1/4 flex flex-row justify-between flex-wrap"
                                >
                                    <div class="w-full md:hidden">
                                        <p class="body bold ml-2">{{ noti.name }}</p>
                                    </div>

                                    <!-- <div v-if="noti.state" class="w-full md:w-5/6 self-center px-2">
                                        <p>{{ noti.content }}</p>
                                    </div>
                                    <div v-else class="w-full md:w-5/6 self-center px-2">
                                        <div :class="noti.error ? 'desc-container err' : 'desc-container'">
                                            <textarea name="" id="" rows="2" v-model="noti.formData.descripcion"></textarea>
                                        </div>
                                    </div> -->

                                    <div class="w-full self-center px-2">
                                        <p
                                            class="bold text-left md:text-center mb-5 mt-1 md:mb-0 mb:mt-0"
                                        >{{ noti.date }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </w-card>
                </div>
                <br />
                <div class="flex justify-center lg:justify-end">
                    <w-pagination v-model="page" :length="totalPage" @click="navigate()"></w-pagination>
                </div>
            </w-card>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { GetNotifications, UpdateNotification } from "@/common/notification_apis";
import { notify } from "@/common/helpers";
import { SERVER_URL } from "@/common/config";

export default {
    data: () => ({
        page: 1,
        perPage: 10,
        total: 0,
        totalPage: 0,
        updatingIndex: -1,
        notifications: []
    }),
    watch: {
        page: function(curPage){
            this.navigate();
        },
    },
    mounted() {
        this.page = 1;
        this.navigate();
    },
    methods: {
        navigate(){
            let param = {
                page: this.page,
                count: this.perPage
            };

            GetNotifications({page: this.page, count: this.perPage}).then(res => {
                if(res) this.initNotifications(res.data);
            }).catch(err => {
                console.log('get notifications error', err);
            });
        },
        initNotifications(data){
            this.total = data.total ? parseInt(data.total) : 0;
            this.totalPage = Math.ceil(this.total/this.perPage);

            let _notiList = [];
            data.notifications.map(n => {
                _notiList.push({
                    id: n.IdNotificacion,
                    name: n.Des_NombreCompleto,
                    state: parseInt(n.Flg_Estado) ? 1 : 0,
                    image: n.Img_Personal ? SERVER_URL + n.Img_Personal : 'images/dummy_user.jpg',
                    content: n.Des_Detalle,
                    date: this.$moment(n.FechaCreacion.slice(0, 19), 'YYYY-MM-DD hh:mm:ss').fromNow(),
                    stars: n.Num_Valoracion,
                    formData: {
                        valoracion: 0,
                        descripcion: ''
                    },
                    // error: false
                });
            });

            this.notifications = _notiList;
        },
        updateNotification(index){
            if(this.updatingIndex === index) return;
            this.updatingIndex = index;

            let _noti = this.notifications[index];
            // if(!_noti.formData.descripcion) {
            //     this.notifications[index].error = true;
            //     return;
            // }

            UpdateNotification(_noti.id, _noti.formData).then(res => {
                this.updatingIndex = -1;
                if(res) this.navigate();
            }).catch(err => {
                this.updatingIndex = -1;
                notify('error', null, 'Solicitud fallida');
            });
        },
        setValoracion(index, stars){
            this.notifications[index].formData['valoracion'] = stars;
        }
    },
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.desc-container{
    border: thin solid black;
    border-radius: 21px;
    padding: 12px;
    textarea{
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        resize: none;
    }
}
.desc-container.err{
    border: thin solid red;
}
.notificaciones {
    .notificaciones-container {
        padding: 35px 150px;
        .noti-card {
            .card-text {
                background-color: #f5f5f5;
                .avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid $secondary;
                }
            }
        }
    }
}

@media (max-width: 1024px) {
    .notificaciones {
        .notificaciones-container {
            padding: 0px !important;
            margin-top: -20px;
            .container-card {
                border-radius: 0px !important;
            }
            .noti-card {
                .card-text {
                    padding: 25px 15px;
                }
            }
        }
    }
}
</style>