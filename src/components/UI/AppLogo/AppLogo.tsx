import { Link } from 'react-router-dom';
import { Flex } from 'antd';
import { BookIcon } from '../../Icons';

export const AppLogo = () => {
    return (
        <Link to="/">
            <Flex gap={8} align="center">
                <BookIcon />
                Vocabify
            </Flex>
        </Link>
    );
};