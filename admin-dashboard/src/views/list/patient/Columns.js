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
    title: 'Họ và tên',
    dataIndex: 'fullName',
    key: 'fullName',
    sorter: {
      compare: Sorter.DEFAULT,
    },
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'dob',
    key: 'dob',
    render: (_, { dob }) => (
      <div key={dob}>
        {new Date(dob).toLocaleDateString('vi-VI', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })}
      </div>
    ),
    sorter: {
      compare: Sorter.DATE,
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: {
      compare: Sorter.DEFAULT,
    },
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
    render: (_, { role }) => (
      <div>
        {role === 'doctor' ? 'Bác sĩ' : role === 'patient' ? 'Bệnh nhân' : 'Nhân viên y tế'}
      </div>
    ),
    sorter: {
      compare: Sorter.DEFAULT,
    },
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
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
    title: 'Thiết bị',
    key: 'device',
    dataIndex: 'device',
    render: (_, { device_id }) => (
      <>{device_id ? <Tag color="green">Kết nối</Tag> : <Tag color="red">Không kết nối</Tag>}</>
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
