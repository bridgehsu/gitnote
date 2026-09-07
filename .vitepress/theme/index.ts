import DefaultTheme from 'vitepress/theme'
import { defineAsyncComponent, h, watch } from 'vue'
import './style/index.css'
import 'ant-design-vue/dist/reset.css'
import EncryptedNote from '../../components/EncryptedNote.vue'
import ArticleMetadata from "./components/ArticleMetadata.vue";
import BackTop  from './components/BackTop.vue';

let homePageStyle: HTMLStyleElement | undefined;

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
        'doc-footer-before': () => h(BackTop),
      })
  },
  enhanceApp({ app, router }) {
    const antdComponents = {
      'AButton': 'Button',
      'AInput': 'Input',
      'ASelect': 'Select',
      'ASelectOption': 'SelectOption',
    }

    Object.entries(antdComponents).forEach(([name, component]) => {
      app.component(name, createClientComponent(component))
    })
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('EncryptedNote', EncryptedNote)

    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }

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
