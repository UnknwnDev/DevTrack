import { View, type ViewProps } from 'react-native';

type CardProps = ViewProps & {
  className?: string;
};

export function Card({ className = '', style, ...props }: CardProps) {
  return (
    <View
      className={`
        bg-app-light border border-border 
        rounded-2xl p-6 gap-4 
        overflow-hidden shadow-sm 
        ${className}
      `}
      style={style}
      {...props}
    />
  );
}
