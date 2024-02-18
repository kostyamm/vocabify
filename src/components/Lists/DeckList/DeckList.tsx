import { List } from 'antd';
import { DeckListProps } from './DeckList.types.tsx';
import { DeckListHoveredItem } from './DeckListHoveredItem.tsx';

export const DeckList = ({ decksData }: DeckListProps) => {
    return (
        <List
            dataSource={decksData}
            renderItem={(item) => <DeckListHoveredItem item={item} />}
        />
    );
};
