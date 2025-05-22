import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent, h, watch } from 'vue'
import './style/index.css'
import 'ant-design-vue/dist/reset.css'
let homePageStyle: HTMLStyleElement | undefined;
import ArticleMetadata from "./components/ArticleMetadata.vue";
import BackTop  from './components/BackTop.vue';


// 广告组件 - 客户端专用
const AdComponent = defineAsyncComponent({
  loader: () => import('./components/TopAd.vue'),
  loadingComponent: () => null,
  delay: 200
})

// 客户端专用组件加载器
const createClientComponent = (componentName) =>
  defineAsyncComponent({
    loader: () => import('ant-design-vue').then(m => m[componentName]),
    loadingComponent: () => null,
    delay: 200
  })

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
        'sidebar-nav-before': () => h(AdComponent),
        'doc-footer-before': () => h(BackTop),
      })
  },
  enhanceApp({ app, router }) {
    // 注册 Ant Design 组件
    const antdComponents = {
      'AButton': 'Button',
      'AInput': 'Input',
      'ACarousel': 'Carousel',
      'ACard': 'Card',
      'ASelect': 'Select',
      'ASelectOption': 'SelectOption',
      'ATooltip': 'Tooltip',
      'SearchOutlined': 'SearchOutlined',
      'QqOutlined': 'QqOutlined',
      'WechatOutlined': 'WechatOutlined'
    }

    Object.entries(antdComponents).forEach(([name, component]) => {
      app.component(name, createClientComponent(component))
      app.component('ArticleMetadata' , ArticleMetadata)
    })
    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
    // 彩虹背景动画样式
    function updateHomePageStyle(value: boolean) {
      if (value) {
        if (homePageStyle) return

        homePageStyle = document.createElement('style')
        homePageStyle.innerHTML = `
        :root {
          animation: rainbow 12s linear infinite;
        }`
        document.body.appendChild(homePageStyle)
      } else {
        if (!homePageStyle) return

        homePageStyle.remove()
        homePageStyle = undefined
      }
    }
  },
  
}