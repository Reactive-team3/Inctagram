interface IconProps {
  name: string
  width?: number
  height?: number
  color?: string
  className?: string
}

export default function Icon({ name, width = 24, height = 24, color, className = '' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={`icon ${className}`}
      style={color ? { color } : undefined}
      aria-hidden="true"
      fill="currentColor"
    >
      <use href={`/icons/sprite/icons-sprite.svg#${name}`} />
    </svg>
  )
}
