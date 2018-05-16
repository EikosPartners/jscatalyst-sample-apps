<template >
  <div class="ui-building">
    <ui-builder :endpoints='endpoints' @uibsave="save"></ui-builder>
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
      ]
    }
  },
  methods: {
    save (config) {
      console.log(JSON.stringify(config));

      let savedConfigs = localStorage.getItem('uibConfigs');

      if (savedConfigs){
        try {
          savedConfigs = JSON.parse(savedConfigs);
        } catch (e) {
          console.log(e);
          return;
        }
      } else {
        savedConfigs = {
          configs: []
        }
      }

      savedConfigs.configs.push(config);

      localStorage.setItem('uibConfigs', JSON.stringify(savedConfigs));
    }
  }
}
</script>

<style lang="css">
</style>
