'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSwipeable } from '@/hooks/use-swipeable';
import { Calendar, Heart, MapPin, X } from 'lucide-react';

interface Pet {
  id: number;
  name: string;
  age: number;
  distance: string;
  description: string;
  image: string;
  type: string;
  ong: string;
}

interface PetCardProps {
  pet: Pet;
  onInterest: () => void;
  onSkip: () => void;
  hasMorePets: boolean;
  isAnimating?: boolean;
}

export function PetCard({
  pet,
  onInterest,
  onSkip,
  hasMorePets,
  isAnimating = false,
}: PetCardProps) {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: hasMorePets ? onSkip : undefined,
    onSwipedRight: onInterest,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...swipeHandlers} className='touch-pan-y'>
      <Card className='bg-white shadow-lg border-0 overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform transform'>
        {/* Imagem do animal */}
        <div className='relative h-96 overflow-hidden'>
          <img
            src={pet.image || '/placeholder.svg'}
            alt={pet.name}
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          />
          <div className='top-4 right-4 absolute bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full'>
            <span className='font-medium text-gray-700 text-sm'>
              {pet.type}
            </span>
          </div>

          <div className='absolute inset-0 pointer-events-none'>
            <div className='top-1/2 left-4 swipe-left-indicator absolute opacity-0 transition-opacity -translate-y-1/2 duration-200 transform'>
              <div className='bg-red-500 p-3 rounded-full text-white'>
                <X className='w-6 h-6' />
              </div>
            </div>
            <div className='top-1/2 right-4 swipe-right-indicator absolute opacity-0 transition-opacity -translate-y-1/2 duration-200 transform'>
              <div className='bg-green-500 p-3 rounded-full text-white'>
                <Heart className='w-6 h-6' />
              </div>
            </div>
          </div>
        </div>

        {/* Informações do animal */}
        <div className='p-6'>
          <div className='flex justify-between items-center mb-3'>
            <h2 className='font-bold text-gray-800 text-2xl'>{pet.name}</h2>
            <div className='flex items-center gap-4 text-gray-600 text-sm'>
              <div className='flex items-center gap-1'>
                <Calendar className='w-4 h-4' />
                <span>
                  {pet.age} {pet.age === 1 ? 'ano' : 'anos'}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <MapPin className='w-4 h-4' />
                <span>{pet.distance}</span>
              </div>
            </div>
          </div>

          <p className='mb-4 text-gray-600 leading-relaxed'>
            {pet.description}
          </p>

          <div className='mb-6'>
            <p className='text-gray-500 text-sm'>
              Cadastrado por:{' '}
              <span className='font-medium text-gray-700'>{pet.ong}</span>
            </p>
          </div>

          {/* Botões de ação */}
          <div className='flex gap-4'>
            {hasMorePets && (
              <Button
                variant='outline'
                size='lg'
                onClick={onSkip}
                disabled={isAnimating}
                className='flex-1 bg-transparent hover:bg-gray-50 border-gray-300 hover:border-red-300 text-gray-600 hover:text-red-600 transition-all duration-200'
              >
                <X className='mr-2 w-5 h-5' />
                Pular
              </Button>
            )}

            <Button
              size='lg'
              onClick={onInterest}
              disabled={isAnimating}
              className='flex-1 bg-orange-500 hover:bg-orange-600 hover:shadow-lg font-semibold text-white transition-all duration-200'
            >
              <Heart className='mr-2 w-5 h-5' />
              Tenho Interesse
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
