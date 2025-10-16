// D:\GitHub\ai-methods\scripts\seedClients.ts

import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

initializeApp({ credential: applicationDefault() })
const db = getFirestore()

async function main() {
  const [slug, name, email] = process.argv.slice(2)
  if (!slug || !name) {
    console.error('Usage: ts-node scripts/seedClients.ts <slug> <name> [email]')
    process.exit(1)
  }

  await db.collection('clients').doc(slug).set({
    name,
    ...(email ? { email } : {}),
    createdAt: new Date().toISOString(),
  })

  console.log(`✅ Seeded client: ${slug}`)
}

main()
