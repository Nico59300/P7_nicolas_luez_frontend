<template>
<v-app>
    <Header />
    <router-view></router-view>
    <Footer />
</v-app>
</template>


<script>
import Header from './components/Header'
import Footer from './components/Footer'

// @ is an alias to /src

export default {
    name: "App",
    components: {Header, Footer}
}
</script>

<style>

</style>
