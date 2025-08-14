import { Header } from '@/components/header';
import { PetCard } from '@/components/pet-card';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const mockPets = [
  {
    id: 1,
    name: 'Luna',
    age: 2,
    distance: '1.2 km',
    description:
      'Cadela muito carinhosa e brincalhona. Adora crianças e outros animais.',
    image: '/smiling-golden-retriever.png',
    type: 'Cão',
    ong: 'ONG Patinhas Felizes',
  },
  {
    id: 2,
    name: 'Mimi',
    age: 1,
    distance: '2.5 km',
    description:
      'Gatinha jovem e curiosa. Muito independente mas adora carinho.',
    image: '/cute-orange-tabby.png',
    type: 'Gato',
    ong: 'Lar dos Felinos',
  },
  {
    id: 3,
    name: 'Thor',
    age: 4,
    distance: '3.1 km',
    description: 'Cão grande e protetor. Ideal para famílias com quintal.',
    image: '/strong-german-shepherd.png',
    type: 'Cão',
    ong: 'Resgate Animal SP',
  },
  {
    id: 4,
    name: 'Bella',
    age: 3,
    distance: '0.8 km',
    description: 'Gata muito dócil e tranquila. Perfeita para apartamentos.',
    image: '/fluffy-white-persian.png',
    type: 'Gato',
    ong: 'ONG Patinhas Felizes',
  },
];

export default function HomePage() {
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [interestedPets, setInterestedPets] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentPet = mockPets[currentPetIndex];
  const hasMorePets = currentPetIndex < mockPets.length - 1;

  const handleInterest = () => {
    if (currentPet && !isAnimating) {
      setInterestedPets((prev) => [...prev, currentPet.id]);
      nextPet();
    }
  };

  const nextPet = () => {
    if (hasMorePets && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPetIndex((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const skipPet = () => {
    if (!isAnimating) {
      nextPet();
    }
  };

  if (!currentPet) {
    return (
      <div className='flex justify-center items-center bg-gradient-to-br from-orange-50 to-pink-50 p-4 min-h-screen'>
        <div className='text-center'>
          <h2 className='mb-4 font-bold text-gray-800 text-2xl'>
            Você viu todos os animais disponíveis!
          </h2>
          <p className='mb-6 text-gray-600'>
            {interestedPets.length > 0
              ? `Você demonstrou interesse em ${interestedPets.length} ${interestedPets.length === 1 ? 'animal' : 'animais'}!`
              : 'Continue explorando para encontrar seu novo companheiro.'}
          </p>
          <button
            onClick={() => {
              setCurrentPetIndex(0);
              setInterestedPets([]);
            }}
            className='bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold text-white transition-colors'
          >
            Ver Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-orange-50 to-pink-50 min-w-screen'>
      <Header />

      <main className='mx-auto px-4 py-6 max-w-md container'>
        <div
          className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        >
          <PetCard
            pet={currentPet}
            onInterest={handleInterest}
            onSkip={skipPet}
            hasMorePets={hasMorePets}
            isAnimating={isAnimating}
          />
        </div>
      </main>
    </div>
  );
}
