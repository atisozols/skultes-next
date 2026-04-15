import { BiLoaderCircle } from 'react-icons/bi';

const Loader = ({ size = 'text-xl', className = '' }) => {
  return <BiLoaderCircle className={`animate-spin ${size} ${className}`.trim()} />;
};

export default Loader;
