import { Fragment } from 'react';
import { AddGroupModal } from '../../components/Modals';
import { GroupList } from '../../components/Lists';
import { ContentHeader } from '../../components/UI/ContentHeader';

export const Vocabulary = () => {
    return (
        <Fragment>
            <ContentHeader
                title="Vocabulary"
                action={<AddGroupModal />}
            />

            <GroupList />
        </Fragment>
    );
};

