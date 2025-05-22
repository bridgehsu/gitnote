<template>
  <ClientOnly>
    <div class="ad-carousel-container">
      <a-carousel autoplay :autoplaySpeed="2000" :dots="true">
        <div v-for="(ad, index) in ads" :key="index">

          <a class="carousel-slide" :href="ad.site">
            <div class="slide-content">
              <p class="slide-title">{{ ad.title }}</p>
              <p class="slide-description">{{ ad.description }}</p>
            </div>
          </a>
        </div>
      </a-carousel>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface AdItem {
  title: string
  description: string
  site: string
}

const ads = ref<AdItem[]>([
  {
    title: '🚀 WaTouKuang',
    description: '探索数字货币未来!',
    site: 'https://watoukuang.com'
  },
  {
    title: '🔗 168CHAIN',
    description: '区块链在线演示平台!',
    site: 'https://168chain.com'
  }
])
</script>

<style scoped>
.ad-carousel-container {
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
}

.carousel-slide {
  height: 120px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
}

.slide-content {
  text-align: center;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.slide-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  line-height: 1.3;
}

.slide-description {
  font-size: 13px;
  line-height: 1.4;
}

/* 防止外层影响布局（例如 VitePress 的 sidebar） */
:global(.a-carousel) {
  width: 100% !important;
}
</style>
