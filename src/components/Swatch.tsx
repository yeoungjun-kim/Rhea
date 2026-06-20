interface SwatchProps {
  hex: string;
  name: string;
  src?: string;
  className?: string;
}

export default function Swatch({ hex, name, src, className = "" }: SwatchProps) {
  if (!src) {
    return (
      <div
        className={`swatch-fabric w-full h-full ${className}`}
        style={{ backgroundColor: hex }}
        role="img"
        aria-label={name}
      />
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      style={{ backgroundColor: hex }}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
