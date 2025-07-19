// pages/[id].tsx
import { GetServerSideProps } from 'next';
import { Pet } from '../types/Pet';
import PetProfile from '../components/PetProfile';

interface Props {
    pet: Pet;
}

export default function PetPage({ pet }: Props) {
    return <PetProfile pet={pet} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    const res = await fetch(`http://localhost:3002/pets/${id}`);

    if (!res.ok) {
        return { notFound: true };
    }

    const pet = await res.json();

    return {
        props: { pet },
    };
};
