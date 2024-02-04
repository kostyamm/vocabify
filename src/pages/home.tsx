import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

export const Home = () => {
    return (
        <Result
            icon={<SmileOutlined />}
            title="Great, we have done all the operations!"
            extra={<Button type="primary">Next</Button>}
        />
    );
};
