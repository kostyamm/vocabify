import { Fragment } from 'react';
import { AddGroupModal } from '../../components/Modals';
import { DictionaryList } from '../../components/Lists';
import { ContentHeader } from '../../components/ContentHeader';
import { useDictionaryObserver } from '../../api/hooks';

export const Dictionary = () => {
    const { data } = useDictionaryObserver();

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

