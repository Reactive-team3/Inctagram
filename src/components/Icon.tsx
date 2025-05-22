interface IconProps {
  name: string
  width?: number
  height?: number
  color?: string
  className?: string
}

export default function Icon({
  name,
  width = 24,
  height = 24,
  color = 'currentColor',
  className = '',
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={`icon ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <use href={`/icons/icons-sprite.svg#${name}`} />
    </svg>
  )
}
