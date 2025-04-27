import { firestore } from '../config';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  deleteDoc 
} from 'firebase/firestore';
import { Document } from '@/core/domain/entities/Document';
import { IDocumentRepository } from '@/core/domain/interfaces/IDocumentRepository';

export class FirebaseDocumentRepository implements IDocumentRepository {
  private collection = 'documents';

  async create(document: Document): Promise<Document> {
    const docRef = doc(firestore, this.collection, document.id);
    await setDoc(docRef, {
      title: document.title,
      content: document.content,
      tags: document.tags,
      userId: document.userId,
      createdAt: document.createdAt.toISOString(),
      updatedAt: document.updatedAt.toISOString()
    });
    return document;
  }

  async findById(id: string): Promise<Document | null> {
    const docRef = doc(firestore, this.collection, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return new Document({
      id: docSnap.id,
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    });
  }

  async list(userId: string): Promise<Document[]> {
    const q = query(
      collection(firestore, this.collection),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return new Document({
        id: doc.id,
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      });
    });
  }

  async update(document: Document): Promise<void> {
    const docRef = doc(firestore, this.collection, document.id);
    await setDoc(docRef, {
      title: document.title,
      content: document.content,
      tags: document.tags,
      userId: document.userId,
      createdAt: document.createdAt.toISOString(),
      updatedAt: document.updatedAt.toISOString()
    });
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(firestore, this.collection, id);
    await deleteDoc(docRef);
  }
}