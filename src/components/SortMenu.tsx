import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  RiArrowUpDownLine,
  RiCheckLine,
  RiSortAsc,
  RiSortDesc,
} from 'react-icons/ri';
import { FaSortAlphaUp, FaSortAlphaDown } from 'react-icons/fa';
import { useAtom } from 'jotai';

import { orderAtom, orders, type OrderType } from '../states/todoOrder';

type Props = {
  children: React.ReactNode;
};

const SortMenu = ({ children }: Props) => {
  const [order, setOrder] = useAtom(orderAtom);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className='bg-white shadow-lg border-2 mt-4 [&>*]:py-2 [&>*]:px-4 rounded-lg border-gray-100'>
          {Object.entries(orders).map(([k, v], index) => {
            const active = order === k;

            let Icon: React.FC<{ className: string }>;
            let dataCy: string;
            switch (k as OrderType) {
              case 'latest':
                Icon = RiSortDesc;
                dataCy = 'latest';
                break;
              case 'oldest':
                Icon = RiSortAsc;
                dataCy = 'oldest';
                break;
              case 'az':
                dataCy = 'az';
                Icon = FaSortAlphaDown;
                break;
              case 'za':
                dataCy = 'za';
                Icon = FaSortAlphaUp;
                break;
              default:
                dataCy = 'unfinished';
                Icon = RiArrowUpDownLine;
                break;
            }

            return (
              <DropdownMenu.Item
                data-cy={dataCy}
                onSelect={() => setOrder(k as OrderType)}
                key={index}
                className={`flex items-center gap-3 cursor-pointer ${
                  active && 'bg-blue-50'
                }`}>
                <Icon className='text-primary text-xl' /> {v}{' '}
                {active && <RiCheckLine className='ml-auto' />}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SortMenu;
