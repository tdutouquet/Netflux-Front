<template>
  <NavBar />
  <router-view />
  <FooTer />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooTer from '@/components/FooTer.vue'

export default {
  components: {
    NavBar,
    FooTer,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

#app {
  font-family: Popins, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

:root {
  --clr-primary: rgb(10, 116, 238);
}

main {
  min-height: 90vh;
}
</style>
