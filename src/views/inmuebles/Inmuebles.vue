<template>
  <!--

        listado-de-inmueble (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/6d821de4-bfa5-4d87-879d-d9416f6b55c6/listado-de-inmueble)
        listado-de-inmueble-1 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/9c9dddc1-3559-45ac-8344-5691f5ff4895/listado-de-inmueble-1)
        listado-de-inmueble-2 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/60ee5103-e431-4bdf-9aea-45af9d43e0fc/listado-de-inmueble-2)
        MB-listado-de-inmueble (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/7faff0ca-0105-4ce5-bd70-43cf949c00fb/MB-listado-de-inmueble)

  -->

  <div>
    <div class="inmuebles-container">
      <div class="flex flex-row justify-around gap-8">
        <div class="md:w-2/6 lg:w-3/12 hidden md:block">
          <div>
            <w-card :shadow="false">
              <template slot="header">
                <p class="caption bold white-text">FILTROS</p>
              </template>

              <FiltroPublicacion :panels="panels" @onChange="handleChangedFilter"></FiltroPublicacion>
            </w-card>
          </div>
        </div>
        <div class="w-full" v-if="filtrar">
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
        <div class="w-full md:w-4/6 lg:w-9/12 px-6" v-else>
          <w-card :shadow="false">
            <div class="flex flex-row justify-between flex-wrap ml-3">
              <div class="lg:pl-3">
                <h1 class="subtitle bold">Listado de Inmuebles</h1>
              </div>
              <div class="lg:pr-3" >
                <w-btn
                  color="tertiary"
                  :dark="true"
                  style=" margin: 0px !important; display: flex;"
                  @click="gotoMapPage"
                >
          
                  Búsqueda de mapa
                  <w-icon style="margin: -6px 0px 0px 16px;" icon="address-map" h="26px"></w-icon>
                </w-btn>
              </div>
            </div>
            <br />
            <w-btn
              class="md:hidden"
              :dark="true"
              color="secondary"
              @click="showFilters = true"
            >filtrar</w-btn>
            <br />
            <div class="flex flex-row justify-between flex-wrap">
              <div class="sm:w-full md:w-2/4 lg:w-1/3 p-3" v-for="(card, i) in cards" :key="i" @click="gotoDetail(card.IdPubCabecera)">
                <w-card :image="card.image" hover="full-hover" :pointer="true" >
                  <template slot="image">
                    <p class="bold">{{ card.direccion }}</p>
                    <br />
                    <p>{{ card.descripcion }}</p>
                  </template>
                  <template slot="state">
                    <p class="white-text">{{ card.tipo }}</p>
                  </template>
                  <p class="bold">{{ card.title }}</p>
                  <p>{{ card.body }}</p>

                  <div v-if="isManager">
                    <p>Comisión</p>
                    <div class="flex flex-row justify-between">
                      <p class="body bold">{{ card.comision }}</p>
                      <p class="body bold tertiary-text">{{ card.mes }}</p>
                    </div>
                  </div>

                  <template v-if="isManager" slot="footer">
                    <div class="flex flex-row justify-between flex-wrap">
                      <div class="flex flex-row justify-between">
                        <div class="info-item">
                          <w-icon icon="room-solid" h="12px"></w-icon>
                          <p class="white-text">
                            {{card.info.habitaciones}}
                          </p>
                        </div>
                        <div class="info-item">
                          <w-icon icon="bath-solid" h="15px"></w-icon>
                          <p class="white-text">{{ card.info.baños }}</p>
                        </div>
                        <div class="info-item">
                          <w-icon icon="parking-solid" h="12px"></w-icon>
                          <p class="white-text">
                            {{card.info.estacionamiento
                            }}
                          </p>
                        </div>
                      </div>
                      <div class="info-item">
                        <w-icon icon="size" h="15px"></w-icon>
                        <p class="white-text">{{ card.info.tamaño }}</p>
                      </div>
                    </div>
                  </template>
                </w-card>
              </div>
            </div>
            <br />
            <div v-if="cards && cards.length" class="flex justify-center lg:justify-end">
              <w-pagination v-model="page" :length="pageLenth" @click="navigate()"></w-pagination>
            </div>
            <div v-else style="text-align: center; color: gray">
              No tienes publicaciones para enumerar en este momento.
            </div>
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
import FiltroPublicacion from "../../components/publicaciones/FiltroPublicacion";
import { GetInmuebles } from "@/common/inmueble_apis";
import { GetGeneralOptions } from "@/common/home_apis";
import { SERVER_URL, Filters } from "@/common/config";

export default {
  data: () => ({
    isManager: false,
    query: null,
    page: 1,
    showFilters: false,
    windowWidth: window.innerWidth,
    pageLoading: true,
    total: 0,
    countPerPage: 9,
    defaultOptions: null,
    cards: [],
    pageType: null,
    panels: Filters
  }),

  components: {
    FiltroPublicacion
  },

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
    pageLenth() {
      return Math.ceil(this.total/this.countPerPage);
    },
  },
  watch: {
      $route(to, from) {
        window.location.reload();
      },
      page: function(curPage){
        this.navigate();
      },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });

    let userToken = this.$store.getters.token;
    let user = this.$store.getters.user;
    if(userToken && user){
      if(user.type == "1" || user.type == "2") this.isManager = true;
    }  

    this.query = this.$route.query;
    GetGeneralOptions().then(res => {
      if(res && res.data) this.defaultOptions = res.data;
      this.initFilterOptions();
      this.navigate();
    }).catch(err => {
        console.log(err);
    });
  },
  methods: {
    initInmuebles(data){
      if(!data || !data.length){
        this.cards = [];
        return;
      }

      let _pub = [];
      data.map(p => {
        let _curSymbol = currencySymbol(p.IdTipoMoneda);
        let _operacion = this.defaultOptions.operation_types.find(o => o.IdTipoOperacion === p.IdTipoOperacion);

        let _addr = this.defaultOptions.locations.find(a => a.IdUbigeo === p.IdUbigeo);
        if(_addr) _addr = _addr.Distrito + ( p.Des_Urbanizacion ? ', ' + p.Des_Urbanizacion : '');
        else _addr = '';

        let _comision = this.defaultOptions.comision_types.find(c => c.IdTipoComision === p.IdTipoComision);
        if(_comision){
          if(_comision.Descripcion === "Monto") _comision = _curSymbol+ parseFloat(p.Num_Comision);
          else _comision = parseFloat(p.Num_Comision) + '%';
        }else{
          _comision = 0;
        }

          let _banios        = p.Num_Banios ? p.Num_Banios : 0;
          let _banios_visita = p.Num_BaniosVisita ? p.Num_BaniosVisita : 0;
          let _banios_total  = _banios + _banios_visita; 

        _pub.push({
          IdPubCabecera : p.IdPubCabecera,
          tipo: _operacion ? _operacion.Descripcion : null,
          title: p.Des_Titulo,
          body: _addr,
          image: p.images.length ? SERVER_URL + p.images[0].Des_url : '/images/dummy.jpg',
          comision: _comision,
          mes: _curSymbol + '/ ' + parseFloat(p.Num_Precio),
          direccion: '',
          descripcion: '',
          info: {
            habitaciones: p.Num_Habitaciones ? p.Num_Habitaciones : 0,
            baños: _banios_total,
            estacionamiento: p.Num_Cochera ? p.Num_Cochera : 0,
            tamaño: (p.Num_AreaTotal ? p.Num_AreaTotal : 0) + 'M2'
          },
        });
      })

      this.cards = _pub;
    },

    initFilterOptions(){
      if(!this.defaultOptions) return;
      let options = this.defaultOptions;
      let _panels = [], _location = null, _operacion = null, _inmueble = null;

      if(this.query){
        if(this.query.buscar) _location = this.query.buscar;
        if(this.query.operacion) _operacion = this.query.operacion;
        if(this.query.inmueble) _inmueble = this.query.inmueble;
        if(this.query.featured) this.pageType = "featured";
        if(this.query.latest) this.pageType = "latest";
      }

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
      let reqParams = this.getReqParams();    

      GetInmuebles(reqParams).then(res => {
          if(res && res.data){
              this.initInmuebles(res.data.publications);
              this.total = res.data.total;
          }
          this.pageLoading = false;
      }).catch(err => {
          console.log('publications...', err);
          this.pageLoading = false;
      });
    },

    gotoMapPage(){
      localStorage.setItem('Prop_filter', JSON.stringify(this.panels));
      this.$router.push({path: '/inmuebles/mapa', query: this.query});
    },

    gotoDetail(Id){
      if(!this.isManager) return;
      this.$router.push('/publicaciones/detalle/' + Id);
    }
  },
};
</script>

<style lang="scss" scoped>
.inmuebles-container {
  width: 95%;
  margin: auto;
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
