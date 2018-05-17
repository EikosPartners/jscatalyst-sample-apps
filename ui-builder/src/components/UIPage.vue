<template >
  <div class="ui-building">
    <ui-builder :endpoints='endpoints' @uibsave="save" @uibimport="importConfig" :importedConfig='importedConfig'></ui-builder>
    <v-dialog v-model="showImportModal" persistent max-width="1000px">
      <v-card>
        <v-card-title>Import Configuration</v-card-title>
        <v-card-text>
          <div>
            <v-select :items="configOptions" v-model="selectedConfig">
            </v-select>
          </div>
          <div>
            <v-btn @click="load()">Load</v-btn>
            <v-btn @click="close()">Cancel</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import the ui buuilder component from jscatalyst
import { UIBuilderComponent } from 'jscatalyst'
export default {
  components: {
    'ui-builder': UIBuilderComponent
  },
  data() {
    return {
      // list of endpoints available in a select so the user does not have to
      // manually enter them
      // these are passed as props to the ui-builder
      endpoints: [
        "http://localhost:9000/data/barchart",
        "http://localhost:9000/data/piechart",
        "http://localhost:9000/data/linechart"
      ],
      importedConfig: [],
      savedConfigs: [],
      configOptions: [],
      selectedConfig: "",
      showImportModal: false
    }
  },
  created () {
    // Get any saved configurations.
    let localConfigs = localStorage.getItem('uibConfigs');

    if (localConfigs){
      try {
        localConfigs = JSON.parse(localConfigs);
      } catch (e) {
        console.log(e);
        return;
      }
    } else {
      localConfigs = {
        configs: []
      }
    }
    console.log(localConfigs);
    this.savedConfigs = localConfigs;
    
    this.savedConfigs.configs.forEach( (config) => {
      this.configOptions.push({
        text: config.name,
        value: config.id
      });
    });
  },
  methods: {
    save (config) {
      console.log(JSON.stringify(config));

      this.savedConfigs.configs.push(config);

      localStorage.setItem('uibConfigs', JSON.stringify(this.savedConfigs));
    },
    importConfig () {
      this.showImportModal = true;
    },
    load () {
      let config = [];

      this.savedConfigs.configs.some( (c) => {
        if (c.id === this.selectedConfig){
          config = c.rows;
          return true;
        }
      });

      this.importedConfig = config;

      this.close();
    },
    close () {
      this.selectedConfig = "";
      this.showImportModal = false;
    }
  }
}
</script>

<style lang="css">
</style>
