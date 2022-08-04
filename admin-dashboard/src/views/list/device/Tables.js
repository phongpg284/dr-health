import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Table } from 'antd'
import { columns } from './Columns'
const Tables = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://dr-health.com.vn/api/device', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  const sortableColumns = columns.map((column) => {
    const { dataIndex, sorter, ...restColumnProps } = column
    if (sorter) {
      const { compare, ...restSorterProps } = sorter
      return {
        ...restColumnProps,
        dataIndex,
        sorter: {
          compare: (rowA, rowB) => compare(rowA[dataIndex], rowB[dataIndex]),
          ...restSorterProps,
        },
      }
    }
    return column
  })
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách thiết bị</strong>
          </CCardHeader>
          <CCardBody>
            <Table columns={sortableColumns} dataSource={data} loading={data === []} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
