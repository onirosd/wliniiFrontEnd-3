<template>
    <!-- 
        
        AMC-4 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/e4e8172f-1a17-4470-bff7-97de21426ac3/AMC-4)
        MB-AMC-3-1 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/37cc59df-25a9-4a41-b5b2-bef83ec1fc3e/MB-AMC-3-1)

    -->

    <div class="amc-4">
        <div class="amc-container py-16">
            <w-card :shadow="false">
                <div>
                    <p class="body subtitle-md bold md:ml-5">Análisis de Mercado Comparativo (AMC)</p>
                    <p class="caption primary-text md:ml-5">Aplicación de analisis de precios</p>
                    <w-btn
                        :disabled="true"
                        :rounded="true"
                        :dark="true"
                        :small="true"
                        color="primary"
                        class="step-btn"
                    >04 PASO</w-btn>
                    <p class="body subtitle-md bold md:ml-5">Resultado Final</p>
                    <div class="w-full md:px-5">
                        <progress value="100" max="100" class="amc-progress"></progress>
                    </div>
                </div>
                <p class="body bold ml-3 md:ml-5 my-5">OFERTA</p>
                <div class="amc-table-container">
                    <table class="amc-table">
                        <tr>
                            <th>Dirección</th>
                            <th>Precio({{curSymbol}})</th>
                            <th class="hidden-cell">M2</th>
                            <th class="hidden-cell">{{curSymbol}}/m2</th>
                        </tr>
                        <tr v-for="(offer, i) in offerList" :key="i">
                            <td>{{offer.address}}</td>
                            <td>{{offer.price}}</td>
                            <td class="hidden-cell">{{offer.totalarea}}</td>
                            <td class="hidden-cell">{{offer.unit_price}}</td>
                        </tr>
                    </table>
                </div>
                <p class="body bold ml-3 md:ml-5 my-5">VENDIDOS</p>
                <div class="amc-table-container">
                    <table class="amc-table">
                        <tr>
                            <th>Dirección</th>
                            <th>Precio({{curSymbol}})</th>
                            <th class="hidden-cell">M2</th>
                            <th class="hidden-cell">{{curSymbol}}/m2</th>
                        </tr>
                        <tr v-for="(sold, i) in soldList" :key="i">
                            <td>{{sold.address}}</td>
                            <td>{{sold.price}}</td>
                            <td class="hidden-cell">{{sold.totalarea}}</td>
                            <td class="hidden-cell">{{sold.unit_price}}</td>
                        </tr>
                    </table>
                </div>
                <div class="amc-table-container mt-5 hidden lg:block">
                    <table class="amc-table">
                        <tr>
                            <th></th>
                            <th>Máximo({{curSymbol}})</th>
                            <th>Mínimo({{curSymbol}})</th>
                            <th>Promedio({{curSymbol}})</th>
                            <th>Desviación Estandar</th>
                        </tr>
                        <tr>
                            <td>OFERTAS</td>
                            <td>{{offerResult.max}}</td>
                            <td>{{offerResult.min}}</td>
                            <td>{{offerResult.average}}</td>
                            <td>{{offerResult.deviation}}</td>
                        </tr>
                        <tr>
                            <td>VENDIDOS</td>
                            <td>{{soldResult.max}}</td>
                            <td>{{soldResult.min}}</td>
                            <td>{{soldResult.average}}</td>
                            <td>{{soldResult.deviation}}</td>
                        </tr>
                    </table>
                </div>
                <div class="amc-table-container mt-5 block lg:hidden">
                    <table class="amc-table">
                        <tr>
                            <th></th>
                            <th>Mínimo({{curSymbol}})</th>
                        </tr>
                        <tr>
                            <td>OFERTAS</td>
                            <td>{{offerResult.min}}</td>
                        </tr>
                        <tr>
                            <td>VENDIDOS</td>
                            <td>{{soldResult.min}}</td>
                        </tr>
                    </table>
                </div>
                <div class="amc-table-container mt-5 block lg:hidden">
                    <table class="amc-table">
                        <tr>
                            <th>Promedio({{curSymbol}})</th>
                            <th>Desviación Estandar</th>
                        </tr>
                        <tr>
                            <td>{{offerResult.average}}</td>
                            <td>{{offerResult.deviation}}</td>
                        </tr>
                        <tr>
                            <td>{{soldResult.average}}</td>
                            <td>{{soldResult.deviation}}</td>
                        </tr>
                    </table>
                </div>

                <div class="w-full md:px-5 my-10">
                    <div class="primary alert">
                        <div class="flex flex-row justify-center md:justify-between flex-wrap">
                            <div class="w-full md:w-auto">
                                <p class="body bold white-text text-center md:text-left">
                                    PRECIO SUGERIDO:
                                    <span class="hidden md:block">{{curSymbol + '/ ' + computed_price}}</span>
                                </p>
                            </div>
                            <div class="w-full md:w-auto">
                                <p class="body bold white-text text-center md:text-right">M2: {{finalPrice}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:px-5 mt-10 mb-5">
                    <form>
                        <w-textarea
                            label="OBSERVACIONES"
                            placeholder=" "
                            v-model="form.observaciones"
                        ></w-textarea>
                    </form>
                </div>
                <div class="flex flex-row justify-center">
                    <div class="w-full md:w-2/3 lg:w-1/2">
                        <div class="flex flex-row justify-between flex-wrap">
                            <div class="w-full md:w-1/2 px-2">
                                <w-btn
                                    :fullwidth="true"
                                    :large="true"
                                    :dark="true"
                                    color="secondary"
                                    @click="generatePDF"
                                >DESCARGAR PDF</w-btn>
                            </div>
                            <div class="w-full md:w-1/2 px-2">
                                <w-btn
                                    :fullwidth="true"
                                    :large="true"
                                    :dark="true"
                                    color="primary"
                                    type="submit"
                                    @click="saveAnalysisResult"
                                >NUEVO ANÁLISiS</w-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </w-card>
        </div>
        <overlay-page-loader :loading="pageLoading"/>
    </div>
</template>

<script>
import { GeneratePDF } from "@/common/amc_apis";
import { currencySymbolByString, notify } from "@/common/helpers";
import { CheckUserSubscription } from "@/common/subscription_apis";

export default {
    data: () => ({
        pageLoading: false,
        offerList: [],
        soldList: [],
        offerResult: {},
        soldResult: {},
        finalPrice: 0,
        computed_price: 0,
        form: {},
        selectedCur: 'Soles',
        curSymbol: 'S'
    }),
    created() {
        CheckUserSubscription();
    },
    mounted() {
        this.loadSelectCurreny();
        this.loadSelectedItems();
    },
    methods: {
        loadSelectCurreny(){
            let _config = localStorage.getItem('AMC_CONFIG');
            if(!_config) return;

            this.config = JSON.parse(_config);
            this.selectedCur = this.config.moneda;
            this.curSymbol = currencySymbolByString(this.selectedCur);
        },
        loadSelectedItems(){
            let _offers = localStorage.getItem('AMC_2');
            if(_offers) {
                _offers = JSON.parse(_offers);
                const { list, result } = this.calculateResult(_offers);
                this.offerList = list;
                this.offerResult = result;
            }

            let _solds = localStorage.getItem('AMC_3');
            if(_solds) {
                _solds = JSON.parse(_solds);
                const { list, result } = this.calculateResult(_solds);
                this.soldList = list;
                this.soldResult = result;
            }

            let _finalPrice = 0;
            if(this.soldResult.average == 0 || this.offerResult.average == 0) _finalPrice = this.soldResult.average + this.offerResult.average;
            else _finalPrice = (this.soldResult.average + this.offerResult.average)/2;
            this.finalPrice = parseFloat(_finalPrice.toFixed(3));

            _finalPrice = _finalPrice*parseFloat(this.config.totalarea);
            this.computed_price = parseFloat(_finalPrice.toFixed(3));
        },
        calculateResult(data){
            let _max = 0, _min = 0, _sum = 0, _average, _deviation;

            if(!data || !data.length) {
                return {
                    list: [],
                    result: {
                        max: 0,
                        min: 0,
                        average: 0,
                        deviation: 0
                    }
                }
            };

            let _count = data.length;

            let _list = data.map(d => {
                let _price = parseFloat(d.price);
                let _area = parseFloat(d.totalarea);
                let _unit_price = _price/_area;
                _unit_price = parseFloat(_unit_price.toFixed(3));

                if(!_min) _min = _unit_price;

                if(_unit_price > _max) _max = _unit_price;
                if(_unit_price < _min) _min = _unit_price;
                _sum += _unit_price;

                d['price'] = _price;
                d['unit_price'] = _unit_price;
                return d;
            });

            _average = _sum/_count;

            let _squareSum = 0;
            _list.forEach(p => {
                let _differ = p.unit_price - _average;
                _differ = Math.pow(_differ, 2);
                _squareSum += _differ;
            });

            _deviation = Math.sqrt(_squareSum/_count);

            _average = parseFloat(_average.toFixed(3));

            return {
                list: _list,
                result: {
                    max: _max,
                    min: _min,
                    average: parseFloat(_average.toFixed(3)),
                    deviation: parseFloat(_deviation.toFixed(3))
                }
            }
        },
        generatePDF(){
            this.pageLoading = true;
            let payload = {
                observacion : this.form.observaciones,
                finalPrice: this.computed_price,
                offer_max: this.offerResult.max,
                offer_min: this.offerResult.min,
                sold_max: this.soldResult.max,
                sold_min: this.soldResult.min,
                currency: this.selectedCur,
                curSymbol: this.curSymbol,
                ...this.config
            };

            GeneratePDF(payload).then(res => {
                let _url = URL.createObjectURL(res.data);
                const link = document.createElement("a");
                link.href = _url;
                link.download = 'analisis';
                document.body.appendChild(link);
                link.click();
                // window.open(_url, '_blank');
                this.pageLoading = false;
                notify('success', null, 'El documento fue descargado exitosamente');
            }).catch(err => {
                this.pageLoading = false;
                notify('error', null, 'Error de generación de PDF');
            })
        },
        saveAnalysisResult(){
            localStorage.removeItem('AMC_2');
            localStorage.removeItem('AMC_3');
            this.$router.push('/amc/1');
        }
    },
};
</script>

<style lang="scss">
@import "../../components/wlinii_components/sass/_variables.scss";

.amc-4 {
    .amc-container {
        width: 90%;
        max-width: 1180px;
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
        .amc-table-container {
            padding: 0px 20px;
            table {
                &.amc-table {
                    background-color: rgba($color: #aaaaaa, $alpha: 0.18);
                    overflow: hidden;
                    width: 100%;
                    border-radius: 32px;
                    th,
                    td {
                        text-align: left;
                        padding: 32px 48px;
                    }
                    th {
                        background-color: rgba($color: #aaaaaa, $alpha: 0.18);
                        &:first-child {
                            border-bottom-left-radius: 32px;
                        }

                        &:last-child {
                            border-bottom-right-radius: 32px;
                        }
                    }
                }
            }
        }

        .alert {
            border-radius: 31px;
            padding: 34px 75px;
        }
    }
}

@media (max-width: 1024px) {
    .amc-4 {
        .amc-container {
            .step-btn {
                padding: 5px 25px;
                margin: 20px 0px !important;
            }

            .amc-table-container {
                padding: 0px !important;
                table {
                    &.amc-table {
                        th,
                        td {
                            padding: 16px 32px !important;
                        }
                        .hidden-cell {
                            display: none;
                        }
                        th {
                            &:first-child {
                                border-bottom-left-radius: 32px;
                            }
                            &:not(.hidden-cell) {
                                &:not(:first-child) {
                                    border-bottom-right-radius: 32px;
                                }
                            }
                        }
                    }
                }
            }

            .alert {
                border-radius: 31px;
                padding: 14px 45px;
            }
        }
    }
}
</style>
