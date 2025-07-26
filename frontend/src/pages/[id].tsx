import { GetServerSideProps } from 'next';
import { Pet } from '../types/Pet';
import PetProfile from '../components/PetProfile';

interface Props {
  pet: Pet;
}

export default function PetPage({ pet }: Props) {
  return <PetProfile pet={pet} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;
  const lang = ctx.req.cookies.lang === 'en' ? 'en' : 'es';

  const baseUrl = process.env.API_URL || 'http://localhost:3002';
  const res = await fetch(`${baseUrl}/pets/${id}?lang=${lang}`);
  if (!res.ok) return { notFound: true };

  const pet = await res.json();

  return { props: { pet } };
};
