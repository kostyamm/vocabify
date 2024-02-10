import { Button, Card, Dropdown, Input, List, Typography } from 'antd';
import { IconButton } from '../../Buttons';
import { ListPlusIcon, RefreshIcon } from '../../Icons';

export const WordDropdown = ({ word }: { word?: string }) => {
    return (
        <Dropdown
            disabled={!word}
            autoAdjustOverflow
            dropdownRender={WordDropdownMenu}
            placement="bottomRight"
            trigger={['click']}
            arrow
        >
            <Button type="primary" size="large" icon={<RefreshIcon />}>
                Add
            </Button>
        </Dropdown>
    );
};

const WordDropdownMenu = () => {
    return (
        <Card size="small" title="Translation" style={{ minWidth: 280, maxWidth: 300, width: '100%' }}>
            <List>
                <List.Item actions={[<IconButton shape="default" icon={<ListPlusIcon />} />]}>
                    <Typography.Text strong>{'Привет'}</Typography.Text>
                </List.Item>
                <List.Item actions={[<IconButton shape="default" icon={<ListPlusIcon />} />]}>
                    <Input size="large" placeholder="Your translation" style={{ flex: 1 }} />
                </List.Item>
            </List>
        </Card>
    );
};