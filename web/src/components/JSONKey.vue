<template>
    <v-app>
        
    </v-app>
</template>

<script>
    export default {
        data: function () {
         return { 
        };
      },
      mounted: function () {
        requirejs(
          ["i18n!DS/MKR50_Widget/assets/nls/MKR50_Widget"],
          function (MKR50_Widget) {
            alert(MKR50_Widget.SampleKey);
          }
        );
      },
      methods: {
        
      }
    };
</script>

<style></style>
