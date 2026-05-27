import { ref, computed } from 'vue'

const WA_NUMBER = '6289517733600'

export const PAKET_MIN_ORDER = 25 // minimum box untuk semua paket
export const CUSTOM_MIN_ORDER = 20 // minimum box untuk custom menu
export const CUSTOM_MIN_MENU = 5 // minimum jenis menu (info saja)

const activeMode = ref('paket') // 'paket' | 'custom'
const selectedPackageId = ref(null)
const quantity = ref(PAKET_MIN_ORDER)
const customQuantity = ref(CUSTOM_MIN_ORDER) // jumlah box/bungkus untuk custom
const packagingId = ref(null)
const note = ref('')
const customCart = ref({}) // { [itemId]: count } — komposisi per box
const customSourceLabel = ref('')

export function useOrder(packages, packagingOptions, menuItems) {
  // ============ PAKET MODE ============
  const selectedPackage = computed(
    () => packages.find((p) => p.id === selectedPackageId.value) || null,
  )

  const selectedPackaging = computed(
    () => packagingOptions.find((p) => p.id === packagingId.value) || null,
  )

  const packagingCost = computed(() => selectedPackaging.value?.price ?? 0)

  const packageTotal = computed(() => {
    if (!selectedPackage.value) return 0
    return (selectedPackage.value.price + packagingCost.value) * quantity.value
  })

  const setPackage = (id) => {
    selectedPackageId.value = id
    const pkg = packages.find((p) => p.id === id)
    if (pkg) quantity.value = Math.max(pkg.minOrder || PAKET_MIN_ORDER, quantity.value)
  }

  const incQty = () => {
    quantity.value += 1
  }

  // Mengembalikan true jika sudah di minimum (untuk trigger toast di View)
  const decQty = () => {
    const min = selectedPackage.value?.minOrder || PAKET_MIN_ORDER
    if (quantity.value > min) {
      quantity.value -= 1
      return false // berhasil dikurangi
    }
    return true // sudah di minimum, tidak bisa dikurangi
  }

  // ============ CUSTOM MODE ============
  const addItem = (id) => {
    customCart.value = { ...customCart.value, [id]: (customCart.value[id] || 0) + 1 }
  }

  const removeItem = (id) => {
    const next = { ...customCart.value }
    if (next[id] > 1) next[id] -= 1
    else delete next[id]
    customCart.value = next
  }

  const itemCount = (id) => customCart.value[id] || 0

  // Jumlah jenis menu yang dipilih (unique items)
  const uniqueMenuCount = computed(() => Object.keys(customCart.value).length)

  // Total quantity item dalam cart (untuk referensi isi box)
  const customTotalItems = computed(() =>
    Object.values(customCart.value).reduce((sum, n) => sum + n, 0),
  )

  // Harga per box (komposisi × harga satuan)
  const customPerBoxPrice = computed(() =>
    Object.entries(customCart.value).reduce((sum, [id, qty]) => {
      const item = menuItems.find((m) => m.id === Number(id))
      return sum + (item ? item.price * qty : 0)
    }, 0),
  )

  // Total harga = (harga per box + packaging) × jumlah box
  const customTotalPrice = computed(
    () => (customPerBoxPrice.value + packagingCost.value) * customQuantity.value,
  )

  const incCustomQty = () => {
    customQuantity.value += 1
  }

  // Mengembalikan true jika sudah di minimum
  const decCustomQty = () => {
    if (customQuantity.value > CUSTOM_MIN_ORDER) {
      customQuantity.value -= 1
      return false
    }
    return true // sudah di minimum
  }

  // ============ ACTIVATE CUSTOM FROM PAKET BISNIS ============
  const activateCustomFromPackage = (pkg) => {
    if (!pkg?.baseItemIds) return
    note.value = ''
    packagingId.value = null
    const cart = {}
    pkg.baseItemIds.forEach((id) => {
      cart[id] = 1
    })
    customCart.value = cart
    customSourceLabel.value = pkg.name
    selectedPackageId.value = null
    activeMode.value = 'custom'
  }

  const switchMode = (mode) => {
    activeMode.value = mode
    if (mode === 'paket') customSourceLabel.value = ''
  }

  const resetCustom = () => {
    customCart.value = {}
    customSourceLabel.value = ''
  }

  const resetAll = () => {
    activeMode.value = 'paket'
    selectedPackageId.value = null
    quantity.value = PAKET_MIN_ORDER
    customQuantity.value = CUSTOM_MIN_ORDER
    packagingId.value = null
    note.value = ''
    customCart.value = {}
    customSourceLabel.value = ''
  }

  // ============ MINIMUM ORDER ============
  const customCanProceed = computed(
    () => customQuantity.value >= CUSTOM_MIN_ORDER && uniqueMenuCount.value > 0,
  )
  const customMinOrder = CUSTOM_MIN_ORDER
  const paketMinOrder = PAKET_MIN_ORDER
  const customMinMenu = CUSTOM_MIN_MENU

  // ============ SUMMARY ============
  const hasOrder = computed(() => {
    if (activeMode.value === 'paket') return !!selectedPackage.value && quantity.value > 0
    return uniqueMenuCount.value > 0
  })

  const summaryLabel = computed(() => {
    if (activeMode.value === 'paket' && selectedPackage.value) {
      return `${selectedPackage.value.name} · ${quantity.value} box`
    }
    if (activeMode.value === 'custom' && uniqueMenuCount.value > 0) {
      const prefix = customSourceLabel.value ? `Custom · ${customSourceLabel.value}` : 'Custom Box'
      return `${prefix} · ${customQuantity.value} box`
    }
    return 'Pilih paket dulu'
  })

  const summaryTotal = computed(() => {
    if (activeMode.value === 'paket') return packageTotal.value
    return customTotalPrice.value
  })

  // ============ FORMAT IDR ============
  const formatIDR = (n) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(n)

  // ============ BUILD WHATSAPP MESSAGE ============
  const buildWhatsappUrl = () => {
    const lines = ['*PESANAN PURI RASA CATERING*', '']

    if (activeMode.value === 'paket' && selectedPackage.value) {
      const pkg = selectedPackage.value
      lines.push(`*Paket:* ${pkg.name}`)
      lines.push(`*Jumlah:* ${quantity.value} box`)
      lines.push(`*Harga satuan:* ${formatIDR(pkg.price)}`)
      if (selectedPackaging.value) {
        lines.push(`*Packaging:* ${selectedPackaging.value.name}`)
        if (packagingCost.value > 0) {
          lines.push(`*Biaya packaging:* ${formatIDR(packagingCost.value)}/box`)
        }
      }
      lines.push(`*Estimasi total:* ${formatIDR(packageTotal.value)}`)
      if (pkg.fixedItems?.length) {
        lines.push('')
        lines.push('*Isi paket:*')
        pkg.fixedItems.forEach((item) => lines.push(`• ${item}`))
      }
      if (note.value.trim()) {
        lines.push('')
        lines.push(`*Catatan khusus:*`)
        lines.push(note.value.trim())
      }
    } else if (activeMode.value === 'custom') {
      const headerLabel = customSourceLabel.value
        ? `Custom · ${customSourceLabel.value}`
        : 'Custom Box (Build Your Own)'
      lines.push(`*Mode:* ${headerLabel}`)
      lines.push(`*Jumlah box:* ${customQuantity.value} box`)
      lines.push(`*Jumlah jenis menu:* ${uniqueMenuCount.value} menu`)
      if (selectedPackaging.value) {
        lines.push(`*Packaging:* ${selectedPackaging.value.name}`)
        if (packagingCost.value > 0) {
          lines.push(`*Biaya packaging:* ${formatIDR(packagingCost.value)}/box`)
        }
      }
      lines.push(`*Estimasi total:* ${formatIDR(customTotalPrice.value)}`)
      lines.push('')
      lines.push(`*Komposisi per box:*`)
      Object.entries(customCart.value).forEach(([id, qty]) => {
        const item = menuItems.find((m) => m.id === Number(id))
        if (item)
          lines.push(`• ${item.name}${qty > 1 ? ` × ${qty}` : ''} — ${formatIDR(item.price * qty)}`)
      })
      if (note.value.trim()) {
        lines.push('')
        lines.push(`*Catatan khusus:*`)
        lines.push(note.value.trim())
      }
    }

    lines.push('')
    lines.push('Mohon konfirmasi ketersediaan & detail pengiriman. Terima kasih!')

    const encoded = encodeURIComponent(lines.join('\n'))
    return `https://wa.me/${WA_NUMBER}?text=${encoded}`
  }

  return {
    // state
    activeMode,
    selectedPackageId,
    quantity,
    customQuantity,
    packagingId,
    note,
    customCart,
    customSourceLabel,
    // computed
    selectedPackage,
    selectedPackaging,
    packagingCost,
    packageTotal,
    customTotalItems,
    uniqueMenuCount,
    customPerBoxPrice,
    customTotalPrice,
    hasOrder,
    summaryLabel,
    summaryTotal,
    customCanProceed,
    // constants
    customMinOrder,
    paketMinOrder,
    customMinMenu,
    // actions
    setPackage,
    incQty,
    decQty,
    incCustomQty,
    decCustomQty,
    addItem,
    removeItem,
    itemCount,
    activateCustomFromPackage,
    switchMode,
    resetCustom,
    resetAll,
    formatIDR,
    buildWhatsappUrl,
  }
}
