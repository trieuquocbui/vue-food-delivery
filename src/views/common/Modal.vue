<script setup lang="ts">
import type ModalModel from '@/models/ModalModel'
import { ref, watch } from 'vue'

const props = defineProps<ModalModel>()

const emit = defineEmits(['selectedAcction'])

let modalDisplay = ref<string>(props.display)

watch(
  () => props.display,
  (newVal) => {
    modalDisplay.value = newVal
  }
)

const selected = (value: boolean) => {
  modalDisplay.value = 'none'
  emit('selectedAcction', value)
}
</script>

<template>
  <div class="modal" v-bind:style="{ display: modalDisplay }">
    <div class="modal-content">
      <span class="close" @click="selected(false)">&times;</span>
      <div class="container-modal">
        <h1 class="title-modal" v-if="props.title == undefined">Thông báo</h1>
        <h1 class="title-modal" v-else-if="props.title != undefined">{{ props.title }}</h1>
        <div class="message">
          <slot name="content"></slot>
        </div>
        <div class="clearfix" v-if="props.showBtn">
          <button
            @click="selected(true)"
            v-if="props.submitName == undefined"
            class="btn-modal confirmbtn"
          >
            Xác nhận
          </button>
          <button
            @click="selected(true)"
            v-else-if="props.submitName != undefined"
            class="btn-modal confirmbtn"
          >
            {{ props.submitName }}
          </button>
          <button @click="selected(false)" class="btn-modal cancelbtn">Huỷ bỏ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  display: none;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  padding: 10px;
  background-color: #fefefe;
  border: 0.5px solid var(--border-color);
  font-size: 1.6em;
  line-height: inherit;
  border-radius: 4px;
}

.container-modal {
  padding: 10px;
  text-align: center;
}

.close {
  color: #7b7a7a;
  float: right;
  font-size: 2em;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.btn-modal {
  border-radius: 2px;
  color: white;
  padding: 4px;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.8;
}

.btn-modal:hover {
  opacity: 1;
}

.confirmbtn {
  float: left;
  width: 30%;
  background-color: var(--acctive-color);
}

.cancelbtn {
  float: right;
  width: 30%;
  background-color: var(--error-color);
}

.clearfix::after {
  content: '';
  clear: both;
  display: table;
}

.message {
  margin: 16px 0px;
}

.title-modal {
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
