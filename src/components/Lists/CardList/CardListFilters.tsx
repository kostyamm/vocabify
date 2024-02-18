import { CardListFiltersProps } from './CardList.types.tsx';
import { Button, Flex, Input } from 'antd';
import { SearchIcon } from '../../Icons';

export const CardListFilters = ({ onCheckAll, isAllChecked }: CardListFiltersProps) => {
    return (
        <Flex vertical gap={24}>
            <Input placeholder="Search" allowClear addonBefore={<SearchIcon />} />

            <div>
                <Button
                    size="small"
                    onClick={onCheckAll}
                    type={isAllChecked ? 'primary' : 'default'}
                >
                    {isAllChecked ? 'Uncheck all' : 'Check all'}
                </Button>
            </div>
        </Flex>
    );
};