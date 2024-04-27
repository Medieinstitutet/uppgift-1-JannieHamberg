import { Star } from './Star';

interface StarRatingProps {
  rating: number;
}

export const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className='flex justify-center m-6 gap-3 text-xl'>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} filled={index < rating} />
      ))}
    </div>
  );
};
