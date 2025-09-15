import { HuddleState } from '@/app/lib/actions';

type HuddleFieldName = keyof NonNullable<HuddleState['errors']>;

export type InputConfig = {
  name: HuddleFieldName;  // This constrains name to valid error keys
  label: string;
  type: 'number' | 'text' | 'textarea';
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
};


export default function FormField({ config, state }: { config: InputConfig, state: HuddleState }) {
  const { name, label, type, icon: Icon, placeholder } = config;
  
  if (type === 'textarea') {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="mb-2 block text-sm font-medium text-black">
          {label}
        </label>
        <div className="relative">
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            rows={3}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
          />
          <Icon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500" />
        </div>
        {state.errors?.[name] && (
          <div className="mt-2">
            {state.errors[name].map((error: string) => (
              <p className="text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-black">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm text-black outline-2 placeholder:text-gray-500"
        />
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
      {state.errors?.[name] && (
        <div className="mt-2">
          {state.errors[name].map((error: string) => (
            <p className="text-sm text-red-500" key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}