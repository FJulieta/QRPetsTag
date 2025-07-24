export type Lang = 'en' | 'es';

export interface PetTexts {
  age: string;
  breed: string;
  color: string;
  allergies: string;
  medication: string;
  personality: string;
  notes?: string;
}

export interface Pet {
  id: string;
  name: string;
  image: string;
  contact: string;
  texts: Record<Lang, PetTexts>;
}
