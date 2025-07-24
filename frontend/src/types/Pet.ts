export interface Pet {
  id: string;
  name: string;
  image: string;
  contact: string;

  // Campos "aplanados" que devuelve el backend según lang
  age: string;
  breed: string;
  color: string;
  allergies: string;
  medication: string;
  personality: string;
  notes?: string;
}
