import { HuddleState } from "@/app/lib/actions";

type HuddleFieldName = keyof NonNullable<HuddleState["errors"]>;

export type InputConfig = {
  name: HuddleFieldName; // This constrains name to valid error keys
  label: string;
  type: "number" | "text" | "textarea";
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
};

export default function TextBoxFormField({
  config,
  state,
  defaultValue,
}: {
  config: InputConfig;
  state: HuddleState;
  defaultValue: string | "";
}) {
  const { name, label, type, icon: Icon, placeholder } = config;

  if (type === "textarea") {
    return (
      <div className="mt-10">
        <div className="grid grid-cols-2">
          <div className="sm:col-span-5">

            {/* Label with Gradient Icon Container */}
            <label
              htmlFor={name}
              className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2 hover:text-indigo-300 transition-colors duration-300"
            >
              <Icon className="h-4 w-4 text-white" />
              {label}
            </label>

            {/* Textarea with Glassmorphism */}
            <div className="mt-2">
              <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                rows={3}
                defaultValue={defaultValue}
                className="w-full rounded-lg bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 px-4 py-3 text-white placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-gray-800/50 hover:border-gray-600/50 resize-none"
              />
            </div>

          {/* Error Messages */}
          {state.errors?.[name] && (
            <div id={`${name}-error`} className="mt-2" aria-live="polite">
              {state.errors[name].map((error: string) => (
                <div key={error} className="flex items-center gap-1.5 text-sm text-red-400" >
                <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    );
  }
}
