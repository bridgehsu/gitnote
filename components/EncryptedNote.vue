<script setup>
import { onMounted, ref } from 'vue'
import bundle from './cv.enc.json'

const CACHE_KEY = 'gitnote-cv-secret'

const props = defineProps({
  field: {
    type: String,
    default: '',
  },
})

const pass = ref('')
const err = ref(false)
const data = ref(null)

function b64(s) {
  const bin = atob(s)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

function concat(a, b) {
  const out = new Uint8Array(a.length + b.length)
  out.set(a, 0)
  out.set(b, a.length)
  return out
}

async function decrypt(password) {
  const enc = new TextEncoder()
  const material = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: b64(bundle.salt), iterations: bundle.iter, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  )
  const bytes = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: b64(bundle.iv) },
    key,
    concat(b64(bundle.data), b64(bundle.tag)),
  )
  return JSON.parse(new TextDecoder().decode(bytes))
}

async function unlock() {
  err.value = false
  try {
    const next = await decrypt(pass.value.trim())
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(next))
    data.value = next
    pass.value = ''
  } catch {
    err.value = true
  }
}

function lock() {
  sessionStorage.removeItem(CACHE_KEY)
  data.value = null
}

onMounted(() => {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) data.value = JSON.parse(cached)
  } catch {
    sessionStorage.removeItem(CACHE_KEY)
  }
})
</script>

<template>
  <span v-if="field === 'hometown' && data">{{ data.hometown }}</span>
  <span v-else-if="field === 'hometown'">已加密</span>
  <div v-else-if="data" class="open">
    <p>{{ data.contact }}</p>
    <p>{{ data.intent }}</p>
    <p><button type="button" class="text-btn" @click="lock">重新锁定</button></p>
  </div>
  <form v-else class="lock" @submit.prevent="unlock">
    <span>敏感信息已加密</span>
    <input v-model="pass" type="password" placeholder="口令" autocomplete="off">
    <button type="submit">解锁</button>
    <span v-if="err" class="err">口令不对</span>
  </form>
</template>

<style scoped>
.lock,
.open {
  margin: 0 0 1.5rem;
}

.lock {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.lock input {
  height: 32px;
  width: 160px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.lock button,
.text-btn {
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.text-btn {
  height: auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.err {
  color: var(--vp-c-danger-1, #e5484d);
}

.open p {
  margin: 0 0 0.6rem;
}
</style>
