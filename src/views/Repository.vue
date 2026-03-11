<script setup>
import RepoCard from '@/components/RepoCard.vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import axios from 'axios'
import { useAppStore } from '@/stores/appStore'

// 禁用瀏覽器滾動恢復
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// 頁面上顯示的Repo清單
const reposData = ref([])

// 頁面上已載入的資料長度
const totalLoadedCount = ref(0)

// 頁碼(打API用)
const page = ref(1)

// 觸發加載資料的元素
const triggerElement = ref(null)

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

onBeforeMount(() => {
  window.scrollTo(0, 0)
})

onMounted(async () => {
  // 取得repo的資料(初次讀取至少30筆)
  await getReposData(30)

  // 建立一個新的IntersectionObserver物件，當監聽到目標元素的可見部分超過特定值時，會執行特定的callback function
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // 每次載入再取得10筆
        getReposData(10)
      }
    },
    { threshold: 0.5 }
  )

  observer.observe(triggerElement.value)
})
</script>

<template>
  <div class="list">
    <h2>Data source: GitHub repos of facebook</h2>
    <RepoCard :dataList="reposData" />
    <div ref="triggerElement"></div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
