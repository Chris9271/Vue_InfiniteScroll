<script setup>
defineProps({
  dataList: Array,
})
</script>

<template>
  <div class="card" v-for="(data, index) in dataList">
    <h2>Title: {{ data.name }}</h2>
    <p><span>Description:</span> {{ data.description }}</p>
    <p>
      <span>Repo URL:</span> <a :href="data.html_url" target="_blank">{{ data.html_url }}</a>
    </p>
    <p>Index: {{ index + 1 }}</p>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 1px 2px #0000004d, 0 2px 6px 2px #00000026;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;

  h2 {
    margin: 0 !important;
    color: #3960ae;
  }

  p {
    margin: 0 !important;
    color: #424242;
    span {
      color: #3960ae;
    }
  }
}
</style>
