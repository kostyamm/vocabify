import { Card } from '../../../api';

export type CardListProps = {
    cards?: Array<Card>;
    loading?: boolean
}

export type CardListFiltersProps = {
    onCheckAll: () => void;
    isAllChecked: boolean;
}