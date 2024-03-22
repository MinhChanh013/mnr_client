import React, { Fragment, useState } from "react";

import { Button, Modal, Typography, Flex } from "antd";
import {
  CloseOutlined,
  CloudDownloadOutlined,
  ExclamationCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";

export const buttonTypes = {
  Load: {
    children: "Nạp dữ liệu",
    backgroundColor: "#2399fa",
    icon: <CloudDownloadOutlined />,
  },
  Send: {
    children: "Gởi thông điệp",
    backgroundColor: "#f5a442",
    icon: <SendOutlined />,
  },
  Cancel: {
    children: "Hủy gửi",
    backgroundColor: "#f54f40",
    icon: <CloseOutlined />,
  },
  CancelGetin: {
    children: "Hủy getin",
    backgroundColor: "#f54f40",
    icon: <CloseOutlined />,
  },
  Save: {
    children: "Lưu dữ liệu",
    backgroundColor: "#50a81d",
    icon: <CloudDownloadOutlined />,
  },
};

function ModalConfirmEvent({ isModalOpen, actionText, onOk, onCancel }) {
  return (
    <Modal
      title={
        <Flex
          gap={10}
          fontSize="2rem"
          justify="center"
          style={{ marginBottom: "30px" }}
        >
          <ExclamationCircleOutlined
            style={{ fontSize: "150%", color: "#f5a442" }}
          />
          <Typography style={{ color: "#f5a442", textAlign: "center" }}>
            Xác nhận {actionText}
          </Typography>
        </Flex>
      }
      footer={
        <Flex gap={30}>
          <Button
            style={{
              backgroundColor: "#f5a442",
              color: "#ffffff",
              minWidth: "100px",
            }}
            onClick={onCancel}
          >
            Hủy
          </Button>
          <Button
            style={{
              backgroundColor: "#1B618C",
              color: "#ffffff",
              minWidth: "100px",
            }}
            onClick={onOk}
          >
            Đồng ý
          </Button>
        </Flex>
      }
      closable={false}
      maskClosable={false}
      open={isModalOpen}
      width="fit-content"
    />
  );
}

function EventButton({ children, backgroundColor, icon, action = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    action();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!children) return <Fragment />;

  return (
    <Fragment>
      <Button
        size="middle"
        type="primary"
        icon={icon}
        style={{
          backgroundColor: "#fff",
          color: backgroundColor,
          borderRadius: "0",
          border: `1px solid ${backgroundColor}`,
          boxShadow: "none",
        }}
        onClick={showModal}
      >
        {children}
      </Button>

      <ModalConfirmEvent
        isModalOpen={isModalOpen}
        actionText={children}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </Fragment>
  );
}

export function LoadButton({ action }) {
  return <EventButton action={action} {...buttonTypes.Load} />;
}

export function SendButton({ action }) {
  return <EventButton action={action} {...buttonTypes.Send} />;
}

export function CancelButton({ action }) {
  return <EventButton action={action} {...buttonTypes.Send} />;
}

export function CancelGetinButton({ action }) {
  return <EventButton action={action} {...buttonTypes.Send} />;
}

export function SaveButton({ action }) {
  return <EventButton action={action} {...buttonTypes.Send} />;
}

export function renderEventButtons(
  /**
   * @type {Array<{type: { children: React.ReactDOM | React.ReactDOM[] | String | null | undefined, backgroundColor: String, icon }, action: Function}>}
   * */
  buttons = []
) {
  return (
    <Flex style={{ gap: "10px", flexWrap: "wrap" }}>
      {buttons.map(({ type, action }, index) => (
        <EventButton key={`${action}-${index}`} {...type} action={action} />
      ))}
    </Flex>
  );
}
