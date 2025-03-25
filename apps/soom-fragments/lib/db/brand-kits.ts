import { db } from '@/lib/db'

export async function fetchBrandKit(brandKitId: string) {
  try {
    const brandKit = await db.query.brandKits.findFirst({
      where: (brandKits, { eq }) => eq(brandKits.id, brandKitId),
    })

    return brandKit
  } catch (error) {
    console.error('Error fetching brand kit:', error)
    return null
  }
}
