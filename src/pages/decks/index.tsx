import { Fragment } from 'react';
import { AddDeckModal } from '../../components/Modals';
import { DeckList } from '../../components/Lists';
import { ContentHeader } from '../../components/ContentHeader';
import { useDecksObserver } from '../../api/hooks';

export const Decks = () => {
    const { data } = useDecksObserver();

    return (
        <Fragment>
            <ContentHeader
                title="Decks"
                action={<AddDeckModal />}
            />

            <DeckList decksData={data} />
        </Fragment>
    );
};

