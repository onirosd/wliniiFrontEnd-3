<template>
  <!--
        AMC-2 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/a65a74cc-d205-4719-82f8-8e12fd489483/AMC-2)
        MB-AMC-2 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/69f65c4f-6de4-4cb9-aec9-12ba0bdac37e/MB-AMC-2)
        MB-AMC-2-1 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/dd038808-f064-4b0d-963b-bc5fe4209bfc/MB-AMC-2-1)
        AMC-3 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/719ad7aa-aa1a-47a1-86a8-74e58a4110e5/AMC-3)
        MB-AMC-3 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/537968de-610f-4f6f-87cc-b43a657829c0/MB-AMC-3)

  -->
  <div class="amc-2">
    <div class="amc-container md:py-16">
      <div class="w-full" v-if="filtrar">
        <div class="filter">
          <div class="filter-header">filtros</div>
          <div class="filter-body">
            <FiltroPublicacion :panels="panels" @onChange="handleChangedFilter" :disabled="step === 3"></FiltroPublicacion>
            <w-btn
              :fullwidth="true"
              color="secondary"
              :dark="true"
              @click="showFilters = false"
            >filtrar</w-btn>
          </div>
        </div>
      </div>
      <w-card :shadow="false" v-else>
        <div>
          <p class="body subtitle-md bold ml-5">Análisis de Mercado Comparativo (AMC)</p>
          <p class="caption primary-text ml-5">Aplicación de analisis de precios</p>
          <w-btn
            :disabled="true"
            :rounded="true"
            :dark="true"
            :small="true"
            color="primary"
            class="step-btn"
          >0{{step}} PASO</w-btn>
         
       
         <div class="flex flex-row" style="align-items:center">
          <div class="w-full p-5 md:pl-5 md:pr-2">
             <p v-if="step == 2" class="body subtitle-md bold ml-5">Agregar Oferta Pública</p>
              <p v-else class="body subtitle-md bold ml-5">Agregar Vendidos o Agregar Alquilados</p>
          </div>
          <div class="flex flex-row justify-center md:pr-2 md:justify-end md:mr-5">
            
              <w-btn
              :dark="true"
              :fullwidth="true"
              color="primary"
              @click="nextStep"
            >siguiente</w-btn>
            
          </div>
    </div>

          <div class="w-full px-5">
            <progress value="50" max="100" class="amc-progress"></progress>
          </div>
        </div>
        <div class="flex flex-row justify-between flex-wrap">
          <div class="w-full md:w-1/2 p-5 md:pl-5 md:pr-2">
            <div class="tertiary alert">
              <div class="flex flex-row justify-between">
                <div>
                  <p class="caption body-md bold white-text">Publicaciones seleccionadas ({{selectedIdList.length}})</p>
                  <p class="white-text">Seleccionadas</p>
                </div>
                <div>
                  <w-icon icon="pen-edit" h="32px"></w-icon>
                  <p class="white-text">Editar</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-5 md:pr-5 md:pl-2">
            <div class="primary alert" style="cursor: pointer" @click="openManalFrom">
              <p class="caption body-md bold white-text">Ingreso Manual ({{manualOffers.length}})</p>
              <p class="white-text">Insertar datos para el cálculo</p>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-around md:ml-5">
          <div class="md:w-4/12 lg:w-3/12 hidden md:block pt-5">
            <div>
              <w-card :shadow="true">
                <template slot="header">
                  <p class="caption bold white-text">FILTROS</p>
                </template>

                <FiltroPublicacion :panels="panels" @onChange="handleChangedFilter" :disabled="step === 3"></FiltroPublicacion>
              </w-card>
            </div>
          </div>

          <div class="w-full md:w-8/12 lg:w-9/12 px-6">
            <w-btn
              class="md:hidden"
              :dark="true"
              color="secondary"
              @click="showFilters = true"
            >filtrar</w-btn>
            <div class="flex flex-row justify-between flex-wrap">
              <div
                class="sm:w-full md:w-2/4 lg:w-1/3 pt-5 md:pl-3"
                v-for="(card, i) in publications"
                :key="i"
              >
                <w-card
                  :image="card.image"
                  :value="selectedIdList.includes(card.IdPubCabecera)"
                  @change="handleClickCard(card.IdPubCabecera)"
                  style="cursor: pointer;"
                >
                  <template slot="image">
                    <p class="bold">{{ card.direccion }}</p>
                    <br />
                    <p>{{ card.descripcion }}</p>
                  </template>
                  <template slot="state">
                    <p class="white-text">{{ card.tipo }}</p>
                  </template>
                  <template slot="default">
                    <p class="bold">{{ card.title }}</p>
                    <p>{{ card.body }}</p>
                    <div class="flex flex-row justify-between">
                      <p class="body bold tertiary-text">{{ card.mes }}</p>
                    </div>
                  </template>
                  <w-btn
                      :fullwidth="true"
                      :dark="true"
                      :rounded="true"
                      @click="goToDetail(card.IdPubCabecera)"
                  >ir al detalle</w-btn>
                </w-card>
                
              </div>
            </div>
            <br />
          </div>
        </div>
     
      </w-card>
      <br />

      <div class="modal" v-show="showManualModal" style="z-index: 99">
            <div class="modal-wrapper">
                <div class="modal-container" style="padding-top: 30px">
                    <content select=".modal-header">
                        <div class="modal-header">
                            <p style="font-size: 22px; font-weight: bold">Agregar oferta pública manual</p>
                        </div>
                    </content>
                    <div class="modal-body">
                        <form onSubmit="event.preventDefault()" style="margin-top: 30px">
                            <w-input
                                label="Dirección:"
                                placeholder=""
                                v-model="manualForm.address"
                                :err="manualError.address"
                            ></w-input>
                            <w-input
                                label="Precio:"
                                type="number"
                                placeholder=""
                                v-model="manualForm.price"
                                :err="manualError.price"
                            ></w-input>
                            <w-input
                                label="Area total:"
                                type="number"
                                placeholder=""
                                v-model="manualForm.totalarea"
                                :err="manualError.totalarea"
                            ></w-input>
                            <w-input
                                label="Area construida:"
                                type="number"
                                placeholder=""
                                v-model="manualForm.coverarea"
                                :err="manualError.coverarea"
                            ></w-input>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <w-btn
                            rounded
                            :dark="true"
                            color="tertiary"
                            @click="addManualProperty"
                        >Seguir Agregando</w-btn>
                        <w-btn
                            rounded
                            :dark="true"
                            color="primary"
                            @click="showManualModal = false"
                        >Cerrar</w-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <overlay-page-loader :loading="pageLoading"/>
  </div>
</template>

<script>
// import FiltroInmueble from "../../components/inmuebles/FiltroInmueble";
import FiltroPublicacion from "../../components/publicaciones/FiltroPublicacion";
import { GetPublications } from "@/common/amc_apis";
import { GetGeneralOptions, GetCurrency } from "@/common/home_apis";
import { SERVER_URL } from "@/common/config";
import { CheckUserSubscription } from "@/common/subscription_apis";
import { currencySymbolByString, notify } from "@/common/helpers";

export default {
  data() {
    return {
      pageLoading: true,
      step: 2,
      showFilters: false,
      windowWidth: window.innerWidth,
      showManualModal: false,
      defaultOptions: null,
      publications: [],
      selectedIdList: [],
      manualOffers: [],
      manualForm: {},
      manualError: {},
      showDetail: false,
      isLoaded: false,
      curreny: null,
      selectedCur: 'Soles',
      cards: [
        {
          tipo: "Alquiler",
          image: "/images/departamentos/1.jpg",
          title: "958 Calle Montreal",
          body: "Av.montreal",
          comision: "5%",
          mes: "S/ 86,723",
          direccion: "BUILT-UP-65 SQ FT LAND SIZE-110 SQ FT",
          selected: true,
          descripcion:
            " Casa frente a un grande parque con juegos para niños, lugares para hacer ejercicios y otros.",
          info: {
            habitaciones: 3,
            baños: 2,
            estacionamiento: 2,
            totalarea: "120m"
          }
        }
      ],
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
    };
  },

  components: {
    FiltroPublicacion
  },

  watch: {
      'manualForm.totalarea': function(){
          this.manualError.totalarea = null;
      },
      'manualForm.coverarea': function(){
          this.manualError.coverarea = null;
      },
      'manualForm.address': function(){
          this.manualError.address = null;
      },
      'manualForm.price': function(){
          this.manualError.price = null;
      },
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
    }
  },
  created() {
    CheckUserSubscription();
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
    this.loadSelectCurreny();
    GetGeneralOptions().then(res => {
      if(res && res.data) this.initFilterOptions(res.data);
      GetCurrency().then(resp => {
        if(resp) this.curreny = resp.data;
        this.filterPublications();
      })
    }).catch(err => {
        console.log(err);
    });
  },

  methods: {
    loadSelectCurreny(){
      let _config = localStorage.getItem('AMC_CONFIG');
      if(!_config) return;

      _config = JSON.parse(_config);
      this.selectedCur = _config.moneda;
    },
    initPublications(data){
      if(!data || !data.length){
        this.publications = [];
        return;
      }

      let _pub = [];
      data.map(p => {
        let _curSymbol = currencySymbolByString(this.selectedCur);
        let _operacion = this.defaultOptions.operation_types.find(o => o.IdTipoOperacion === p.IdTipoOperacion);

        let _ubicacion = this.defaultOptions.locations.find(a => a.IdUbigeo === p.IdUbigeo);
        let _addr = '';
        if(_ubicacion) _addr = _ubicacion.Distrito + ( p.Des_Urbanizacion ? ', ' + p.Des_Urbanizacion : '');

        let _tipoInmueble = this.defaultOptions.inmueble_types.find(t => t.IdTipoInmueble == p.IdTipoInmueble);
        let _moneda = this.defaultOptions.moneda_types.find(m => m.IdTipoMoneda == p.IdTipoMoneda);
        _moneda = _moneda ? _moneda.Descripcion : '';

        let _comision = this.defaultOptions.comision_types.find(c => c.IdTipoComision === p.IdTipoComision);
        if(_comision){
          if(_comision.Descripcion === "Monto") _comision = _curSymbol + this.convertCurrency(_moneda, parseFloat(p.Num_Comision));
          else _comision = parseFloat(p.Num_ComisionCompartir) + '%';
        }else{
          _comision = 0;
        }

        let _price = this.convertCurrency(_moneda, parseFloat(p.Num_Precio));

        _pub.push({
          IdPubCabecera : p.IdPubCabecera,
          tipo: _operacion ? _operacion.Descripcion : null,
          title: p.Des_Titulo,
          body: _addr,
          image: p.images.length ? SERVER_URL + p.images[0].Des_url : '/images/dummy.jpg',
          comision: _comision,
          mes: _curSymbol + '/ ' + _price,
          direccion: '',
          descripcion: '',

          habitaciones: p.Num_Habitaciones ? p.Num_Habitaciones : 0,
          banos: p.Num_Banios ? p.Num_Banios : 0,
          estacionamiento: p.Num_Cochera ? p.Num_Cochera : 0,
          totalarea: parseInt(p.Num_AreaTotal) ? parseInt(p.Num_AreaTotal) : 0,

          techadoarea: parseInt(p.Num_AreaTechado) ? parseInt(p.Num_AreaTechado) : 0,
          tipoInmueble: _tipoInmueble ? _tipoInmueble.Descripcion : '',
          distrito: _ubicacion ? _ubicacion.Distrito : '',
          price: _price,
          moneda:  _moneda
        });
      })

      this.publications = _pub;
      if(this.isLoaded) this.isLoaded = false;
      else this.selectedIdList = [];
    },
    initFilterOptions(options){
      this.defaultOptions = options;

      let saved_state = localStorage.getItem('AMC_TMP');
      if(saved_state){
        localStorage.removeItem('AMC_TMP');

        try{
            saved_state = JSON.parse(saved_state);

            this.step = saved_state.step;
            this.selectedIdList = saved_state.s;
            this.manualOffers = saved_state.m;
            this.panels = saved_state.p;
            this.isLoaded = true;
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
        selectOption: null
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
        selectOption: null
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
        selectOption: null
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
      this.filterPublications();
    },

    handleClickCard(pubId){
      if(this.showDetail) return;

      if(this.selectedIdList.includes(pubId)) {
        notify('warn', null, 'Propiedad fue eliminada');
        this.selectedIdList.splice(this.selectedIdList.indexOf(pubId), 1);
      } else {
        notify('success', null, 'Propiedad fue agregada');
        this.selectedIdList.push(pubId);
      }
    },
    
    getReqParams(){
      let reqParams = {};

      if(this.panels[0].selectOption){
        let location = this.defaultOptions.locations.find(l => l.FullText === this.panels[0].selectOption);
        reqParams['IdUbigeo']=location && location.IdUbigeo;
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

      if(this.step === 3) reqParams['sold'] = true;
      return reqParams;
    },

    filterPublications(){
      this.pageLoading = true;
      let reqParams = this.getReqParams();      
      
      GetPublications(reqParams).then(res => {
          if(res && res.data){
              this.initPublications(res.data.publications);
              this.total = res.data.total;
          }
          this.pageLoading = false;
      }).catch(err => {
          console.log('publications...', err);
          this.pageLoading = false;
      });
    },

    addManualProperty(){
      let isError = false;
      if(!this.manualForm.totalarea) {
        this.manualError.totalarea = 'Esto es requerido';
        isError = true;
      }
      if(!this.manualForm.coverarea) {
        this.manualError.coverarea = 'Esto es requerido';
        isError = true;
      }
      if(!this.manualForm.address) {
        this.manualError.address = 'Esto es requerido';
        isError = true;
      }
      if(!this.manualForm.price) {
        this.manualError.price = 'Esto es requerido';
        isError = true;
      }

      if(isError) return;

      this.manualOffers.push(this.manualForm);
      notify('success', null, 'Propiedad fue agregada');

      this.manualForm = {
        totalarea: null,
        coverarea: null,
        address: null,
        price: null
      };
      this.manualError = {
        totalarea: null,
        coverarea: null,
        address: null,
        price: null
      };
      // this.showManualModal = false;
    },
    openManalFrom(){
      this.manualForm = {
        totalarea: null,
        coverarea: null,
        address: null,
        price: null
      };
      this.manualError = {
        totalarea: null,
        coverarea: null,
        address: null,
        price: null
      };
      this.showManualModal = true;
    },
    nextStep(){
      this.saveCurrentState();

      if(this.step == 2){
        window.scrollTo(0, 0);
        this.step = 3;
        this.filterPublications();
      }else{
        this.$router.push('/amc/3');
      }
    },
    saveCurrentState(){
      let _selected = [];
      this.publications.forEach(p => {
        if(this.selectedIdList.includes(p.IdPubCabecera))
          _selected.push({
            address: p.distrito,
            price: p.price,
            totalarea: p.totalarea,
            coverarea: p.techadoarea
          });
      });

      _selected = [..._selected, ...this.manualOffers];

      if(this.step === 2) localStorage.setItem('AMC_2', JSON.stringify(_selected));
      else localStorage.setItem('AMC_3', JSON.stringify(_selected));

      this.selectedIdList = [];
      this.manualOffers = [];
      this.publications = [];
    },
    goToDetail(id){
      this.showDetail = true;
      let save_data = {
        step: this.step,
        s: this.selectedIdList,
        m: this.manualOffers,
        p: this.panels
      }
      localStorage.setItem('AMC_TMP', JSON.stringify(save_data));
      this.$router.push('/amc/detallepublicacion/' + id);
    },
    convertCurrency(cur, value){
      if(!cur || this.selectedCur == cur || !this.curreny) return value;
      
      let to = parseFloat(this.curreny[this.selectedCur]);
      let from = parseFloat(this.curreny[cur]);

      if(!from || !to) return value;
      let _value = value*to/from;

      return parseFloat(_value.toFixed(3));
    },
  }
};

</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.amc-2 {
  .amc-container {
    width: 96%;
    max-width: 1250px;
    margin: auto;
    .step-btn {
      padding: 5px 25px;
      margin: 20px 18px;
      background-color: $primary !important;
    }

    .amc-progress {
      width: inherit;
      margin: 20px 0px;
      &[value] {
        &::-webkit-progress-bar {
          background-color: #aaaaaa;
          border-radius: 15px;
        }
        &::-webkit-progress-value {
          background-color: #ff7500;
          border-radius: 15px;
        }
      }
    }

    .alert {
      border-radius: 8px;
      padding: 18px 36px;
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
  }
}
</style>
