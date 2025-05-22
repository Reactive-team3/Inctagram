export interface SidebarItemType {
  path: string
  text?: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  className?: string
  isText?: boolean
}
