<script setup></script>
<script setup>
import RepoCard from '@/components/RepoCard.vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import axios from 'axios'
import { useAppStore } from '@/stores/appStore'

<template></template>
// 頁面上顯示的Repo清單
const reposData = ref([])

<style lang="scss" scoped></style>
// 頁面上已載入的資料長度
const totalLoadedCount = ref(0)

// 頁碼(打API用)
const page = ref(1)

const appStore = useAppStore()

// 取得Repo資料
const getReposData = async (dataCount) => {
  // 根據 資料長度 / 每次要加載資料數量 以求得頁碼
  page.value = Math.floor(totalLoadedCount.value / dataCount) + 1

  try {
    appStore.openLoader()
    const result = await axios.get(`https://api.github.com/users/facebook/repos`, {
      params: { per_page: dataCount, page: page.value.toString() },
    })
    reposData.value.push(...result.data)
    totalLoadedCount.value += result.data.length
  } catch (err) {
    console.error(err)
  } finally {
    appStore.asyncCloseLoader()
  }
}
onMounted(async () => {
  // 取得repo的資料(初次讀取至少30筆)
  await getReposData(30)

})
</script>
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
