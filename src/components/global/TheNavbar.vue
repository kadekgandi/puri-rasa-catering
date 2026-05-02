<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import logoPR from '@/assets/images/logo-pr.svg'

const route = useRoute()
const isScrolled = ref(false)
const isMobileOpen = ref(false)

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Tentang', to: '/tentang' },
  { name: 'Menu', to: '/menu' },
  { name: 'Layanan', to: '/layanan' },
  { name: 'Testimoni', to: '/testimoni' },
  { name: 'Kontak', to: '/kontak' },
]

const whatsappUrl =
  'https://wa.me/6289517733600?text=Halo%20Puri%20Rasa%2C%20saya%20ingin%20bertanya%20tentang%20katering.'

const handleScroll = () => {
  isScrolled.value = window.scrollY > 24
}

const toggleMobile = () => {
  isMobileOpen.value = !isMobileOpen.value
}
const closeMobile = () => {
  isMobileOpen.value = false
}

watch(isMobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(
  () => route.path,
  () => closeMobile(),
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="navbar" :class="{ 'is-scrolled': isScrolled, 'is-open': isMobileOpen }">
    <div class="navbar__inner">
      <!-- LOGO -->
      <RouterLink
        to="/"
        class="logo"
        @click="closeMobile"
        aria-label="Puri Rasa Catering — Beranda"
      >
        <span
          class="logo__img"
          :style="{
            maskImage: `url(${logoPR})`,
            WebkitMaskImage: `url(${logoPR})`,
          }"
          role="img"
          aria-label="Puri Rasa Catering"
        ></span>
      </RouterLink>

      <!-- DESKTOP NAV -->
      <nav class="nav" aria-label="Navigasi utama">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav__link"
          active-class="is-active"
        >
          {{ link.name }}
        </RouterLink>
      </nav>

      <!-- HAMBURGER (mobile) -->
      <button
        class="burger"
        :class="{ 'is-open': isMobileOpen }"
        @click="toggleMobile"
        :aria-label="isMobileOpen ? 'Tutup menu' : 'Buka menu'"
        :aria-expanded="isMobileOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- MOBILE DRAWER + OVERLAY -->
    <Teleport to="body">
      <Transition name="overlay">
        <div v-if="isMobileOpen" class="overlay" @click="closeMobile"></div>
      </Transition>

      <Transition name="drawer">
        <aside v-if="isMobileOpen" class="drawer" aria-label="Menu mobile">
          <div class="drawer__top">
            <span class="drawer__brand">Puri Rasa</span>
            <button class="drawer__close" @click="closeMobile" aria-label="Tutup menu">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav class="drawer__nav">
            <RouterLink
              v-for="(link, i) in navLinks"
              :key="link.to"
              :to="link.to"
              class="drawer__link"
              :style="{ '--i': i }"
            >
              <span class="drawer__num">0{{ i + 1 }}</span>
              <span class="drawer__name">{{ link.name }}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </RouterLink>
          </nav>

          <div class="drawer__foot">
            <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="drawer__cta">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z"
                />
                <path
                  d="M20.5 3.5C18.3 1.2 15.3 0 12 0 5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3z"
                />
              </svg>
              Pesan via WhatsApp
            </a>
            <p class="drawer__meta">089517733600 &middot; Singaraja, Bali</p>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
/* ============ NAVBAR SHELL ============ */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-navbar);
  transition:
    background-color var(--transition),
    box-shadow var(--transition),
    backdrop-filter var(--transition),
    border-color var(--transition);
  background-color: transparent;
  border-bottom: 1px solid transparent;
}

.navbar.is-scrolled {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(18px);
  -webkit-backdrop-filter: saturate(180%) blur(18px);
  border-bottom-color: rgba(28, 25, 23, 0.06);
  box-shadow:
    0 1px 0 rgba(28, 25, 23, 0.02),
    0 6px 16px rgba(28, 25, 23, 0.04);
}

.navbar__inner {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding: 0.6rem var(--container-padding);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-xl);
  transition: padding var(--transition);
  min-height: 76px;
}

.navbar.is-scrolled .navbar__inner {
  padding-block: 0.5rem;
  min-height: 70px;
}

/* ============ LOGO ============ */
.logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: transform var(--transition);
}

.logo:hover {
  transform: scale(1.04);
}

.logo__img {
  /* Aspect ratio 432:334 ≈ 1.293
     Tinggi 64px (desktop) → lebar otomatis ~83px */
  display: block;
  width: 83px;
  height: 64px;
  margin-left: -0.5rem;

  /* Background = warna logo (default putih saat di hero gelap) */
  background-color: var(--color-white);

  /* Mask: image dipakai sebagai "stencil" — area gelap dari image
     akan jadi solid color, area transparent tetap transparent */
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;

  transition: background-color var(--transition);
}

/* Saat navbar scroll → background solid putih → ganti warna logo jadi merah */
.navbar.is-scrolled .logo__img {
  background-color: var(--color-red);
}

/* ============ DESKTOP NAV ============ */
.nav {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
}

.nav__link {
  position: relative;
  padding: 0.55rem 0.9rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text);
  border-radius: var(--radius-full);
  transition: color var(--transition-fast);
}

.nav__link::before {
  content: '';
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  width: 4px;
  height: 4px;
  background: var(--color-red);
  border-radius: 50%;
  transform: translateX(-50%) scale(0);
  transition: transform var(--transition);
}

.nav__link:hover {
  color: var(--color-red-dark);
}
.nav__link:hover::before {
  transform: translateX(-50%) scale(1);
}

.nav__link.is-active {
  color: var(--color-red-dark);
  font-weight: 600;
}
.nav__link.is-active::before {
  transform: translateX(-50%) scale(1);
}

/* ============ HAMBURGER ============ */
.burger {
  display: none;
  justify-self: end;
  width: 44px;
  height: 44px;
  position: relative;
  border-radius: 12px;
  background: var(--color-cream);
  border: 1px solid rgba(28, 19, 17, 0.08);
  transition:
    background-color var(--transition),
    border-color var(--transition);
}

.navbar.is-scrolled .burger {
  background: var(--color-white);
  border-color: rgba(28, 19, 17, 0.1);
}

.burger:hover {
  background: var(--color-charcoal);
  border-color: var(--color-charcoal);
}

.burger:hover span {
  background: var(--color-white);
}

.burger span {
  position: absolute;
  left: 50%;
  width: 20px;
  height: 2px;
  background: var(--color-charcoal);
  border-radius: 2px;
  transform: translateX(-50%);
  transition:
    transform var(--transition),
    top var(--transition),
    opacity var(--transition-fast),
    background-color var(--transition-fast);
}

.burger span:nth-child(1) {
  top: 14px;
}
.burger span:nth-child(2) {
  top: 21px;
}
.burger span:nth-child(3) {
  top: 28px;
}

.burger.is-open {
  background: var(--color-charcoal);
  border-color: var(--color-charcoal);
}

.burger.is-open span {
  background: var(--color-white);
}
.burger.is-open span:nth-child(1) {
  top: 21px;
  transform: translateX(-50%) rotate(45deg);
}
.burger.is-open span:nth-child(2) {
  opacity: 0;
}
.burger.is-open span:nth-child(3) {
  top: 21px;
  transform: translateX(-50%) rotate(-45deg);
}

/* ============ OVERLAY ============ */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(28, 19, 17, 0.55);
  backdrop-filter: blur(4px);
  z-index: 999;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity var(--transition);
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* ============ DRAWER ============ */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(86vw, 380px);
  background: var(--color-cream);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 60px rgba(28, 19, 17, 0.18);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 380ms cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

.drawer__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(28, 25, 23, 0.08);
}

.drawer__brand {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-charcoal);
}

.drawer__close {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--color-charcoal);
  transition: background-color var(--transition-fast);
}

.drawer__close:hover {
  background: rgba(28, 25, 23, 0.06);
}

.drawer__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  overflow-y: auto;
}

.drawer__link {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  color: var(--color-charcoal);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  position: relative;
  opacity: 0;
  transform: translateX(20px);
  animation: drawerItem 420ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: calc(var(--i) * 60ms + 120ms);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
}

.drawer__link:hover {
  background: rgba(178, 58, 58, 0.05);
  color: var(--color-red-dark);
}

.drawer__link.router-link-active {
  background: rgba(178, 58, 58, 0.08);
  color: var(--color-red-dark);
}

.drawer__link.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  background: var(--color-red);
  border-radius: 0 3px 3px 0;
}

.drawer__num {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-red);
  min-width: 22px;
}

.drawer__name {
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: -0.005em;
}

@keyframes drawerItem {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.drawer__foot {
  padding: 1.5rem;
  border-top: 1px solid rgba(28, 25, 23, 0.08);
  background: var(--color-white);
}

.drawer__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 1rem;
  background: var(--color-red);
  color: var(--color-white);
  font-weight: 600;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-red);
  transition: background-color var(--transition);
}

.drawer__cta:hover {
  background: var(--color-red-dark);
}

.drawer__meta {
  text-align: center;
  margin-top: 0.875rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}

/* ============ RESPONSIVE ============ */
@media (max-width: 960px) {
  .navbar__inner {
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }
  .nav {
    display: none;
  }
  .burger {
    display: block;
  }
}

@media (max-width: 480px) {
  .navbar__inner {
    padding: 0.5rem var(--container-padding);
    min-height: 68px;
  }

  .logo__img {
    width: 72px;
    height: 56px;
    margin-left: -0.4rem;
  }
}
</style>
