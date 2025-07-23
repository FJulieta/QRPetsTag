// pages/[id].tsx
import { GetServerSideProps } from 'next';
import { Pet } from '../types/Pet';
import PetProfile from '../components/PetProfile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface Props {
  pet: Pet;
}

export default function PetPage({ pet }: Props) {
  const { t } = useTranslation('global');

  return <PetProfile pet={pet} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const locale = context.locale || 'es';

  const res = await fetch(`http://localhost:3002/pets/${id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const pet = await res.json();

  return {
    props: {
      pet,
      ...(await serverSideTranslations(locale, ['global'])),
    },
  };
};
