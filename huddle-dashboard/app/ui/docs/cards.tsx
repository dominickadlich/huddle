interface CardProps {
    header: string;
    body: string;
    icon?: string;
    href?: string;
    category?: string;
}


export default function Card({ header, body, icon, href, category}: CardProps) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
            {icon &&  <span className="text-2xl">{icon}</span>}
        </div>
        <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{header}</h3>
            {category && <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>}
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p className="text-gray-700 dark:text-gray-300">{body}</p>
      </div>
    </div>
  );
}