<script setup lang="ts">
import type NavModel from '@/models/NavModel'
const props = defineProps<{ navs: NavModel[] }>()
</script>

<template>
  <div class="content-nav mb-10">
    <ul class="content-nav-list row-offset-4-wrap">
      <li class="content-nav-list-item col-offset-4 l-2" v-for="nav in props.navs">
        <router-link :to="nav.path" class="content-nav-list-item-link" activeClass="active">
          {{ nav.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
