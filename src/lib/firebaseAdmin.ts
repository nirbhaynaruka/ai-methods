// server only
import 'server-only'
import { getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const app = getApps().length ? getApps()[0] : initializeApp()
const db = getFirestore(app)

export async function getClientData(slug: string) {
  const snap = await db.collection('clients').doc(slug).get()
  return snap.exists ? (snap.data() as { name: string; email?: string }) : null
}
