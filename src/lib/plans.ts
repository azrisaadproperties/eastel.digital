export interface Plan {
  id: string
  name: string
  price: string
  period: string
  dataQuota: string
  badge?: string
  isPopular?: boolean
  color: string
  features: string[]
  buttonText: string
  btnClass: string
}

export const PLANS: Plan[] = [
  {
    id: 'ez50',
    name: 'EZ50',
    price: 'RM50',
    period: '/ Bulan',
    dataQuota: '500GB Data 5G',
    badge: '⭐ RECOMMENDED',
    isPopular: true,
    color: 'var(--primary)',
    features: [
      'Hotspot Penuh',
      'Panggilan Tanpa Had',
      '3GB Roaming (ID, SG, TH)'
    ],
    buttonText: 'Beli EZ50 Sekarang ⚡',
    btnClass: 'btn btn-primary btn-pulse'
  },
  {
    id: 'ez68',
    name: 'EZ68',
    price: 'RM68',
    period: '/ Bulan',
    dataQuota: '700GB Data 5G',
    color: '#8B5CF6',
    features: [
      'Hotspot Penuh',
      'Panggilan Tanpa Had',
      '5GB Roaming (ID, SG, TH)'
    ],
    buttonText: 'Beli EZ68',
    btnClass: 'btn btn-secondary'
  },
  {
    id: 'ez35',
    name: 'EZ35',
    price: 'RM35',
    period: '/ Bulan',
    dataQuota: '200GB Data',
    color: '#3B82F6',
    features: [
      '100GB Hotspot',
      'Panggilan Tanpa Had',
      'Boleh Carry Forward Data'
    ],
    buttonText: 'Beli EZ35',
    btnClass: 'btn btn-secondary'
  },
  {
    id: 'ez15',
    name: 'EZ15',
    price: 'RM15',
    period: '/ 15 Hari',
    dataQuota: '30GB Data',
    color: '#3B82F6',
    features: [
      'Hotspot Penuh',
      'Panggilan Tanpa Had'
    ],
    buttonText: 'Beli EZ15',
    btnClass: 'btn btn-secondary'
  }
]
