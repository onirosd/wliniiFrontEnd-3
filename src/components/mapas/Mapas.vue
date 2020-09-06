<template>
    <div class="map">
        <gmap-map
            ref="mapRef"
            :center="center"
            :zoom="12"
            :options="mapOptions"
            style="width: 100%; height: 600px;"
            @click="closeInfoWindow()"
        >
            <span v-for="(m, index) in markers" :key="index">
                <gmap-marker
                    v-if="m.isShowAddress"
                    :icon="markerOptions"
                    :position="m.position"
                    @click="toggleInfoWindow(m, index)"
                ></gmap-marker>
                <gmap-circle
                    v-else
                    :center="m.position"
                    :radius="radius"
                    :visible="true"
                    :options="{strokeColor: '#0064bd20', fillColor: '#0064bd', fillOpacity:0.4}"
                    @click="toggleInfoWindow(m, index)"
                ></gmap-circle>
            </span>
            <gmap-info-window
                :options="infoOptions"
                :position="infoWindowPos"
                :opened="infoWinOpen"
                @closeclick="infoWinOpen = false"
            >
                <w-card :image="card.image ? card.image : '/images/dummy.jpg'" :shadow="false" class="map-card">
                    <p class="bold" style="font-size: 11px;">{{card.Des_Titulo}}</p>
                    <div class="flex justify-between" style="align-items: center">
                      <p  class="body bold tertiary-text">{{ card.Comision }}</p>
                      <p v-if="card.Consultar" class="body bold tertiary-text">Consultar Precio</p>
                      <p v-else class="body bold tertiary-text">{{ card.Precio }}</p>
                    </div>

                    <p>{{ card.address }}</p>
                    <p>Area Total: {{ card.areaTotal }}</p>
                    <p>{{ card.Habitaciones }} Habitaciones, {{ card.Cochera }} Cochera</p>
                    <!-- <br />
                    <div class="flex flex-row justify-between flex-wrap">
                        <p>{{ card.entrega }}</p>
                        <p>{{ card.condicion }}</p>
                    </div> -->
                    <w-btn
                        :fullwidth="true"
                        :dark="true"
                        :rounded="true"
                        @click="$router.push('/publicaciones/detalle/' + card.IdPubCabecera)"
                    >ir al detalle</w-btn>
                    <br />
                </w-card>
            </gmap-info-window>
        </gmap-map>
    </div>
</template>

<script>
export default {
    props: {
        markers: Array,
        center: Object,
        showInfo: {
            type: Boolean,
            default: true
        }
    },

    data: () => ({
        radius: 1000,
        mapOptions: {
            mapTypeControl: false,
            streetViewControl: false
        },
        markerOptions: {
            url: "/images/address-red.png",
            size: { width: 22.5, height: 31.5, f: "px", b: "px" },
            scaledSize: { width: 22.5, height: 31.5, f: "px", b: "px" }
        },

        infoWindowPos: {
            lat: 0,
            lng: 0
        },
        infoWinOpen: false,

        infoOptions: {
            pixelOffset: {
                width: 0,
                height: -35
            }
        },
        card: {}
    }),

    watch: {
        'markers'(val){
            this.card = {};
            this.infoWinOpen = false;
        }
    },
    methods: {
        toggleInfoWindow(marker, idx) {
            if (this.showInfo) {
                this.infoWindowPos = marker.position;
                this.card = marker;
                this.infoWinOpen = !this.infoWinOpen;
            }
        },

        closeInfoWindow() {
            this.infoWinOpen = false;
        }
    }
};
</script>

<style lang="scss">
.map {
    .gm-style-iw-t {
        .gm-style-iw,
        .gm-style-iw-c {
            padding: 0px !important;
            border-radius: 15px !important;
            max-height: none !important;
            max-width: none !important;
            .gm-style-iw-d {
                overflow: hidden !important;
                max-height: none !important;
                max-width: none !important;
            }
            .gm-ui-hover-effect {
                top: 0px !important;
                right: 0px !important;
                img {
                    filter: invert(100%) opacity(100%);
                    height: 28px;
                    width: 28px;
                }
            }
        }
    }

    .map-card {
        width: 264px;
        .card-text {
            padding: 16px;
            line-height: 1.6;
        }
    }
}
</style>
