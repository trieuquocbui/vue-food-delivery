<script setup lang="ts">
import type NavModel from '@/models/NavModel';
import logo from '../../assets/logo.svg'

const props = defineProps<{ navs: NavModel[] }>()
</script>
  
<template>
  <div class="navbar">
    <div class="navbar-logo">
      <router-link to="/admin/home" class="navbar-logo-link">
        <img :src="logo" alt="logo" class="navbar-logo-img" />
        <span class="navbar-logo-name">Food Delivery</span>
      </router-link>
    </div>
    <div class="navbar-body">
      <ul class="navbar-body-menu">
        <li class="navbar-body-item" v-for="nav in props.navs">
          <router-link :to="nav.path" class="navbar-body-item-link" activeClass="active"
            >{{ nav.title }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scope>
.navbar {
  padding: 10px;
  background-color: var(--dashboard-color-background);
  height: 100%;
}

.navbar-logo {
  position: relative;
}

.navbar-logo::before {
  position: absolute;
  content: '';
  width: 100%;
  bottom: -10px;
  right: 0;
  border: 1px solid var(--border-color);
}

.navbar-logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.navbar-logo-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--white-color);
}

.navbar-logo-name {
  margin-left: 6px;
  font-size: 1.8em;
  color: var(--white-color);
  font-weight: 500;
}

.navbar-body {
  color: #cacbcd;
}

.navbar-body-menu {
  padding-top: 10px;
}

.navbar-body-item {
  outline: none;
}

.navbar-body-item-link.active {
  background-color: var(--acctive-color);
  color: var(--white-color);
}

.navbar-body-item-link {
  text-decoration: none;
  display: block;
  padding: 10px 10px;
  color: var(--text-color);
  line-height: 16px;
  font-size: 1.8em;
  border-radius: 10px;
  margin-top: 10px;
  background-color: var(--unacctive-color);
}

.navbar-body-item-link:hover {
  color: var(--white-color);
  background-color: var(--acctive-color);
}
</style>
