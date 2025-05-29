import { BiLoaderCircle } from 'react-icons/bi';

const Loader = ({ size = 'text-xl' }) => {
  return <BiLoaderCircle className={`animate-spin ${size}`} />;
};

export default Loader;
