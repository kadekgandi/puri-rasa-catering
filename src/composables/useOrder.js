import { ref, computed } from 'vue'

const WA_NUMBER = '6289517733600'

const activeMode = ref('paket') // 'paket' | 'custom'
const selectedPackageId = ref(null)
const quantity = ref(20)
const packagingId = ref(null)
const note = ref('')
const customCart = ref({}) // { [itemId]: count }
const customSourceLabel = ref('') // label kalau custom dipanggil dari paket bisnis

export function useOrder(packages, packagingOptions, menuItems) {
  // ============ PAKET MODE ============
  const selectedPackage = computed(
    () => packages.find((p) => p.id === selectedPackageId.value) || null,
  )

  const selectedPackaging = computed(
    () => packagingOptions.find((p) => p.id === packagingId.value) || null,
  )

  const packageTotal = computed(() => {
    if (!selectedPackage.value) return 0
    return selectedPackage.value.price * quantity.value
  })

  const setPackage = (id) => {
    selectedPackageId.value = id
    const pkg = packages.find((p) => p.id === id)
    if (pkg) quantity.value = Math.max(pkg.minOrder || 20, quantity.value)
  }

  const incQty = () => {
    quantity.value += 1
  }
  const decQty = () => {
    const min = selectedPackage.value?.minOrder || 1
    if (quantity.value > min) quantity.value -= 1
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

  const customTotalItems = computed(() =>
    Object.values(customCart.value).reduce((sum, n) => sum + n, 0),
  )

  const customTotalPrice = computed(() =>
    Object.entries(customCart.value).reduce((sum, [id, qty]) => {
      const item = menuItems.find((m) => m.id === Number(id))
      return sum + (item ? item.price * qty : 0)
    }, 0),
  )

  // ============ ACTIVATE CUSTOM FROM PAKET BISNIS ============
  const activateCustomFromPackage = (pkg) => {
    if (!pkg?.baseItemIds) return
    // Reset state lain yg tidak relevan di custom mode supaya fresh start
    note.value = ''
    packagingId.value = null
    // Build cart fresh (replace, bukan merge)
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

  // Reset SEMUA state ke nilai awal (dipanggil setelah submit WA)
  const resetAll = () => {
    activeMode.value = 'paket'
    selectedPackageId.value = null
    quantity.value = 20
    packagingId.value = null
    note.value = ''
    customCart.value = {}
    customSourceLabel.value = ''
  }

  // ============ SUMMARY (untuk sticky bar) ============
  const hasOrder = computed(() => {
    if (activeMode.value === 'paket') return !!selectedPackage.value && quantity.value > 0
    return customTotalItems.value > 0
  })

  const summaryLabel = computed(() => {
    if (activeMode.value === 'paket' && selectedPackage.value) {
      return `${selectedPackage.value.name} · ${quantity.value} box`
    }
    if (activeMode.value === 'custom' && customTotalItems.value > 0) {
      const prefix = customSourceLabel.value ? `Custom · ${customSourceLabel.value}` : 'Custom Box'
      return `${prefix} · ${customTotalItems.value} item`
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
      lines.push(`*Estimasi total:* ${formatIDR(packageTotal.value)}`)
      if (selectedPackaging.value) {
        lines.push(`*Packaging:* ${selectedPackaging.value.name}`)
      }
      // Sertakan isi paket
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
      lines.push(`*Total item:* ${customTotalItems.value}`)
      lines.push(`*Estimasi total:* ${formatIDR(customTotalPrice.value)}`)
      if (selectedPackaging.value) {
        lines.push(`*Packaging:* ${selectedPackaging.value.name}`)
      }
      lines.push('')
      lines.push('*Isi box:*')
      Object.entries(customCart.value).forEach(([id, qty]) => {
        const item = menuItems.find((m) => m.id === Number(id))
        if (item) {
          lines.push(`• ${item.name} × ${qty} — ${formatIDR(item.price * qty)}`)
        }
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
    packagingId,
    note,
    customCart,
    customSourceLabel,
    // computed
    selectedPackage,
    selectedPackaging,
    packageTotal,
    customTotalItems,
    customTotalPrice,
    hasOrder,
    summaryLabel,
    summaryTotal,
    // actions
    setPackage,
    incQty,
    decQty,
    addItem,
    removeItem,
    itemCount,
    activateCustomFromPackage,
    switchMode,
    resetCustom,
    resetAll, // ← Tambah resetAll
    formatIDR,
    buildWhatsappUrl,
  }
}
