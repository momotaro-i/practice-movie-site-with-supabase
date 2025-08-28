import { IoClose } from 'react-icons/io5';
type Props = {
  color?: string;
  size?: number | string;
};
export const IconClose = ({ color, size }: Props) => {
  return <IoClose color={color} size={size} />;
};
