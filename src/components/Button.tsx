type Colors = 'danger' | 'success' | 'primary';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: Colors;
}

const Button = ({ color, ...props }: Props) => {
  let classNames = '';

  return <button {...props}>Button</button>;
};

export default Button;
