<template>
  <!--

        listado-de-publicacion (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/2deb2d30-7c24-47ac-abd0-9ccb7e8b36a0/listado-de-publicacion)
        listado-de-publicacion-1 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/78933429-40cb-4660-9cd7-d39369f157a6/listado-de-publicacion-1)
        listado-de-publicacion-2 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/9c805ad2-bc8b-473c-8bc7-760f59becdeb/listado-de-publicacion-2)
        listado-de-publicacion-3 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/5c65027e-2c50-473b-90a2-9703b73fb9be/listado-de-publicacion-3)
        MB-listado-de-publicacion (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/82301175-3fef-44c3-8991-844d69c18bf7/MB-listado-de-publicacion)


  -->

  <div>
    <div class="publicaciones-container">
      <div class="flex flex-row justify-around">
        <div class="md:w-4/10 lg:w-3/12 hidden md:block">
          <div>
            <w-card :shadow="false">
              <template slot="header">
                <p class="caption bold white-text">ORDENAR POR</p>
              </template>

              <FiltroPublicacion :panels="panels" @onChange="handleChangedFilter"></FiltroPublicacion>
<!-- 
              <w-btn
                v-if="isManager"
                :large="true"
                :dark="true"
                :fullwidth="true"
                color="secondary"
                @click="$router.push('publicaciones/nueva')"
              >nueva publicación</w-btn> -->
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
        <div class="w-full md:w-6/10 lg:w-9/12 px-6" v-else>
          <w-card :shadow="false">

            <div class="flex flex-row justify-between flex-wrap ml-3">
              <div class="lg:pl-3">
                <h1 class="subtitle bold">Listado de Inmuebles</h1>
              </div>
              <div class="lg:pr-3" >
                <w-btn
                  color="tertiary"
                  :dark="true"
                  style=" margin: 0px !important; display: flex; background-color: rgb(255, 117, 0);"
                   @click="$router.push('publicaciones/nueva')"
                >
                     
                  Agregar Publicación
                    <w-icon icon="lock-white" style="margin: -6px 0px 0px 16px; color:#fff;  "  h="26px"></w-icon>
                </w-btn>
              </div>
            </div>

            <br />


            <div class="flex flex-row justify-between flex-wrap">
              <div class="sm:w-full md:w-2/4 lg:w-1/3 p-3" v-for="(pub, i) in publications" :key="i" >
                <w-card
                  :image="pub.image_url"
                  imageHeight="200px"
                  v-model="pub.showForm"
                  :activeContent="true"
                  :pointer="true"
                >
                  <template slot="header" v-if="!pub.showForm">
                    <div class="flex flex-row justify-between">
                      <div class="info-item">
                        <div v-if="pub.state =='Publicado'" class="dot success"></div>
                        <div v-else-if="pub.state == 'Borrador'" class="dot tertiary"></div>
                        <div v-else-if="pub.state == 'Vendido/Alquilado'" class="dot secondary"></div>
                        <div v-else class="dot tertiary"></div>
                        <p class="white-text">{{ pub.state }}</p>
                      </div>
                      <div v-if="isManager && !pub.disabledForm">
                        <w-btn :icon="true" @click="gotoEditPage(pub.IdPubCabecera)">
                          <w-icon icon="edit-white" h="13px"></w-icon>
                        </w-btn>
                        <w-btn :icon="true" @click="pub.showForm = true; initPublicactionForm(i);">
                          <w-icon icon="trash-white" h="13px"></w-icon>
                        </w-btn>
                      </div>
                    </div>
                  </template>
                  <div v-if="pub.showForm">
                    <p class="body bold white-text">Opciones Publicaciones</p>
                    <br />
                    <form style="min-height: 200px">
                        <w-select placeholder="Elegir Motivo" :options="publicacionStates"
                          v-model="pub.form.motivo"
                          :dark="true"
                          :tile="true"
                          color="secondary"
                          :open="openedSelct == pub.IdPubCabecera + 'state'"
                          @onOpen="openSelectEl(pub.IdPubCabecera, 'state')"
                        ></w-select>
                        <div v-if="pub.form.motivo == 'Vendido/Alquilado'">
                          <w-filterselect placeholder="Buscar Asesor" :options="personas"
                            :dark="true"
                            :tile="true"
                            v-model="pub.form.asesor"
                            :open="openedSelct == pub.IdPubCabecera + 'user'"
                            @onOpen="openSelectEl(pub.IdPubCabecera, 'user')"
                            color="secondary"/>
                        </div>
                        <div v-if="pub.form.motivo == 'Vendido/Alquilado'">
                          <w-select placeholder="Elegir Moneda" :options="monedatList"
                            v-model="pub.form.moneda"
                            :dark="true"
                            :tile="true"
                            color="secondary"
                            :open="openedSelct == pub.IdPubCabecera + 'moneda'"
                            @onOpen="openSelectEl(pub.IdPubCabecera, 'moneda')"
                          ></w-select>
                        </div>
                        
                        <w-input
                          label="Monto de Venta"
                          type="Number"
                          :tile="true"
                          color="secondary"
                          v-model="pub.form.venta"
                          :dark="true"
                        ></w-input>
                      <!-- </div> -->
                    </form>
                    <w-btn :fullwidth="true" :dark="true" @click="handleChangeDetail(i)">guardar</w-btn>
                    <!-- <w-btn v-if="pub.disabledForm" :fullwidth="true" :dark="true" @click="pub.showForm = false;">cerca</w-btn>
                    <w-btn v-else :fullwidth="true" :dark="true" @click="handleChangeDetail(i)">guardar</w-btn> -->
                  </div>
                  <div v-else @click="gotoDetailPage(pub.IdPubCabecera)">
                    <p class="caption bold tertiary-text">{{ pub.Des_Titulo }}</p>
                    <br />
                    <p>{{ pub.address }}</p>
                    <p>Area Total: {{ pub.areaTotal }}</p>
                    <p>{{ pub.Habitaciones }} Habitaciones, {{ pub.Cochera }} Cochera</p>
                    <br/>
                    <div class="flex justify-between">
                      Comisión
                    </div>
                    <div class="flex justify-between">
                      <p>{{ pub.Comision }}</p>
                      <p v-if="pub.Consultar">Consultar Precio</p>
                      <p v-else>{{ pub.Precio }}</p>
                    </div>
                    <div v-if="pub.boton">
                      <w-btn
                        :fullwidth="true"
                        :small="true"
                        color="primary"
                        :dark="true"
                      >{{ pub.boton }}</w-btn>
                    </div>
                  </div>
                </w-card>
              </div>
            </div>

            <!-- <div class="flex flex-row justify-between flex-wrap">
              <div class="sm:w-full md:w-2/4 lg:w-1/3 p-3" v-for="(card, i) in cards" :key="i">
                <w-card
                  :image="card.foto"
                  imageHeight="200px"
                  v-model="card.showForm"
                  :activeContent="true"
                  :pointer="true"
                >
                  <template slot="header" v-if="!card.showForm">
                    <div class="flex flex-row justify-between">
                      <div class="info-item">
                        <div v-if="card.state =='Publicado'" class="dot success"></div>
                        <div v-if="card.state == 'Borrador'" class="dot tertiary"></div>
                        <div v-if="card.state == 'Vendido'" class="dot secondary"></div>
                        <p class="white-text">{{ card.state }}</p>
                      </div>
                      <div>
                        <w-btn :icon="true">
                          <w-icon icon="edit-white" h="13px"></w-icon>
                        </w-btn>
                        <w-btn :icon="true" @click="card.showForm = true">
                          <w-icon icon="trash-white" h="13px"></w-icon>
                        </w-btn>
                      </div>
                    </div>
                  </template>
                  <div v-if="card.showForm">
                    <p class="body bold white-text">Dar de Baja</p>
                    <br />
                    <form>
                      <w-select placeholder="Elegir Motivo" :options="['porque si','se me ocurrio','asi nomas',]"
                        v-model="card.form.motivo"
                        :dark="true"
                        :tile="true"
                        color="secondary"
                      ></w-select>
                      <w-input
                        label="Buscar Asesor"
                        :tile="true"
                        color="secondary"
                        v-model="card.form.asesor"
                        :dark="true"
                      ></w-input>
                      <w-input
                        label="Elegir Moneda"
                        :tile="true"
                        color="secondary"
                        v-model="card.form.moneda"
                        :dark="true"
                      ></w-input>
                      <w-input
                        label="Monto de Venta"
                        :tile="true"
                        color="secondary"
                        v-model="card.form.venta"
                        :dark="true"
                      ></w-input>
                    </form>
                    <w-btn :fullwidth="true" :dark="true" @click="card.showForm = false">guardar</w-btn>
                  </div>
                  <div v-else>
                    <p class="caption bold tertiary-text">{{ card.title }}</p>
                    <br />
                    <p>{{ card.body }}</p>

                    <div v-if="card.boton">
                      <w-btn
                        :fullwidth="true"
                        :small="true"
                        color="primary"
                        :dark="true"
                      >{{ card.boton }}</w-btn>
                    </div>
                  </div>
                </w-card>
              </div>
            </div> -->
            <br />
            <div v-if="publications && publications.length" class="flex justify-center lg:justify-end">
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
import FiltroPublicacion from "../../components/publicaciones/FiltroPublicacion";
import { GetPublications, GetPublicationsByBroker, UpdatePublicacionDetail } from "@/common/publication_apis";
import { GetPersonalNames } from "@/common/persona_apis";
import { GetGeneralOptions } from "@/common/home_apis";
import { SERVER_URL } from "@/common/config";
import { currencySymbol, notify } from "@/common/helpers";

export default {
  data() {
    return {
      pageLoading: true,
      openedSelct: '',
      isManager: false,
      page: 1,
      showFilters: false,
      windowWidth: window.innerWidth,
      publications: [],
      total: 0,
      countPerPage: 9,
      defaultOptions: null,
      cards: [
        {
          showForm: false,
          state: "Publicado",
          foto: "/images/departamentos/1.jpg",
          title: "850 Pennsylvania",
          body: "Philiadelphia, Cherry Hill, DC205500 Modificación: 2020/09/05",
          form: {}
        },
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
          name: "PUBLICACIONES",
          options: [],
          toggle: true,
          selectOption: null
        },
        // {
        //   state: false,
        //   name: "Tipo de inmueble",
        //   options: [],
        //   toggle: true,
        //   selectOption: null
        // },
        // {
        //   state: false,
        //   name: "Fecha de Publicación",
        //   type: null,
        //   toggle: true,
        //   options: ["Desde Ayer", "Hoy", "Última Semana", "Últimos 15 Días", "Últimos 30 Días", "Últimos 45 Días"],
        //   selectOption: null
        // },
        // {
        //   state: false,
        //   name: "Dormitorios",
        //   type: "row",
        //   options: ["1", "2", "3", "4", ">5"],
        //   selectOption: null
        // },
        // {
        //   state: false,
        //   name: "Baños",
        //   type: "row",
        //   options: ["1", "2", "3", "4", ">5"],
        //   selectOption: null
        // },
        // {
        //   state: false,
        //   name: "Estacionamientos",
        //   type: "row",
        //   options: ["1", "2", "3", "4", ">5"],
        //   selectOption: null
        // },
        // {
        //   state: false,
        //   name: "Superficie",
        //   type: "selection-range",
        //   toggle: true,
        //   options: ["Techada", "Total"],
        //   selectOption: null,
        //   range: []
        // },
        // {
        //   state: false,
        //   name: "Precio",
        //   type: "selection-range",
        //   toggle: true,
        //   options: ["Soles", "Dolares", "Euros"],
        //   selectOption: null,
        //   range: []
        // }
      ]
    };
  },

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

    publicacionStates(){
      if(!this.defaultOptions || !this.defaultOptions.pub_states) return [];
      let _states = [];
      this.defaultOptions.pub_states.map(s => {
        _states.push(s.Descripcion);
      });

      return _states;
    },

    monedatList(){
      if(!this.defaultOptions || !this.defaultOptions.moneda_types) return [];
      let _monedas = [];
      this.defaultOptions.moneda_types.map(m => {
        _monedas.push(m.Descripcion);
      });

      return _monedas;
    },

    personas(){
      if(!this.personalNames || !this.personalNames.length) return [];
      let _personas = [];
      this.personalNames.map(p => {
        _personas.push(p.Des_NombreCompleto);
      });

      return _personas;
    }
  },
  watch: {
      page: function(curPage){
        this.navigate();
      },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });

    let user = this.$store.getters.user;
    if( user && (user.type == "1" || user.type == "2")) this.isManager = true;

    GetGeneralOptions().then(res => {
      if(res && res.data) this.initFilterOptions(res.data);
      this.navigate();
    }).catch(err => {
        console.log(err);
    });
    if(this.isManager){
      GetPersonalNames().then(res => {
        if(res && res.data) this.personalNames = res.data;
      });
    }
  },
  methods: {
    initPublications(data){
      if(!data || !data.length){
        this.publications = [];
        return;
      }

      let _pub = [];
      data.map(p => {
        let _curSymbol = currencySymbol(p.IdTipoMoneda);
        let _addr = this.defaultOptions.locations.find(a => a.IdUbigeo === p.IdUbigeo);
        if(_addr) _addr = _addr.Distrito + ( p.Des_Urbanizacion ? ', ' + p.Des_Urbanizacion : '');
        else _addr = '';

        let _comision = this.defaultOptions.comision_types.find(c => c.IdTipoComision === p.IdTipoComision);
        if(_comision){
          if(_comision.Descripcion === "Monto") _comision = _curSymbol + parseFloat(p.Num_Comision);
          else _comision = parseFloat(p.Num_Comision) + '%';
        }else{
          _comision = 0;
        }

        let _state = this.defaultOptions.pub_states.find(s => s.Id_EstadoPublicacion === p.Id_EstadoPublicacion);
        _state = _state.Descripcion;

        
        _pub.push({
          IdPubCabecera : p.IdPubCabecera,
          state: _state,
          FechaCreacion: p.FechaCreacion,
          Des_Titulo: p.Des_Titulo,
          IdUbigeo: p.IdUbigeo,
          Des_Urbanizacion: p.Des_Urbanizacion,
          address:_addr,
          areaTotal: p.Num_AreaTotal + 'M2',
          Habitaciones: p.Num_Habitaciones ? p.Num_Habitaciones : 0,
          Cochera: p.Num_Cochera ? p.Num_Cochera : 0,
          Comision: _comision,
          Precio: _curSymbol + '/ ' + parseFloat(p.Num_Precio ? p.Num_Precio : 0),
          Consultar: p.Flg_Consultar,
          image_url: p.images.length ? SERVER_URL + p.images[0].Des_url : 'images/dummy.jpg',
          showForm: false,
          form: {},
          detail: {
            Id_EstadoPublicacion: p.Id_EstadoPublicacion,
            IdUsuarioCompartido: p.IdUsuarioCompartido,
            IdTipoMoneda: p.Detail_Moneda,
            NumPrecioVenta: p.NumPrecioVenta
          },
          disabledForm: (_state === "Vendido/Alquilado" ||  _state === "Cancelada") ? true : false
        });
      })

      this.publications = _pub;
    },

    initFilterOptions(options){
      this.defaultOptions = options;
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

      let states = options.pub_states;
      let stateList = [];
      states.map(o => { stateList.push(o.Descripcion); });
      _panels.push({
        state: false,
        name: "PUBLICACIONES",
        type: null,
        toggle: true,
        options: stateList,
        selectOption: null
      });

      // let inmuebles = options.inmueble_types;
      // let inmuebleList = [];
      // inmuebles.map(i => { inmuebleList.push(i.Descripcion); });
      // _panels.push({
      //   state: false,
      //   name: "Tipo de inmueble",
      //   type: null,
      //   toggle: true,
      //   options: inmuebleList,
      //   selectOption: null
      // });

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

      if(this.panels[0].selectOption){
        let location = this.defaultOptions.locations.find(l => l.FullText === this.panels[0].selectOption);
        reqParams['IdUbigeo']=location.IdUbigeo;
      }
      
      if(this.panels[1].selectOption){
        let state = this.defaultOptions.pub_states.find(o => o.Descripcion === this.panels[1].selectOption);
        reqParams['Id_EstadoPublicacion']=state.Id_EstadoPublicacion;
      }

      // if(this.panels[2].selectOption){
      //   let inmueble = this.defaultOptions.inmueble_types.find(i => i.Descripcion === this.panels[2].selectOption);
      //   reqParams['IdTipoInmueble']=inmueble.IdTipoInmueble;
      // }

      // if(this.panels[3].selectOption){
      //   let ago = 'today';
      //   if(this.panels[3].selectOption === 'Desde Ayer') ago = '-1 day';
      //   else if(this.panels[3].selectOption === 'Última Semana') ago = '-1 week';
      //   else if(this.panels[3].selectOption === 'Últimos 15 Días') ago = '-15 days';
      //   else if(this.panels[3].selectOption === 'Últimos 30 Días') ago = '-30 days';
      //   else if(this.panels[3].selectOption === 'Últimos 45 Días') ago = '-45 days';
      //   reqParams['FechaCreacion'] = ago;
      // }

      // if(this.panels[4].selectOption){
      //   let _num = Number(this.panels[4].selectOption);
      //   reqParams['Num_Habitaciones']=_num ? _num : 5;
      // }

      // if(this.panels[5].selectOption){
      //   let _num = Number(this.panels[5].selectOption);
      //   reqParams['Num_Banios']=_num ? _num : 5;
      // }

      // if(this.panels[6].selectOption){
      //   let _num = Number(this.panels[6].selectOption);
      //   reqParams['Num_Cochera']=_num ? _num : 5;
      // }

      // if(this.panels[7].selectOption){
      //   let superficie = this.panels[7].selectOption;
      //   if(superficie.option === 'Total')
      //     reqParams['Num_AreaTotal'] = [Number(superficie.from), Number(superficie.to)];
      //   else
      //     reqParams['Num_AreaTechado'] = [Number(superficie.from), Number(superficie.to)];
      // }

      // if(this.panels[8].selectOption){
      //   let price = this.panels[8].selectOption;
      //   let findMoneda = this.defaultOptions.moneda_types.find(m => m.Descripcion === price.option);
      //   reqParams['IdTipoMoneda'] = findMoneda.IdTipoMoneda;
      //   reqParams['Num_Precio'] = [Number(price.from), Number(price.to)];
      // }

      return reqParams;
    },

    gotoEditPage(id){
      if(!this.isManager) return;
      this.$router.push('/publicaciones/editar/' + id);
    },
    gotoDetailPage(id){
      if(!this.isManager) return;
      this.$router.push('/publicaciones/detalle/' + id);
    },

    navigate(){
      this.pageLoading = true;
      let reqParams = this.getReqParams();      
      let PublicationAPI = this.isManager ? GetPublications : GetPublicationsByBroker;
      
      PublicationAPI(reqParams).then(res => {
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

    handleChangeDetail(index){
      let _formData = this.publications[index].form;
      let data = {IdPubCabecera: this.publications[index].IdPubCabecera};

      if(_formData.motivo){
        let _state = this.defaultOptions.pub_states.find(p => p.Descripcion === _formData.motivo);
        data['Id_EstadoPublicacion'] = _state ? _state.Id_EstadoPublicacion : null;
      }else data['Id_EstadoPublicacion'] = null;

      if(_formData.asesor){
        let _user = this.personalNames.find(p => p.Des_NombreCompleto === _formData.asesor);
        data['IdUsuarioCompartido'] = _user ? _user.IdUsuario : null;
      }else data['IdUsuarioCompartido'] = null;

      if(_formData.moneda){
        let _moneda = this.defaultOptions.moneda_types.find(p => p.Descripcion === _formData.moneda);
        data['IdTipoMoneda'] = _moneda ? _moneda.IdTipoMoneda : null;
      }else data['IdTipoMoneda'] = null;

      if(_formData.venta) data['NumPrecioVenta'] = _formData.venta;
      else data['NumPrecioVenta'] = 0;

      UpdatePublicacionDetail(data).then(res => {
        if(res && res.data){
          this.navigate();
          notify('success', null, 'Publicación actualizada con éxito');
        }
      }).catch(err => {
        notify('error', null, 'Actualización de publicación fallida');
      })
    },
    initPublicactionForm(index){
      let pub = this.publications[index];
      let detail = pub.detail;
      let _form = {};
      
      let _state = this.defaultOptions.pub_states.find(p => p.Id_EstadoPublicacion === detail.Id_EstadoPublicacion);
      let _user = this.personalNames.find(p => detail.IdUsuarioCompartido && p.IdUsuario.trim() == detail.IdUsuarioCompartido.trim());
      let _moneda = this.defaultOptions.moneda_types.find(p => p.IdTipoMoneda === detail.IdTipoMoneda);
      let _price = parseFloat(detail.NumPrecioVenta);
      
      if(_state) _form['motivo'] = _state.Descripcion;
      if(_user) _form['asesor'] = _user.Des_NombreCompleto;
      if(_moneda) _form['moneda'] = _moneda.Descripcion;
      if(_price) _form['venta'] = _price;

      this.publications[index].form = _form;
    },

    openSelectEl(id, el){
      this.openedSelct = id+el;
    }
  },

};
</script>

<style lang="scss" scoped>
.publicaciones-container {
  width: 95%;
  margin: auto;
}

@media (max-width: 764px) {
  .publicaciones-container {
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
