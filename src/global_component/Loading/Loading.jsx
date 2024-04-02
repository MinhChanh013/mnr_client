import { Modal, Spin } from 'antd'
import React from 'react'
import { isLoadingSelector } from '../../store/selectors/Loading';
import { useSelector } from 'react-redux';

const Loading = () => {
    const isLoading = useSelector(isLoadingSelector);
    return (
        <Modal className='modal-loading' open={isLoading} footer={false} closeIcon={false}>
            <Spin spinning tip="Loading...." size="large" />
        </Modal>
    )
}

export default Loading