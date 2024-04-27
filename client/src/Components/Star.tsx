import { FaStar, FaRegStar } from 'react-icons/fa';


interface StarProps {
    filled: boolean;
  }


  export const Star = ({ filled }: StarProps) => {
    return filled ? <FaStar color="white" /> : <FaRegStar color="grey" />;
  };