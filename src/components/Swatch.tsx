interface SwatchProps {
  hex: string;
  name: string;
  className?: string;
}

export default function Swatch({ hex, name, className = "" }: SwatchProps) {
  return (
    <div
      className={`swatch-fabric w-full h-full ${className}`}
      style={{ backgroundColor: hex }}
      role="img"
      aria-label={name}
    />
  );
}
