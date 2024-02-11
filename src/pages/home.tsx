import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import { Fragment } from 'react';
import axios from 'axios';

export const Home = () => {
    const fetchData = async () => {
        const q = await axios.get('/posts')
        console.log(q);
        return;
    };
    return (
        <Fragment>
            <Button onClick={fetchData}>Fetch</Button>
            <Result
                icon={<SmileOutlined />}
                title="Great, we have done all the operations!"
                extra={<Button type="primary">Next</Button>}
            />
        </Fragment>
    );
};
