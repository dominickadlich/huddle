import { HuddleState } from "@/app/lib/actions";

type HuddleFieldName = keyof NonNullable<HuddleState["errors"]>;

export type InputConfig = {
  name: HuddleFieldName; // This constrains name to valid error keys
  label: string;
  type: "number" | "text" | "textarea";
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
};

export default function FormField({
  config,
  state,
  defaultValue,
}: {
  config: InputConfig;
  state: HuddleState;
  defaultValue: string | "";
}) {
  const { name, label, type, icon: Icon, placeholder } = config;

  return (
    <div className="mt-10">
      <div className="grid grid-cols-5">
        <div className="sm:col-span-4">
          <label
            htmlFor={name}
            className="flex items-center text-sm/6 font-medium text-gray-900 dark:text-white"
          >
            <Icon className="pointer-events-none h-[18px] w-[18px] text-gray-900 dark:text-white mr-2" />
            {label}
          </label>
          <div className="mt-2">
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              defaultValue={defaultValue}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
            />
          </div>
          {state.errors?.[name] && (
            <div className="mt-2">
              {state.errors[name].map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
