import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  const { qr } = req.query;

  if (!qr || typeof qr !== 'string') {
    return res.status(400).json({ status: 'error', message: 'QR parameter is required' });
  }

  try {
    const usersRef = collection(db, 'users');
    const userDocs = await getDocs(usersRef);
    let qrFound = false;

    for (const userDoc of userDocs.docs) {
      const qrsRef = collection(db, 'users', userDoc.id, 'qrs');
      const qrQuery = query(qrsRef, where('id', '==', qr));
      const qrDocs = await getDocs(qrQuery);

      if (!qrDocs.empty) {
        qrFound = true;
        break;
      }
    }

    if (qrFound) {
      return res.status(200).json({ status: 'success', message: 'QR encontrado', qr });
    } else {
      return res.status(404).json({ status: 'not_found', message: 'QR no encontrado', qr });
    }
  } catch (error) {
    console.error('Error al validar el QR:', error);
    return res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
}

