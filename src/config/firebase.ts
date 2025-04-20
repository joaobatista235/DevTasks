import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

const serviceAccountPath = path.resolve(__dirname, '../../serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
    throw new Error('Arquivo serviceAccountKey.json não encontrado!');
}

initializeApp({
    credential: cert(serviceAccountPath),
});

const db = getFirestore();
const auth = getAuth();

export { db, auth };