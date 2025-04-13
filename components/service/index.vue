<script setup>
import { ref } from 'vue'
import Contact from './Contact.vue'

const items = ref([
  { id: 1, text: 'Blog方案指导', price: '88RMB' },
  { id: 2, text: 'VitePress指导', price: '50RMB' },
  { id: 3, text: 'Nginx证书配置', price: '30RMB' }
])

// 导航按钮跳转函数
const navigateTo = (url) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<template>
  <div class="nav-container">
    <ClientOnly>
      <!-- 背景粒子效果 -->
      <div class="particles-background"/>
      
      <!-- 标题区域 -->
      <div class="header-section">
        <p class="main-title">专业技术服务</p>
        <p class="sub-title">如需远程指导，请提前安装向日葵远程协助工具</p>
      </div>
      
      <!-- 常用工具区域 -->
      <div class="section-container">
        <div class="button-grid">
          <a-button
            v-for="item in items"
            :key="item.id"
            class="nav-button"
            @click="navigateTo(item.url)"
          >
            <div class="button-content">
              <span class="button-text">{{ item.text }}</span>
              <span class="button-price">{{ item.price }}</span>
            </div>
          </a-button>
        </div>
      </div>
    </ClientOnly>
    <Contact/>
  </div>
</template>

<style scoped>
/* 主容器样式 */
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - var(--vp-nav-height) - 2rem);
  position: relative;
}

/* 标题样式 */
.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.main-title {
  min-height: 2.5rem;
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #646cff, #646cffaa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(100, 108, 255, 0.2);
}

.sub-title {
  font-size: 0.8rem;
  margin-top: 0;
  padding: 0.5rem 1rem;
  background-color: rgba(100, 108, 255, 0.1);
  border-radius: 8px;
  display: inline-block;
}

/* 粒子背景样式 */
.particles-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
}

.particles-background::before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: particleMove 100s linear infinite;
}

@keyframes particleMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50%, 50%); }
}

/* 按钮网格布局 */
.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

/* 按钮样式 */
.nav-button {
  height: 100px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  cursor: pointer;
  flex-direction: column;
}

.nav-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  background-color: white;
  border-color: rgba(100, 108, 255, 0.3);
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.button-text {
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-shadow: 0 0 8px rgba(100, 149, 237, 0.3);
  transition: all 0.3s ease;
}

.button-price {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
  background-color: rgba(100, 108, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  transition: all 0.3s ease;
}

.nav-button:hover .button-text {
  text-shadow: 0 0 12px rgba(100, 108, 255, 0.5);
  color: var(--vp-c-brand);
}

.nav-button:hover .button-price {
  background-color: rgba(100, 108, 255, 0.2);
  color: var(--vp-c-brand-dark);
}

/* 深色模式适配 */
:root.dark {
  .nav-button {
    background-color: rgba(30, 30, 40, 0.9);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .nav-button:hover {
    background-color: rgba(40, 40, 50, 0.95);
    border-color: rgba(100, 108, 255, 0.4);
  }

  .particles-background {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  }

  .particles-background::before {
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  }

  .sub-title {
    background-color: rgba(100, 108, 255, 0.2);
    color: var(--vp-c-text-1);
  }
}

/* 响应式设计 */

/* 针对桌面大屏设备 */
@media (max-width: 960px) {
  .nav-container {
    padding: 1.5rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .button-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

/* 针对中型平板 */
@media (max-width: 768px) {
  .main-title {
    font-size: 1.8rem;
  }
  
  .sub-title {
    font-size: 1rem;
  }

  .button-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }

  .nav-button {
    height: 90px;
    padding: 0.8rem;
  }
}

/* 针对手机屏幕 */
@media (max-width: 480px) {
  .main-title {
    font-size: 1.6rem;
  }
  
  .sub-title {
    font-size: 0.9rem;
  }

  .button-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.8rem;
  }

  .nav-button {
    height: 80px;
    padding: 0.6rem;
  }

  .button-text {
    font-size: 1rem;
  }
  
  .button-price {
    font-size: 0.85rem;
  }
}
</style>
