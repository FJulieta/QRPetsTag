import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet, Lang } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  private pets: Pet[] = [
    {
      id: 'morty',
      name: 'MORTY',
      image: '/images/morty.jpg',
      contact: '5492612155830',
      texts: {
        en: {
          age: '4 years',
          breed: 'Super Dog',
          color: 'Black',
          allergies: 'None',
          medication: 'None',
          personality: 'Curious, Playful, Escape artist',
          notes: 'He loves playing with little balls and sticks'
        },
        es: {
          age: '4 años',
          breed: 'Super Perro',
          color: 'Negro',
          allergies: 'Ninguna',
          medication: 'Ninguna',
          personality: 'Curioso, Juguetón, Escapista',
          notes: 'Le encanta jugar con pelotitas y tronquitos'
        }
      }
    },
    {
      id: 'hope',
      name: 'HOPE',
      image: '/images/hope.jpg',
      contact: '5492612155830',
      texts: {
        en: {
          age: '3 years',
          breed: 'Super Dog',
          color: 'Blonde',
          allergies: 'None',
          medication: 'None',
          personality: 'Calm, Loving, Fearful',
          notes: 'She likes going to the groomer, wearing different outfits, and walking in the park'
        },
        es: {
          age: '3 años',
          breed: 'Super Perro',
          color: 'Rubia',
          allergies: 'Ninguna',
          medication: 'Ninguna',
          personality: 'Tranquila, Amorosa, Asustadiza',
          notes: 'Le gusta ir a la peluquería, usar distintos outfits y caminar en el parque'
        }
      }
    },
    {
      id: 'sugus',
      name: 'SUGUS',
      image: '/images/sugus.jpg',
      contact: '5492612155830',
      texts: {
        en: {
          age: '3 years',
          breed: 'Super Dog',
          color: 'Black',
          allergies: 'None',
          medication: 'None',
          personality: 'Very chill, Affectionate, Lazy',
          notes: 'He likes sleeping and running with the ball'
        },
        es: {
          age: '3 años',
          breed: 'Super Perro',
          color: 'Negro',
          allergies: 'Ninguna',
          medication: 'Ninguna',
          personality: 'Muy tranquilo, Cariñoso, Perezoso',
          notes: 'Le gusta dormir y correr con la pelota'
        }
      }
    }
  ];

  private flatten(pet: Pet, lang: Lang) {
    const { texts, ...base } = pet;
    return { ...base, ...texts[lang] };
  }

  create(createPetDto: CreatePetDto): Pet {
    const pet = {
      id: Date.now().toString(),
      ...createPetDto
    } as unknown as Pet;
    this.pets.push(pet);
    return pet;
  }

  findAll(lang: Lang = 'es') {
    return this.pets.map((p) => this.flatten(p, lang));
  }

  findOne(id: string, lang: Lang = 'es') {
    const pet = this.pets.find((p) => p.id === id);
    if (!pet) throw new NotFoundException('Pet Not Found');
    return this.flatten(pet, lang);
  }

  update(id: string, updatePetDto: UpdatePetDto): Pet {
    const idx = this.pets.findIndex((p) => p.id === id);
    if (idx === -1) throw new NotFoundException('Pet Not Found');
    this.pets[idx] = { ...this.pets[idx], ...updatePetDto } as Pet;
    return this.pets[idx];
  }

  remove(id: string): void {
    this.pets = this.pets.filter((p) => p.id !== id);
  }
}
