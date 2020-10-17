<template>
    <!--

        agregar-registrar-publicacion (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/edaef1db-8cea-4963-8887-edecec3db37f/agregar-registrar-publicacion-/)
        MB-agregar-registrar-publicacion (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/039be02f-d3fc-497a-ab2d-d2f19a9dd66b/MB-agregar-registrar-publicacion-/)

    -->

    <div class="nueva-publicacion">
        <div class="container-nueva-publicacion">
            <div class="responsive-nueva-publicacion">
                <w-card class="card-nueva-publicacion" :shadow="false">
                    <p class="subtitle bold mt-5 ml-5">Agregar Publicación</p>
                    <p class="ml-5">Agregar la información de la nueva publicación</p>

                    <!-- <div class="lg:w-2/3 primary rounded-bl-full rounded-r-full lg:ml-5 mt-6 p-4">
                        <p
                            class="caption white-text truncate"
                        >Configuración flexible y formas de edición, agregue y edite información de listado, fotos y ubicación de la posición</p>
                    </div> -->

                    <form @submit.prevent>
                        <div class="form-section">
                            <div
                                class="form-header"
                                :class="sections.inmueble ? 'header-active' : ''"
                                @click="
                                windowWidth <= 768
                                    ? (sections.inmueble = !sections.inmueble)
                                    : ''
                            "
                            >
                                <p>Tipo de Inmueble</p>
                                <w-icon icon="arrow-down" h="18px"></w-icon>
                            </div>
                            <div class="form-body" v-if="sections.inmueble">
                                <div class="flex flex-row flex-wrap">
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-select
                                            label="TIPO DE OPERACIÓN"
                                            placeholder="Pendientes"
                                            :options="operationOptions"
                                            v-model="tmpdata.tipooperacion"
                                        ></w-select>
                                    </div>
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-select
                                            label="TIPO DE INMUEBLE"
                                            placeholder="Pendientes"
                                            :options="inmuebleOptions"
                                            v-model="tmpdata.tipoinmueble"
                                        ></w-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-section">
                            <div
                                class="form-header"
                                :class="sections.ubicacion ? 'header-active' : ''"
                                @click="
                                windowWidth <= 768
                                    ? (sections.ubicacion = !sections.ubicacion)
                                    : ''
                            "
                            >
                                <p>Ubicación</p>
                                <w-icon icon="arrow-down" h="18px"></w-icon>
                            </div>
                            <div class="form-body" v-if="sections.ubicacion">
                                <div class="flex flex-row flex-wrap">
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-select
                                            label="Departamento"
                                            placeholder="Elegir departamento..."
                                            :options="departments"
                                            v-model="tmpdata.departamento"
                                        >
                                            <template slot="snackbar">
                                                <p class="bold">Importante!</p>
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                            </template>
                                        </w-select>
                                    </div>
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-select
                                            label="PROVINCIA"
                                            placeholder="Elegir provincias..."
                                            :options="provinces"
                                            v-model="tmpdata.provincias"
                                        >
                                            <template slot="snackbar">
                                                <p class="bold">Importante!</p>
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                            </template>
                                        </w-select>
                                    </div>
                                </div>
                                <div class="flex flex-row flex-wrap">
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-select
                                            label="DISTRITO"
                                            placeholder="Elegir distrito..."
                                            :options="districts"
                                            v-model="tmpdata.distrito"
                                        >
                                            <template slot="snackbar">
                                                <p class="bold">Importante!</p>
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                            </template>
                                        </w-select>
                                    </div>
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-input
                                            label="URBANIZACIÓN/SECTOR"
                                            placeholder="Entrar urbanización..."
                                            v-model="form.Des_Urbanizacion"
                                        >
                                            <template slot="snackbar">
                                                <p class="bold">Importante!</p>
                                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuadas.</p>
                                            </template>
                                        </w-input>
                                    </div>
                                </div>
                                <div class="flex flex-row flex-wrap">
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-input
                                            label="AVENIDA/CALLE"
                                            placeholder="Entrar avenida/calle..."
                                            v-model="form.Des_AvenidaCalle"
                                        >
                                        </w-input>
                                    </div>
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-input
                                            label="NUMERO"
                                            type="number"
                                            placeholder="Entrar numero..."
                                            v-model="form.Des_Numero"
                                        >
                                        </w-input>
                                    </div>
                                </div>

                                <div class="w-full md:w-1/3 flex flex-row flex-wrap">
                                    <div class="w-full md:w-1/2">
                                        <w-checkbox
                                            label="Mostrar dirección"
                                            v-model="form.Flg_MostrarDireccion"
                                        ></w-checkbox>
                                    </div>
                                    <!-- <div class="w-full md:w-1/2">
                                        <w-checkbox
                                            label="Ocultar dirección"
                                            v-model="tmpdata.ocultardireccion"
                                        ></w-checkbox>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="form-section">
                            <div
                                class="form-header"
                                :class="sections.precio ? 'header-active' : ''"
                                @click="
                                windowWidth <= 768
                                    ? (sections.precio = !sections.precio)
                                    : ''
                            "
                            >
                                <p>Precio</p>
                                <w-icon icon="arrow-down" h="18px"></w-icon>
                            </div>
                            <div class="form-body" v-if="sections.precio">
                                <div class="flex flex-row flex-wrap">
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-select
                                            label="MONEDA"
                                            placeholder="Dolar americanos"
                                            :options="monedaOptions"
                                            v-model="tmpdata.moneda"
                                        ></w-select>
                                    </div>
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-input
                                            label="PRECIO"
                                            type="number"
                                            placeholder="S/00"
                                            v-model="form.Num_Precio"
                                        >
                                        </w-input>
                                    </div>
                                    <div
                                        class="w-full md:w-1/3 self-center"
                                        style="margin-top: -10px ; "
                                    >
                                        <w-checkbox label="Consultar" v-model="form.Flg_Consultar"></w-checkbox>
                                    </div>
                                </div>
                               <!--  <div>
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-select
                                            label="TIPO COMISIÓN"
                                            placeholder="Dolar americanos"
                                            :options="comisionOptions"
                                            v-model="tmpdata.comision"
                                        ></w-select>
                                    </div>
                                </div>
 -->                                    <input
                                            name = "enviamos"
                                            type="hidden"
                                            v-model="tmpdata.comision"
                                       />

                              <!--    <div style="position: fixed;">
                                    <div class="w-full md:w-1/3 px-2">
                                        <w-select
                                            label="TIPO COMISIÓN"
                                            placeholder="Dolar americanos"
                                            :options="comisionOptions"
                                            v-model="tmpdata.comision"
                                            style="visibility: hidden !important; "
                                        ></w-select>
                                    </div>
                                </div> -->
                                <div class="flex flex-row flex-wrap">
                                    <div class="w-full md:w-1/3 px-2">
                                     <!--    <w-input
                                            :label="cambiar_comision"
                                            type="number"
                                            placeholder="S/00"
                                            v-model="form.Num_Comision"
                                        >
                                        </w-input> -->

                                        <div class="wrapper" style="margin-left: 1em;">
                                      <label class="input-label" >{{cambiar_comision}}</label> <br>
                                      <input type="range" min="0" max="100" step="1" v-model="form.Num_Comision" style="width: 80%;"> 
                                      <input :label="cambiar_comision" type="number" v-model="form.Num_Comision" style="width: 12%; margin-left: 10px;"/><b>%</b>

                                       </div>
                                    </div>
                                    <div class="w-full md:w-1/3 px-2">
                                      <!--   <w-input
                                            :label="cambiar_compartir"
                                            type="number"
                                            placeholder="S/00"
                                            v-model="form.Num_ComisionCompartir"
                                        >
                                        </w-input> -->

                                        <div class="wrapper" style="margin-left: 1em;">
                                      <label class="input-label" >{{cambiar_compartir}}</label> <br>
                                      <input type="range" min="0" max="50" step="1" v-model="form.Num_ComisionCompartir" style="width: 80%;"> 
                                      <input :label="cambiar_compartir" type="number" v-model="form.Num_ComisionCompartir" style="width: 12%; margin-left: 10px;"/><b>%</b>

                                       </div>

                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-section">
                            <div
                                class="form-header"
                                :class="sections.datos ? 'header-active' : ''"
                                @click="
                                windowWidth <= 768
                                    ? (sections.datos = !sections.datos)
                                    : ''
                            "
                            >
                                <p>Datos del inmueble</p>
                                <w-icon icon="arrow-down" h="18px"></w-icon>
                            </div>
                            <div class="form-body" v-if="sections.datos">
                                <div class="flex flex-row flex-wrap">
                                    <div v-for="data in dataProperties" :key="data.id" class="w-full md:w-1/3 px-2">
                                        <w-input
                                            :label="data.name"
                                            type="number"
                                            placeholder="0"
                                            v-model="form[data.slug]"
                                        >
                                        </w-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-section">
                            <div
                                class="form-header"
                                :class="sections.additionals ? 'header-active' : ''"
                                @click="
                                windowWidth <= 768
                                    ? (sections.additionals = !sections.additionals)
                                    : ''
                            "
                            >
                                <p>Caracteristicas Adicionales</p>
                                <w-icon icon="arrow-down" h="18px"></w-icon>
                            </div>
                            <div class="form-body" v-if="sections.additionals">
                                <div class="flex flex-row flex-wrap">
                                    <div v-for="additional in additionalProperties" :key="additional.id" class="w-full md:w-1/3 self-center">
                                        <w-checkbox class="ml-5" :label="additional.name" v-model="form[additional.slug]"></w-checkbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-section">
                            <div
                                class="form-header"
                                :class="sections.servicios ? 'header-active' : ''"
                                @click="
                                windowWidth <= 768
                                    ? (sections.servicios = !sections.servicios)
                                    : ''
                            "
                            >
                                <p>Servicios</p>
                                <w-icon icon="arrow-down" h="18px"></w-icon>
                            </div>
                            <div class="form-body" v-if="sections.servicios">
                                <div class="flex flex-row flex-wrap">
                                    <div v-for="service in serviceProperties" :key="service.id" class="w-full md:w-1/3 self-center">
                                        <w-checkbox class="ml-5" :label="service.name" v-model="form[service.slug]"></w-checkbox>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p class="f-header">Descripción</p>
                            <div class="flex flex-row flex-wrap">
                                <div class="w-full md:w-1/2 px-2">
                                    <w-input
                                        label="TITULO"
                                        placeholder=" "
                                        v-model="form.Des_Titulo"
                                    ></w-input>
                                </div>
                                <div class="w-full md:w-1/2 px-2">
                                    <w-input
                                        label="SUBTITULO"
                                        placeholder=" "
                                        v-model="form.Des_Subtitulo"
                                    ></w-input>
                                </div>
                                <div class="w-full px-2">
                                    <label for="editor" style="color: #000;font-size: 13px;font-weight: bold; margin-left: 20px">DESCRIPCIÓN DE LA PROPIEDAD</label>
                                    <vue-editor id="editor" v-model="form.Des_Subtitulo2" :editorToolbar="toolbarOptions" style="margin-bottom: 32px;"></vue-editor>
                                    <!-- <w-textarea
                                        label="DESCRIPCIÓN DE LA PROPIEDAD"
                                        placeholder=" "
                                        v-model="form.Des_Subtitulo2"
                                    ></w-textarea> -->
                                </div>
                            </div>
                        </div>
                        <div>
                            <p class="body bold tertiary-text ml-5 mb-4">Locación</p>
                            <w-input disabled v-model="verDireccion"></w-input>
                            <mapas-agregar
                                @eventAddress="eventDireccion($event)"
                                :isShowAddress="true"></mapas-agregar>
                        </div>
                        <div class="mt-20">
                            <!-- FOTOS -->
                            <div class="f-header">
                                Fotos
                                <span
                                    class="caption black-text"
                                >({{ resource.photos.length }} de 20 disponibles)</span>
                            </div>

                            <div class="w-full">
                                <div class="flex flex-row justify-center">
                                    <w-card :shadow="false" class="upload-file-card">
                                        <div class="flex flex-col items-center">
                                            <w-icon icon="upload-image" h="137px"></w-icon>
                                            <p
                                                class="text-center mt-5"
                                            >Sube fotos desde tu computadora</p>

                                            <w-btn
                                                color="#57BCD1"
                                                :dark="true"
                                                :rounded="true"
                                                :small="true"
                                                :disabled="resource.photos.length >= 20 ? true : false"
                                            >
                                                <p>seleccionar fotos</p>
                                                <input
                                                    class="fileInput"
                                                    type="file"
                                                    ref="photoFile"
                                                    accept=".jpg, .jpeg, .png"
                                                    :disabled="resource.photos.length >= 20 ? true : false"
                                                    multiple="multiple"
                                                    @change="addPhoto()"
                                                />
                                            </w-btn>
                                            <p class="text-center mt-5">
                                                Formatos permitidos: JPG, JPEG, PNG
                                                (Tamaño máximo: 5Mb)
                                            </p>
                                        </div>
                                        <div class="preview">
                                            <w-carousel
                                                :items="carrouselItems"
                                                :pagination="windowWidth >= 1024 ? false : true"
                                                :navigation="windowWidth >= 1024 ? true : false"
                                                class="preview-carousel"
                                            >
                                                <slide
                                                    class="preview-slide"
                                                    v-for="(media, i) in resource.photos"
                                                    :key="i"
                                                >
                                                    <div class="preview-item">
                                                        <div class="preview-source">
                                                            <img :src="media.url" />
                                                            <div
                                                                class="delete-icon"
                                                                @click="removePhoto(media)"
                                                            >×</div>
                                                        </div>
                                                    </div>
                                                </slide>
                                            </w-carousel>
                                        </div>
                                    </w-card>
                                </div>
                            </div>

                            <br />

                            <!-- VIDEOS -->
                            <div class="f-header">
                                Videos
                                <span
                                    class="caption black-text"
                                >({{ videoCount }} de 3 disponibles)</span>
                            </div>

                            <div class="w-full">
                                <div class="flex flex-row justify-center">
                                    <w-card :shadow="false" class="upload-file-card">
                                        <div class="flex flex-col items-center">
                                            <w-icon icon="upload-video" h="137px"></w-icon>
                                            <!-- <p class="text-center mt-5">Sube videos desde tu computadora</p> -->

                                            <w-btn
                                                color="#57BCD1"
                                                :dark="true"
                                                @click="selectVideo =!selectVideo"
                                                :rounded="true"
                                                :small="true"
                                            >
                                                <p>seleccionar videos</p>
                                            </w-btn>
                                            <!-- <p class="text-center mt-5">
                                                Formatos permitidos: JPG, JPEG, PNG
                                                (Tamaño máximo: 5Mb)
                                            </p>-->
                                        </div>

                                        <div v-if="selectVideo">
                                            <p class="f-header">Enlace de video</p>
                                            <div class="flex flex-row flex-wrap">
                                                <div class="w-full px-2">
                                                    <w-input
                                                        label="Enlace de video"
                                                        placeholder="Ejemplo: https://www.youtube.com/watch?v=uN5Cux5t0Ak"
                                                        v-model="form.Des_LinkVideo1"
                                                    ></w-input>
                                                </div>
                                                <div class="w-full px-2">
                                                    <w-input
                                                        label="Enlace de video"
                                                        placeholder="Ejemplo: https://www.youtube.com/watch?v=uN5Cux5t0Ak"
                                                        v-model="form.Des_LinkVideo2"
                                                    ></w-input>
                                                </div>
                                                <div class="w-full px-2">
                                                    <w-input
                                                        label="Enlace de video"
                                                        placeholder="Ejemplo: https://www.youtube.com/watch?v=uN5Cux5t0Ak"
                                                        v-model="form.Des_LinkVideo3"
                                                    ></w-input>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- <div class="preview">
                                            <w-carousel
                                                :items="carrouselItems"
                                                :pagination="windowWidth >= 1024 ? false : true"
                                                :navigation="windowWidth >= 1024 ? true : false"
                                                class="preview-carousel"
                                            >
                                                <slide
                                                    class="preview-slide"
                                                    v-for="(media, i) in resource.videos"
                                                    :key="i"
                                                >
                                                    <div class="preview-item">
                                                        <div class="preview-source">
                                                            <video autoplay muted>
                                                                <source :src="media.url" />
                                                            </video>
                                                            <div
                                                                class="delete-icon"
                                                                @click="removeVideo(media)"
                                                            >×</div>
                                                        </div>
                                                    </div>
                                                </slide>
                                            </w-carousel>
                                        </div>-->
                                    </w-card>
                                </div>
                            </div>

                            <div class="flex flex-row justify-center">
                                <div class="w-full md:w-1/2 px-2 mt-10 mb-20">
                                    <p class="text-center">
                                        Si ha completado todos los campos y está
                                        seguro de la exactitud de toda la
                                        información, haga clic en el botón a
                                        continuación para guardar los datos
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-row justify-center">
                                <w-btn :dark="true" :large="true" @click="submitNewPublication">GUARDAR AVISO</w-btn>
                            </div>

                           
                        </div>
                    </form>
                </w-card>
            </div>
        </div>
        <overlay-page-loader :loading="pageLoading"/>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import MapasAgregar from "../../components/mapas/MapasAgregar";
import { CreatePublication, UploadImages } from "@/common/publication_apis";
import { GetGeneralOptions } from "@/common/home_apis";
import { CheckUserSubscription } from "@/common/subscription_apis";
import { notify, editorToolbar } from "@/common/helpers";

export default {
    data: () => ({
        windowWidth: window.innerWidth,
        pageLoading: false,
        toolbarOptions: editorToolbar,
        veremos : "",
        sections: {
            inmueble: true,
            ubicacion: true,
            precio: true,
            datos: true,
            servicios: true,
            additionals: true,
            ambientes: true,
            areascomunes: true,
            video: true
        },
        form: {
            Flg_MostrarDireccion: true,
            Num_Comision : 0,
            Num_ComisionCompartir : 0

        },
        resource: {
            photos: [],
            videos: [],
        },
        tmpdata: {
            tipooperacion: null,
            tipoinmueble: null,
            departamento: null,
            provincias: null,
            distrito: null,
            moneda: null,
            comision: "Porcentaje"
        },
        selectVideo: false,
        coordenadas: null,
        verDireccion: "",
        operaciontipos: [],
        inmuebletipos: [],
        monedatipos: [],
        comisiontipos: [],
        properties: [],
        locations: [],
        departments: [],
        provinces: [],
        districts: [],
        cambiar_comision : "Porcentaje a Comisionar",
        cambiar_compartir: "Porcentaje a Compartir"
    }),

    components: {
        MapasAgregar,
        VueEditor
    },

    computed: {
        total: function () {
          return this.form.Num_Comision * 10;
        },
        carrouselItems() {
            if (this.windowWidth >= 768) {
                if (this.windowWidth >= 1024) {
                    return this.windowWidth >= 1280 ? 4 : 3;
                } else {
                    return this.windowWidth >= 1024 ? 3 : 2;
                }
            } else {
                return 1;
            }
        },
        operationOptions: function(){
            if(!this.operaciontipos.length) return [];
            let _options = this.operaciontipos.map(o => o.Descripcion);
            return _options;
        },
        inmuebleOptions: function(){
            if(!this.inmuebletipos.length) return [];
            let _options = this.inmuebletipos.map(o => o.Descripcion);
            return _options;
        },
        dataProperties: function(){
            if(!this.properties.length) return [];

            let _datas = this.properties.filter(p => p.type === 'data');
            return _datas;
        },
        additionalProperties: function(){
            if(!this.properties.length) return [];

            let _additionals = this.properties.filter(p => p.type === 'caracteristics');
            return _additionals;

        },
        serviceProperties: function(){
            if(!this.properties.length) return [];

            let _services = this.properties.filter(p => p.type === 'service');
            return _services;
        },
        monedaOptions: function(){
            if(!this.monedatipos.length) return [];
            let _options = this.monedatipos.map(o => o.Descripcion);
            return _options;
        },
        comisionOptions: function(){
            if(!this.comisiontipos.length) return [];
            let _options = this.comisiontipos.map(o => o.Descripcion);
            return _options;
        },
        videoCount: function(){
            let _count = 0;
            if(this.form.Des_LinkVideo1) _count += 1;
            if(this.form.Des_LinkVideo2) _count += 1;
            if(this.form.Des_LinkVideo3) _count += 1;
            return _count;
        }
    },

    watch: {
        'tmpdata.tipoinmueble': function(selectedType){
            this.updateProperties(selectedType);
        },
        'tmpdata.departamento': function(value, before){
            if(value === before) return;

            this.updateProvinces(value);
        },
        'tmpdata.provincias': function(value, before){
            if(value === before) return;

            this.updateDistricts(value);
        },
        'tmpdata.comision': function(value, before){
            if(value === before) return;
            
            // if(value === "Monto") {
            //     this.cambiar_comision  = "Monto a Comisionar";
            //     this.cambiar_compartir = "Monto a Compartir";
            // }

            // if(value === "Porcentaje") {
            //     this.cambiar_comision  = "Porcentaje a Comisionar";
            //     this.cambiar_compartir = "Porcentaje a Compartir";
            // }
            
            //this.updateDistricts(value);
        }
    },

    created() {
        CheckUserSubscription().then(res => {
            GetGeneralOptions().then(res => {
                if(res && res.data){
                    this.operaciontipos = res.data.operation_types;
                    this.inmuebletipos = res.data.inmueble_types;
                    this.monedatipos = res.data.moneda_types;
                    this.comisiontipos = res.data.comision_types;
                    this.locations = res.data.locations;
                    this.initDepartments();
                    // this.initTipoComision()
                }
            }).catch(err => {
                console.log(err);
            })
        });
    },
    mounted() {
        window.addEventListener("resize", () => {
            this.windowWidth = window.innerWidth;
        });
    },

    methods: {

        // initTipoComision(){
        //    this.tmpdata.comision =  'PORCENTAJE' ; //this.comisiontipos.find(e => e.Descripcion == 'PORCENTAJE').Descripcion;
        // },
        initDepartments(){
            if(!this.locations.length) return;
            let _departs = [];
            this.locations.map(l => {
                if(_departs.indexOf(l.Departamento) === -1) _departs.push(l.Departamento);
            });

            this.departments = _departs;
        },
        updateProvinces(department){
            let _provinces = [];
            this.locations.map(l => {
                if(_provinces.indexOf(l.Provincia) === -1 && l.Departamento === department) _provinces.push(l.Provincia);
            });

            let curProvince = this.tmpdata['provincias'];
            let curDistrit = this.tmpdata['distrito'];

            if(curProvince && !_provinces.includes(curProvince)) {
                delete this.tmpdata.provincias;
                // this.districts = [];
            }
            
            // if(curDistrit && !this.districts.includes(curDistrit)) 
            //     delete this.tmpdata.distrito;

            this.provinces = _provinces;
            this.updateDistricts(this.tmpdata['provincias']);
        },
        updateDistricts(province){
            let _districts = [];
            this.locations.map(l => {
                if(_districts.indexOf(l.Distrito) === -1 && l.Provincia === province) _districts.push(l.Distrito);
            });

            let curDistrit = this.tmpdata['distrito'];

            if(curDistrit && !_districts.includes(curDistrit)) delete this.tmpdata.distrito;
            this.districts = _districts;
        },
        updateProperties(type){
            let selectedType = this.inmuebletipos.find(o => type === o.Descripcion);
            this.properties = selectedType.properties;
        },
        eventDireccion(params) {
            this.verDireccion = params.direccion;
            this.coordenadas = params.coordenadas.position;
        },

        addPhoto() {
            if (this.resource.photos.length < 20) {
                const files = this.$refs["photoFile"].files;
                if (files.length <= Number(20 - this.resource.photos.length)) {
                    for (let i = 0; i < files.length; i++) {
                        this.resource.photos.push({
                            file: files[i],
                            url: URL.createObjectURL(files[i]),
                            name: files[i].name
                        });
                    }
                } else {
                    notify('error', null, 'Superaste la limitación');
                }
            }
        },

        addVideo() {
            if (this.resource.videos.length < 3) {
                const files = this.$refs["videoFile"].files;
                if (files.length <= Number(3 - this.resource.videos.length)) {
                    for (let i = 0; i < files.length; i++) {
                        this.resource.videos.push({
                            file: files[i],
                            url: URL.createObjectURL(files[i]),
                            name: files[i].name
                        });
                    }
                } else {
                    notify('error', null, 'Superaste la limitación');
                }
            }
        },

        removePhoto(file) {
            let index = this.resource.photos.indexOf(file);
            this.resource.photos.splice(index, 1);
        },

        removeVideo(file) {
            let index = this.resource.videos.indexOf(file);
            this.resource.videos.splice(index, 1);
        },

        submitNewPublication() {
            if(this.pageLoading) return;
            this.pageLoading = true;

            let operationType, inmuebleType, location, moneda, comision;
            if(this.tmpdata.tipooperacion) operationType = this.operaciontipos.find(e => e.Descripcion === this.tmpdata.tipooperacion);
            if(this.tmpdata.tipoinmueble) inmuebleType = this.inmuebletipos.find(e => e.Descripcion === this.tmpdata.tipoinmueble);

            if(this.tmpdata.departamento && this.tmpdata.provincias && this.tmpdata.distrito)
                location = this.locations.find(el => el.Departamento === this.tmpdata.departamento && el.Provincia === this.tmpdata.provincias && el.Distrito === this.tmpdata.distrito);

            if(this.tmpdata.moneda) moneda = this.monedatipos.find(e => e.Descripcion === this.tmpdata.moneda);
            if(this.tmpdata.comision) comision = this.comisiontipos.find(e => e.Descripcion == this.tmpdata.comision);

            this.form = {
                ...this.form,
                IdTipoOperacion: operationType ? operationType.IdTipoOperacion : null,
                IdTipoInmueble: inmuebleType ? inmuebleType.IdTipoInmueble : null,
                IdUbigeo: location ? location.IdUbigeo : null,
                IdTipoMoneda: moneda ? moneda.IdTipoMoneda : null,
                IdTipoComision: comision ? comision.IdTipoComision : null,
                Des_Coordenadas: this.coordenadas ? JSON.stringify(this.coordenadas): null,
                Des_DireccionManual: this.verDireccion ? this.verDireccion : null
            }

         

            CreatePublication(this.form).then(res => {
                if(res && res.data) {
                    this.pageLoading = false;
                    this.uploadImages(res.data.id);
                    notify('success', null, 'Publicación creada exitosamente');
                } else {
                    this.pageLoading = false;
                    notify('error', null, 'Creación de publicación fallida');
                }
            }).catch(err => {
                this.pageLoading = false;
                notify('error', null, 'Creación de publicación fallida');
            });
        },

        uploadImages(id){
            const files = [];
            if(this.resource.photos.length){
                this.resource.photos.forEach(p => {
                    if(p.file) files.push(p.file);
                });
            }
            
            if(!files.length) {
                this.pageLoading = false;
                this.gotoPublications();
                return;
            }
            
            let formData = new FormData();
            formData.append("publication_id", id);
            for( var i = 0; i < files.length; i++ ){
                let file = files[i];
                formData.append('filenames[' + i + ']', file);
            }

            UploadImages(formData).then(res => {
                this.pageLoading = false;
                if(res && res.data) this.gotoPublications();
                else console.log('image upload error');
            }).catch(err => {
                this.pageLoading = false;
                console.log('publication options...', err.response);
            });
        },
    
        gotoPublications(){
            this.$router.push('/publicaciones');
        }

    }
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.nueva-publicacion {
    .container-nueva-publicacion {
        padding: 25px 0px;
        margin: auto;
        .responsive-nueva-publicacion {
            width: 90%;
            max-width: 1180px;
            margin: auto;
            .card-nueva-publicacion {
                .f-header {
                    margin: 0px 0px 42px 20px;
                    font-weight: bold;
                    font-size: 21px;
                    color: $tertiary;
                }

                .form-section {
                    margin: 42px 0px;
                    .form-header {
                        margin: 0px 0px 42px 20px;
                        font-weight: bold;
                        font-size: 21px;
                        color: $tertiary;
                        .icon {
                            display: none;
                        }
                    }
                }

                .upload-file-card {
                    border: 1px solid #e6e6e6;
                    .card-text {
                        background-color: #fcfcfc;
                        .fileInput {
                            cursor: pointer;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            right: 0;
                            z-index: 99;
                            font-size: 50px;
                            opacity: 0;
                            -moz-opacity: 0;
                            filter: Alpha(opacity=0);
                        }
                    }
                }
                .preview {
                    .preview-carousel {
                        .carousel {
                            width: 95%;
                            .VueCarousel {
                                .VueCarousel-navigation {
                                    button {
                                        padding: 0px !important;
                                    }
                                    .VueCarousel-navigation-prev {
                                        margin-left: 38px !important;
                                    }
                                    .VueCarousel-navigation-next {
                                        margin-right: 38px !important;
                                    }
                                }
                            }

                            .preview-slide {
                                padding: 12px;
                                .preview-item {
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: center;
                                    align-items: center;
                                    cursor: pointer;

                                    .preview-source {
                                        position: relative;
                                        width: 225px;
                                        height: 125px;
                                        overflow: hidden;
                                        .delete-icon {
                                            position: absolute;
                                            width: 24px;
                                            height: 24px;
                                            font-size: 18px;
                                            border-radius: 50%;
                                            color: white;
                                            background-color: $error;
                                            flex-direction: row;
                                            justify-content: center;
                                            align-items: center;
                                            top: 8px;
                                            left: 8px;
                                            cursor: pointer;
                                            display: none;
                                        }
                                        &:hover {
                                            .delete-icon {
                                                display: flex;
                                            }
                                        }
                                        img,
                                        video {
                                            width: auto;
                                            height: auto;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .nueva-publicacion {
        .container-nueva-publicacion {
            padding: 25px 0px;
            margin: auto;
            .responsive-nueva-publicacion {
                width: 90%;
                max-width: 1180px;
                margin: auto;
                .card-nueva-publicacion {
                    margin: 42px 0px;
                    .form-header {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        background-color: #e3e3e3;
                        margin-left: 0px;
                        padding: 8px 24px;
                        border-radius: 32px;
                        cursor: pointer;
                        .icon {
                            display: block;
                            margin-top: 8px;
                        }
                        &.header-active {
                            .icon {
                                img {
                                    transform: rotate(180deg);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
