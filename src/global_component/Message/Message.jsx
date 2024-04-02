import { message } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { messageSelectors } from '../../store/selectors/Message';

const Message = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const messageRedux = useSelector(messageSelectors);

    useEffect(() => {
        if (!!messageRedux.content) {
            messageApi.open({
                ...messageRedux
            });
        }
    }, [messageApi, messageRedux])

    return (
        <>
            {contextHolder}
        </>
    );
};

export default Message;