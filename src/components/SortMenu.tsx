import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  RiArrowUpDownLine,
  RiCheckLine,
  RiSortAsc,
  RiSortDesc,
} from 'react-icons/ri';
import { FaSortAlphaUp, FaSortAlphaDown } from 'react-icons/fa';
import { useAtom } from 'jotai';
import { orderAtom, orders, OrderType } from '../states/todoOrder';

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
            switch (k as OrderType) {
              case 'newest':
                Icon = RiSortDesc;
                break;
              case 'oldest':
                Icon = RiSortAsc;
                break;
              case 'az':
                Icon = FaSortAlphaDown;
                break;
              case 'za':
                Icon = FaSortAlphaUp;
                break;
              default:
                Icon = RiArrowUpDownLine;
                break;
            }

            return (
              <DropdownMenu.Item
                onClick={() => setOrder(k as OrderType)}
                key={index}
                className={`flex items-center gap-3 ${active && 'bg-blue-50'}`}>
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
