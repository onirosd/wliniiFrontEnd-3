<template>
    <!-- Paginas 30 - 36 - 39 - 41 -->
    <div>
        <div class="inmuebles-container">
            <div class="flex flex-row justify-around gap-8">
                <div class="w-full pb-16" v-if="filtrar">
                    <div class="filter">
                        <div class="filter-header">filtros</div>
                        <div class="filter-body">
                            <FiltroPublicacion :panels="panels" @onChange="handleChangedFilter"></FiltroPublicacion>
                            <w-btn
                                :fullwidth="true"
                                color="secondary"
                                :dark="true"
                                @click="showFilters = false"
                            >filtrar</w-btn>
                        </div>
                    </div>
                </div>
                <div class="w-full px-6" v-else>
                    <w-card :shadow="false" style="overflow: inherit;">
                        <div class="float-filter w-4/12 lg:w-3/12 hidden md:block">
                            <w-card>
                                <template slot="header">
                                    <p class="caption bold white-text">FILTROS APLICADOS</p>
                                </template>

                                <FiltroPublicacion :panels="panels" @onChange="handleChangedFilter"></FiltroPublicacion>
                            </w-card>
                        </div>
                        <h1 class="subtitle bold text-center md:text-right">Listado de Inmuebles</h1>

                        <div class="pb-2 lg:pb-0">
                            <w-btn
                                class="md:hidden"
                                :dark="true"
                                color="secondary"
                                @click="showFilters = true"
                            >filtrar</w-btn>
                        </div>
                        <br />

                        <Mapas :center="center" :markers="markers"></Mapas>

                        <br />
                    </w-card>
                </div>
            </div>
        </div>
        <overlay-page-loader :loading="pageLoading"/>
        <br />
    </div>
</template>

<script>
import { currencySymbol } from "@/common/helpers";
import Mapas from "../../components/mapas/Mapas";
import FiltroPublicacion from "../../components/publicaciones/FiltroPublicacion";
import { GetInmueblesInMapa } from "@/common/inmueble_apis";
import { GetGeneralOptions } from "@/common/home_apis";
import { SERVER_URL } from "@/common/config";

export default {
    data: () => ({
        showFilters: false,
        windowWidth: window.innerWidth,
        pageLoading: true,
        publications: [],
        defaultOptions: null,
        center: { lat: -12.1122095, lng: -77.047945 },
        markers: [],
        pageType: null,
        panels: [
            {
            state: false,
            name: "Ubicación",
            options: [],
            selectOption: null
            },
            {
            state: false,
            name: "Tipo de Operación",
            options: [],
            toggle: true,
            selectOption: null
            },
            {
            state: false,
            name: "Tipo de inmueble",
            options: [],
            toggle: true,
            selectOption: null
            },
            {
            state: false,
            name: "Fecha de Publicación",
            type: null,
            toggle: true,
            options: ["Desde Ayer", "Hoy", "Última Semana", "Últimos 15 Días", "Últimos 30 Días", "Últimos 45 Días"],
            selectOption: null
            },
            {
            state: false,
            name: "Dormitorios",
            type: "row",
            options: ["1", "2", "3", "4", ">5"],
            selectOption: null
            },
            {
            state: false,
            name: "Baños",
            type: "row",
            options: ["1", "2", "3", "4", ">5"],
            selectOption: null
            },
            {
            state: false,
            name: "Estacionamientos",
            type: "row",
            options: ["1", "2", "3", "4", ">5"],
            selectOption: null
            },
            {
            state: false,
            name: "Superficie",
            type: "selection-range",
            toggle: true,
            options: ["Techada", "Total"],
            selectOption: null,
            range: []
            },
            {
            state: false,
            name: "Precio",
            type: "selection-range",
            toggle: true,
            options: ["Soles", "Dolares", "Euros"],
            selectOption: null,
            range: []
            }
        ]
    }),

    computed: {
        filtrar() {
            if (this.showFilters) {
                if (this.windowWidth >= 768) {
                    this.showFilters = false;
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        },
    },
    created() {
        let params = this.$route.query;

        GetGeneralOptions().then(res => {
            if(res && res.data) this.initFilterOptions(res.data, params);
            this.navigate();
        }).catch(err => {
            console.log(err);
        });
        
    },
    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });
    },

    components: {
        FiltroPublicacion,
        Mapas
    },

    methods: {
        initPublications(data){
            if(!data || !data.length){
                this.markers = [];
                return;
            }

            let _pub = [];
            data.map(p => {
                let _curSymbol = currencySymbol(p.IdTipoMoneda);
                let _addr = this.defaultOptions.locations.find(a => a.IdUbigeo == p.IdUbigeo);
                if(_addr) _addr = _addr.Distrito + ( p.Des_Urbanizacion ? ', ' + p.Des_Urbanizacion : '');
                else _addr = '';

                let _comision = this.defaultOptions.comision_types.find(c => c.IdTipoComision == p.IdTipoComision);
                if(_comision){
                    if(_comision.Descripcion === "Monto") _comision = _curSymbol + parseFloat(p.Num_Comision);
                    else _comision = parseFloat(p.Num_ComisionCompartir) + '%';
                }else{
                    _comision = 0;
                }

                // let _state = this.defaultOptions.pub_states.find(s => s.Id_EstadoPublicacion == p.detail[0].Id_EstadoPublicacion);
                
                _pub.push({
                    IdPubCabecera : p.IdPubCabecera,
                    position: p.Des_Coordenadas ? JSON.parse(p.Des_Coordenadas) : null,
                    isShowAddress: p.Flg_MostrarDireccion ? true : false,
                    image: p.images.length ? SERVER_URL + p.images[0].Des_url : null,
                    // dir: p.Des_DireccionManual,
                    // state: _state.Descripcion,
                    FechaCreacion: p.FechaCreacion,
                    Des_Titulo: p.Des_Titulo,
                    IdUbigeo: p.IdUbigeo,
                    Des_Urbanizacion: p.Des_Urbanizacion,
                    address:_addr,
                    areaTotal: p.Num_AreaTotal + 'M2',
                    Habitaciones: p.Num_Habitaciones ? p.Num_Habitaciones : 0,
                    Cochera: p.Num_Cochera ? p.Num_Cochera : 0,
                    Comision: _comision,
                    Precio:   _curSymbol +(p.IdTipoMoneda == 2 ? ' ':'/ ')+ parseFloat(p.Num_Precio ? p.Num_Precio : 0),
         
                   // Precio: _curSymbol + '/ ' +parseFloat(p.Num_Precio),
                    Consultar: p.Flg_Consultar,

                });
            })

            this.markers = _pub;
        },
        initFilterOptions(options, params){
            this.defaultOptions = options;

            let _location = null, _operacion = null, _inmueble = null;

            if(params){
                if(params.buscar) _location = params.buscar;
                if(params.operacion) _operacion = params.operacion;
                if(params.inmueble) _inmueble = params.inmueble;
                if(params.featured) this.pageType = "featured";
                if(params.latest) this.pageType = "latest";
            }

            let prop_filter = localStorage.getItem('Prop_filter');
            if(prop_filter){
                try{
                    this.panels = JSON.parse(prop_filter);
                    localStorage.removeItem('Prop_filter');
                    return;
                }catch(err){
                    console.log('filter status load failed');
                }
            }

            let _panels = [];

            let locations = options.locations;
            let locationList = [];
            locations.map(l => { locationList.push(l.FullText); });
            _panels.push({
                state: false,
                name: "Ubicación",
                type: 'search-list',
                options: locationList,
                selectOption: _location
            });

            let operaciones = options.operation_types;
            let operationList = [];
            operaciones.map(o => { operationList.push(o.Descripcion); });
            _panels.push({
                state: false,
                name: "Tipo de Operación",
                type: null,
                toggle: true,
                options: operationList,
                selectOption: _operacion
            });

            let inmuebles = options.inmueble_types;
            let inmuebleList = [];
            inmuebles.map(i => { inmuebleList.push(i.Descripcion); });
            _panels.push({
                state: false,
                name: "Tipo de inmueble",
                type: null,
                toggle: true,
                options: inmuebleList,
                selectOption: _inmueble
            });

            this.panels = [..._panels, ...this.panels.slice(3)];
        },
        
        handleChangedFilter(name, value){
            const find = this.panels.find(e => e.name === name);
            const index = this.panels.indexOf(find);
            this.panels[index].selectOption = value;

            if(name === 'Superficie') this.panels[index].display = value ? value.option + ': ' + value.from + ' - ' + value.to : null;
            if(name === 'Precio') this.panels[index].display = value ? value.option + ': ' + value.from + ' - ' + value.to : null;
            if(name === 'Dormitorios') this.panels[index].display = value ? 'Dormitorios: ' + value : null;
            if(name === 'Baños') this.panels[index].display = value ? 'Baños: ' + value : null;
            if(name === 'Estacionamientos') this.panels[index].display = value ? 'Estacionamientos: ' + value : null;

            this.page = 1;
            this.navigate();
        },

        getReqParams(){
            let reqParams = {
                page: this.page,
                count: this.countPerPage,
            }

            if(this.pageType){
                reqParams['type'] = this.pageType;
            }

            if(this.panels[0].selectOption){
                let location = this.defaultOptions.locations.find(l => l.FullText === this.panels[0].selectOption);
                reqParams['IdUbigeo']=location.IdUbigeo;
            }
            
            if(this.panels[1].selectOption){
                let operation = this.defaultOptions.operation_types.find(o => o.Descripcion === this.panels[1].selectOption);
                reqParams['IdTipoOperacion']=operation.IdTipoOperacion;
            }

            if(this.panels[2].selectOption){
                let inmueble = this.defaultOptions.inmueble_types.find(i => i.Descripcion === this.panels[2].selectOption);
                reqParams['IdTipoInmueble']=inmueble.IdTipoInmueble;
            }

            if(this.panels[3].selectOption){
                let ago = 'today';
                if(this.panels[3].selectOption === 'Desde Ayer') ago = '-1 day';
                else if(this.panels[3].selectOption === 'Última Semana') ago = '-1 week';
                else if(this.panels[3].selectOption === 'Últimos 15 Días') ago = '-15 days';
                else if(this.panels[3].selectOption === 'Últimos 30 Días') ago = '-30 days';
                else if(this.panels[3].selectOption === 'Últimos 45 Días') ago = '-45 days';
                reqParams['FechaCreacion'] = ago;
            }

            if(this.panels[4].selectOption){
                let _num = Number(this.panels[4].selectOption);
                reqParams['Num_Habitaciones']=_num ? _num : 5;
            }

            if(this.panels[5].selectOption){
                let _num = Number(this.panels[5].selectOption);
                reqParams['Num_Banios']=_num ? _num : 5;
            }

            if(this.panels[6].selectOption){
                let _num = Number(this.panels[6].selectOption);
                reqParams['Num_Cochera']=_num ? _num : 5;
            }

            if(this.panels[7].selectOption){
                let superficie = this.panels[7].selectOption;
                if(superficie.option === 'Total')
                reqParams['Num_AreaTotal'] = [Number(superficie.from), Number(superficie.to)];
                else
                reqParams['Num_AreaTechado'] = [Number(superficie.from), Number(superficie.to)];
            }

            if(this.panels[8].selectOption){
                let price = this.panels[8].selectOption;
                let findMoneda = this.defaultOptions.moneda_types.find(m => m.Descripcion === price.option);
                reqParams['IdTipoMoneda'] = findMoneda.IdTipoMoneda;
                reqParams['Num_Precio'] = [Number(price.from), Number(price.to)];
            }

            return reqParams;
        },
        navigate(){
            this.pageLoading = true;
            let token = this.$store.getters.token;
            let reqParams = this.getReqParams();      

            GetInmueblesInMapa(reqParams).then(res => {
                if(res && res.data){
                    this.initPublications(res.data.publications);
                    this.total = res.data.total;
                }
                this.pageLoading = false;
            }).catch(err => {
                console.log('publications...', err);
                this.pageLoading = false;
            });
        }
    },
};
</script>

<style lang="scss" scoped>
.inmuebles-container {
    width: 95%;
    margin: auto;
    .float-filter {
        position: absolute;
        z-index: 4;
        left: 30px;
    }
}

@media (max-width: 764px) {
    .inmuebles-container {
        width: 100%;
    }
}

.filter {
    background-color: white;
    .filter-header {
        width: 100%;
        background-color: #ff7500;
        color: white;
        text-align: center;
        font-size: 13px;
        font-weight: bold;
        text-transform: uppercase;
        padding: 12px;
    }
    .filter-body {
        padding: 12px;
    }
}
</style>
