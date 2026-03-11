<script setup></script>
import RepoCard from '@/components/RepoCard.vue'
import { ref, onMounted, onBeforeMount } from 'vue'

<template></template>
// 頁面上顯示的Repo清單
const reposData = ref([])

<style lang="scss" scoped></style>
<template>
  <div class="list">
    <h2>Data source: GitHub repos of facebook</h2>
    <RepoCard :dataList="reposData" />
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
