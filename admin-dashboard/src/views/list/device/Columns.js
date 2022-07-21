import React from 'react'
import { Sorter } from 'src/utils/sorter'
import { Space, Tag } from 'antd'

export const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    key: 'id',
    render: (_1, _2, index) => index,
    sorter: {
      compare: Sorter.DEFAULT,
    },
  },
  {
    title: 'Mã thiết bị',
    dataIndex: 'code',
    key: 'code',
    sorter: {
      compare: Sorter.DEFAULT,
    },
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'name',
    key: 'name',
    sorter: {
      compare: Sorter.DEFAULT,
    },
  },
  {
    title: 'Loại thiết bị',
    dataIndex: 'type',
    key: 'type',
    render: (_, { type }) => <>{type === 'medical' ? 'Thiết bị đo' : ''}</>,
    sorter: {
      compare: Sorter.DEFAULT,
    },
  },
  {
    title: 'Bệnh nhân',
    dataIndex: 'patient',
    key: 'patient',
    sorter: {
      compare: Sorter.DEFAULT,
    },
  },
  {
    title: 'Ngày khởi tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (_, { createdAt }) => (
      <div key={createdAt}>
        {new Date(createdAt).toLocaleDateString('vi-VI', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </div>
    ),
    sorter: {
      compare: Sorter.DATE,
    },
  },
  {
    title: 'Trạng thái',
    key: 'isConnect',
    dataIndex: 'isConnect',
    render: (_, { isConnect }) => (
      <>{isConnect ? <Tag color="green">Kết nối</Tag> : <Tag color="red">Không kết nối</Tag>}</>
    ),
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: () => (
      <Space>
        <button type="button" className="btn btn-warning" size="middle">
          Cập nhật
        </button>
        <button type="button" className="btn btn-danger" size="middle">
          Xoá
        </button>
      </Space>
    ),
  },
]
