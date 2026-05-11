export default function ProductBadges({ badges = [] }) {
  if (!badges || badges.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center"
          >
            <div className="text-2xl sm:text-3xl mb-2">
              {Icon ? <Icon /> : badge.icon}
            </div>
            <span className="text-xs sm:text-sm text-neutral-700 font-medium">
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  )
}


