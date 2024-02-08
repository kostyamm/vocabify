import { Fragment } from 'react';
import { AddGroupModal } from '../../components/Modals';
import { DictionaryList } from '../../components/Lists';
import { ContentHeader } from '../../components/UI/ContentHeader';

const mockGroups = [
    {
        id: 1,
        title: 'English',
    },
    {
        id: 2,
        title: 'Polish',
    },
    {
        id: 3,
        title: 'Belarusian',
    },
    {
        id: 4,
        title: 'Sport',
    },
    {
        id: 5,
        title: 'Family (eng)',
    },
    {
        id: 6,
        title: 'Home',
    },
    {
        id: 7,
        title: 'Travel',
    },
];

export const Dictionary = () => {
    return (
        <Fragment>
            <ContentHeader
                title="Dictionary"
                action={<AddGroupModal />}
            />

            <DictionaryList groups={mockGroups} />
        </Fragment>
    );
};

