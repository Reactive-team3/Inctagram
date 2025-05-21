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
  color = '#666',
  className = '',
}: IconProps) {
  return (
    <svg width={width} height={height} className={className} aria-hidden="true">
      <use href={`/icons/icons-sprite.svg#${name}`} fill={color} />
    </svg>
  )
}
