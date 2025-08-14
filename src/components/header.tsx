import { Heart, MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className='bg-white shadow-sm border-orange-100 border-b'>
      <div className='mx-auto px-4 py-4 max-w-md container'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div className='bg-orange-500 p-2 rounded-full'>
              <Heart className='fill-current w-5 h-5 text-white' />
            </div>
            <div>
              <h1 className='font-bold text-gray-800 text-xl'>PetMatch</h1>
              <p className='text-gray-500 text-xs'>Adoção responsável</p>
            </div>
          </div>

          <div className='flex items-center gap-1 text-gray-600 text-sm'>
            <MapPin className='w-4 h-4' />
            <span>São Paulo, SP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
