<template>
    <v-container v-if={connected}>
        Bienvenu
    </v-container>
    <v-container v-else>
        hello visitor
    </v-container>
</template>

<script>

export default {
       name: 'Profile',
       data: function () {
           return {
           }
       },
       computed: {

       },
       methods: {
          
       }
}
</script>
