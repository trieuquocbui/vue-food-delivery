<script setup lang="ts">
import type PagenationModel from '@/models/Pagenation'

const props = defineProps<PagenationModel>()

function getPaginationGenerator(): (number | string)[] {
  const offsetNumber =
    props.currentPageNumber <= props.offset ||
    props.currentPageNumber > props.totalPageNumber - props.offset
      ? props.offset
      : props.offset - 1
  const numbersList = []
  const numbersListWithDots: (number | string)[] = []

  if (props.totalPageNumber <= 1 || props.totalPageNumber === undefined) return [1]

  numbersList.push(1)
  for (
    let i = props.currentPageNumber - offsetNumber;
    i <= props.currentPageNumber + offsetNumber;
    i++
  ) {
    if (i < props.totalPageNumber && i > 1) {
      numbersList.push(i)
    }
  }
  numbersList.push(props.totalPageNumber)

  numbersList.reduce((accumulator, currentValue) => {
    if (accumulator === 1) {
      numbersListWithDots.push(accumulator)
    }
    if (currentValue - accumulator !== 1) {
      numbersListWithDots.push('...')
    }
    numbersListWithDots.push(currentValue)

    return currentValue
  })
  return numbersListWithDots
}
</script>

<template>
  <div class="content_main_pagination">
    <div class="pagination">
      <div
        class="pagination_item"
        :class="[{ unactive: props.currentPageNumber == 1 }]"
        :disabled="props.currentPageNumber == 1"
        @click="$emit('selectedPage', 1)"
      >
        <font-awesome-icon :icon="['fas', 'angles-left']" />
      </div>
      <div
        class="pagination_item"
        :class="[{ unactive: props.currentPageNumber == 1 }]"
        :disabled="props.currentPageNumber == 1"
        @click="$emit('selectedPage', props.currentPageNumber - 1)"
      >
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </div>
      <div
        v-for="page in getPaginationGenerator()"
        class="pagination_item"
        @click="$emit('selectedPage', page)"
        :class="[{ active: page == props.currentPageNumber }]"
      >
        {{ page }}
      </div>

      <div
        class="pagination_item"
        :class="[{ unactive: props.currentPageNumber == props.totalPageNumber }]"
        :disabled="props.currentPageNumber == props.totalPageNumber"
        @click="$emit('selectedPage', props.currentPageNumber + 1)"
      >
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </div>
      <div
        class="pagination_item"
        :ngClass="[{ unactive: props.currentPageNumber == props.totalPageNumber }]"
        :disabled="props.currentPageNumber == props.totalPageNumber"
        @click="$emit('selectedPage', props.totalPageNumber)"
      >
        <font-awesome-icon :icon="['fas', 'angles-right']" />
      </div>
    </div>
  </div>
</template>

<style scope>
.content_main_pagination {
  display: flex;
  padding: 10px;
  justify-content: end;
}

.pagination {
  font-size: 1.4em;
  display: flex;
}

.pagination_item {
  border: none;
  cursor: pointer;
  color: var(--text-color);
  background-color: var(--unacctive-color);
  padding: 12px;
}

.pagination_item.normal {
  background-color: var(--unacctive-color);
}

.pagination_item:not(.unactive):hover {
  background-color: var(--acctive-color);
  color: var(--white-color);
}

.pagination_item.active {
  color: var(--white-color);
  background-color: var(--acctive-color);
}
</style>
