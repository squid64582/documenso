import { db } from '@/lib/db'

export async function fetchLandingPageTemplate(id: string) {
  try {
    const template = await db.query.landingPageTemplates.findFirst({
      where: (landingPageTemplates, { eq }) => eq(landingPageTemplates.id, id),
    })

    return template
  } catch (error) {
    console.error('Error fetching template:', error)
    return null
  }
}
