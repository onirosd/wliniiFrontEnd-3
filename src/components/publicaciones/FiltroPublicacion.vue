<template>
  <!--

        MB-listado-de-publicacion-1 (https://xd.adobe.com/view/b3577435-af55-46c5-4321-42f0fe99b140-c566/screen/e6046d22-e0ea-4f7e-9b58-31ded648428e/MB-listado-de-publicacion-1)

  -->
  <div>
    <div class="flex flex-row flex-wrap" v-if="filtros.length > 0">
      <w-btn
        :small="true"
        :rounded="true"
        color="secondary"
        :dark="true"
        v-for="(filtro, i) in filtros"
        :key="i"
        @click="handleRemoveFilter(filtro.name)"
      >{{ filtro.text }} X</w-btn>
    </div>
    <div>
      <div v-for="(panel, i) in panels" :key="i">
        <w-panel
          v-if="panel.type === 'search-list'"
          class="panel-disable toggle-disable"
          :toggle="panel.toggle ? true : false"
          :header="panel.name"
          v-model="panel.state">
            <form onSubmit="event.preventDefault()">
              <w-filterselect
                label=""
                :disabled="disabled"
                :value="panel.selectOption"
                placeholder="Pendientes"
                :options="panel.options"
                @input="handleChangeFilter(panel.name, $event)"/>
            </form>
        </w-panel>
        
        <w-panel
          v-else-if="panel.type === 'selection-range'"
          class="panel-disable"
          :toggle="panel.toggle ? true : false"
          :header="panel.name"
          v-model="panel.state">
            <range-filter
              :disabled="disabled"
              :options="panel.options"
              :value="panel.selectOption"
              @changeRange="handleChangeFilter(panel.name, $event)"/>
        </w-panel>

        <w-panel
          v-else-if="panel.type === 'selection-range2'"
          class="panel-disable"
          :toggle="panel.toggle ? true : false"
          :header="panel.name"
          v-model="panel.state">
            <range-filter2
              :disabled="disabled"
              :options ="panel.options[0]"
              :value="panel.selectOption"
              @changeRange="handleChangeFilter(panel.name, $event)"/>
        </w-panel>

        <w-panel
          v-else-if="panel.type === 'row'"
          class="row-items toggle-disable"
          :toggle="panel.toggle ? true : false"
          :header="panel.name"
          v-model="panel.state">
            <w-btn
              v-for="(op, i) in panel.options"
              :key="i"
              :class="panel.selectOption === op ? 'active' : ''"
              @click="handleChangeFilter(panel.name, op)">{{ op }}</w-btn>
        </w-panel>
        
        <w-panel
          v-else
          :toggle="panel.toggle ? true : false"
          :header="panel.name"
          v-model="panel.state">
            <w-btn
              v-for="(op, i) in panel.options"
              :key="i"
              :class="panel.selectOption === op ? 'active' : ''"
              @click="handleChangeFilter(panel.name, op)">{{ op }}</w-btn>
        </w-panel>
      </div>
    </div>
  </div>
</template>

<script>
import RangeFilter from "./RangeFilter";
import RangeFilter2 from "./RangeFilter2";
export default {
  name: "FiltroPublicacion",
  props: {
    panels: Array,
    disabled: Boolean
  },
  data() {
    return {
      filters: []
    };
  },
  components: {
    RangeFilter,
    RangeFilter2,   
  },
  computed: {
    filtros() {
      const filtrosArray = [];
      for (let i = 0; i < this.panels.length; i++) {
        if (this.panels[i].selectOption) {
          filtrosArray.push({
            name: this.panels[i].name,
            text: this.panels[i].display ? this.panels[i].display : this.panels[i].selectOption
            });
        }
      }
      return filtrosArray;
    }
  },

  methods: {
    handleChangeFilter(filterName, value){
      if(this.disabled) return;
      this.$emit('onChange', filterName, value);
    },
    unset(op) {
      if(this.disabled) return;
      const find  = this.panels.find(element => element.selectOption == op);
      const index = this.panels.indexOf(find);
      this.panels[index].selectOption = null;
    },
    handleRemoveFilter(filterName){
      if(this.disabled) return;
      this.$emit('onChange', filterName, null);
    }
  }
};
</script>

<style></style>
