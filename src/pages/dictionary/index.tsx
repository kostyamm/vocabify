import { Fragment } from 'react';
import { AddGroupModal } from '../../components/Modals';
import { DictionaryList } from '../../components/Lists';
import { ContentHeader } from '../../components/ContentHeader';
import { useGetDictionary } from '../../api/hooks/useDictionary.ts';

export const Dictionary = () => {
    const { data } = useGetDictionary()

    return (
        <Fragment>
            <ContentHeader
                title="Dictionary"
                action={<AddGroupModal />}
            />

            <DictionaryList dictionaryData={data} />
        </Fragment>
    );
};

