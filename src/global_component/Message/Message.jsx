import { message } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { messageSelectors } from '../../store/selectors/Message';

const Message = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const messageRedux = useSelector(messageSelectors);

    if (messageRedux) {
        messageApi.open({
            ...messageRedux
        });
    }

    return (
        <>
            {contextHolder}
        </>
    );
};

export default Message;