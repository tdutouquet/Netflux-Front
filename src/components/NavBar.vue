<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Netflox</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Catalogue de films
            </a>
            <ul class="dropdown-menu">
              <li v-for="category in categories" :key="category.id" >
                <a class="dropdown-item" href="#">{{category.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import categoriesService from '@/services/categoriesService';
export default {
  name: 'NavBar',
  props: {
  },
  data() {
    return {
      categories: []
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await categoriesService.getCategories()
        this.categories = response.data;
        // console.log(response.data);
      } catch (error) {
        console.log('Error while fetching categories: ' + error);
      }
    },
  },
  created() {
        this.fetchCategories();
    }
}
</script>

<style></style>
