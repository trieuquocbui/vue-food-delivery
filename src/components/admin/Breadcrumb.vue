<script setup lang="ts">
import type NavModel from '@/models/NavModel'
const props = defineProps<{ navs: NavModel[] }>()
</script>

<template>
  <ul class="breadcrumb mb-10">
    <li class="breadcrumb-item" v-for="nav in props.navs">
      <router-link :to="nav.path" v-if="nav.path">{{ nav.title }}</router-link>
      <a v-else>{{ nav.title }}</a>
    </li>
  </ul>
</template>
