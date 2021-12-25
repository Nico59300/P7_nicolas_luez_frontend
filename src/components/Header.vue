<template>
   <header>header
       <nav>
           <router-link to='/'>Home</router-link>
           <router-link to='/posts'>Posts</router-link>
       </nav>
   </header>
</template>

<script>
export default {
    name: 'Header',

    data: () => {

    }
}
</script>


<style>
header {
    display: flex;
    flex-direction: row;
}
router-link {
    margin-right: 1rem;
}
</style>