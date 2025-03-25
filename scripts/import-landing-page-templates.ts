// scripts/import-landing-page-templates.ts
import fs from 'fs';
import path from 'path';

import { createLandingPageTemplate } from '@documenso/lib/server-only/landing-page-template/create-landing-page-template';
import { prisma } from '@documenso/prisma';

// Define the admin user ID who will own these templates
const ADMIN_USER_ID = 1; // Change this to your admin user ID

async function importTemplates() {
  // Path to your components directory
  const componentsDir = path.join(
    process.cwd(),
    'apps/web/src/components/components-templates/templates',
  );

  // Get all template folders
  const templateFolders = fs.readdirSync(componentsDir);

  for (const folder of templateFolders) {
    const folderPath = path.join(componentsDir, folder);

    // Skip if not a directory
    if (!fs.statSync(folderPath).isDirectory()) {
      continue;
    }

    // Look for the main template file (usually ending with -landing-page.tsx)
    const files = fs.readdirSync(folderPath);
    const templateFile = files.find(
      (file) => file.endsWith('-landing-page.tsx') || file.endsWith('.tsx'),
    );

    if (templateFile) {
      const filePath = path.join(folderPath, templateFile);
      const componentCode = fs.readFileSync(filePath, 'utf8');

      // Extract name from folder name (e.g., glossier -> Glossier)
      const name = folder
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      try {
        // Create template using the service function
        await createLandingPageTemplate({
          name,
          description: `Auto-imported template: ${name}`,
          componentCode,
          type: 'FULL_PAGE',
          category: 'Templates',
          tags: ['auto-imported'],
          status: 'PUBLISHED',
          userId: ADMIN_USER_ID,
        });

        console.log(`Imported template: ${name}`);
      } catch (error) {
        console.error(`Error importing template ${name}:`, error);
      }
    }
  }

  console.log('Import complete!');
}

importTemplates()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
