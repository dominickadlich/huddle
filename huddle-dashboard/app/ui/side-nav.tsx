import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  {
    name: 'Teams',
    current: false,
    children: [
      { name: 'Engineering', href: '#', current: false },
      { name: 'Human Resources', href: '#', current: false },
      { name: 'Customer Success', href: '#', current: false },
    ],
  },
  {
    name: 'Projects',
    current: false,
    children: [
      { name: 'GraphQL API', href: '#', current: false },
      { name: 'iOS App', href: '#', current: false },
      { name: 'Android App', href: '#', current: false },
      { name: 'New Customer Portal', href: '#', current: false },
    ],
  },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Documents', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SideNav() {
  return (
     <div className="h-full flex flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pt-6 dark:border-white/10 dark:bg-gray-900">
      <nav className="relative flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <a
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-50 dark:bg-white/5' : 'hover:bg-gray-50 dark:hover:bg-white/5',
                        'block rounded-md py-2 pr-2 pl-10 text-sm/6 font-semibold text-gray-700 dark:text-gray-400',
                      )}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Disclosure as="div">
                      <DisclosureButton
                        className={classNames(
                          item.current ? 'bg-gray-50 dark:bg-white/5' : 'hover:bg-gray-50 dark:hover:bg-white/5',
                          'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-gray-700 dark:text-gray-400',
                        )}
                      >
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500 dark:group-data-open:text-gray-400"
                        />
                        {item.name}
                      </DisclosureButton>
                      <DisclosurePanel as="ul" className="mt-1 px-2">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>
                            <DisclosureButton
                              as="a"
                              href={subItem.href}
                              className={classNames(
                                subItem.current
                                  ? 'bg-gray-50 dark:bg-white/5'
                                  : 'hover:bg-gray-50 dark:hover:bg-white/5',
                                'block rounded-md py-2 pr-2 pl-9 text-sm/6 text-gray-700 dark:text-gray-400',
                              )}
                            >
                              {subItem.name}
                            </DisclosureButton>
                          </li>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
            >
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
