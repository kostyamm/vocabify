import { Fragment } from 'react';
import { AddGroupModal } from '../../components/Modals';
import { DictionaryList } from '../../components/Lists';
import { ContentHeader } from '../../components/ContentHeader';

const mockGroups = [
    {
        id: 1,
        title: 'English',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
    },
    {
        id: 2,
        title: 'Polish',
        originalLanguage: 'RU',
        targetLanguage: 'PL',
    },
    {
        id: 3,
        title: 'Belarusian',
        originalLanguage: 'RU',
        targetLanguage: 'BE',
    },
    {
        id: 4,
        title: 'Sport',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
    },
    {
        id: 5,
        title: 'Family (eng)',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
    },
    {
        id: 6,
        title: 'Home',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
    },
    {
        id: 7,
        title: 'Travel',
        originalLanguage: 'RU',
        targetLanguage: 'EN',
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

