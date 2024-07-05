<script setup lang="ts">
import HeaderView from '../../components/admin/Header.vue'
import NavView from '../../components/admin/Nav.vue'
import FooterView from '../../components/admin/Footer.vue'
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="l-2">
        <NavView></NavView>
      </div>
      <div class="l-10">
        <HeaderView></HeaderView>
        <RouterView />
        <FooterView></FooterView>
      </div>
    </div>
  </div>
</template>

<style scope>
@import url('../../assets/css/admin.css');
</style>
