
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import CodeDecorator from '../_util/CodeDecorator';
import code from './code'
import Table from '@table'
import { EditStatus, SwitchStatus, Input, InputNumber, Selector } from '@data-cell'
import { Button, Slider } from 'antd'

import { getList, getEditList } from './mock'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    showTip: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

function BasicTable(props) {

  const dataSource = useMemo(() => getList(), [])
  const [resizable, setresizable] = useState(false)

  const toggleResizable = useCallback(
    () => {
      setresizable(r => !r)
    },
    [],
  )

  const headerRight = useMemo(() => {
    return (
      <Button onClick={toggleResizable} key='1' >{resizable ? "禁止缩放" : "允许缩放"}</Button>
    )
  }, [resizable])

  const headerLeft = useMemo(() => {
    return <>{resizable ? '当前可缩放' : '当前不可缩放'}</>
  }, [resizable])

  return <Table
    columns={columns}
    dataSource={dataSource}
    resizable={resizable}
    headerRight={headerRight}
    headerLeft={headerLeft}
  />
}

// 可编辑表格
function EditorTable() {

  const [editing, setEditing] = useState(EditStatus.CANCEL);
  const [address] = useState([{ value: '1', label: '地址1' }, { value: '2', label: '地址2' }])
  const getKey = useCallback(() => Math.random().toString('16').slice(2), [])

  const [dataSource, setDataSource] = useState(() => getEditList(10))
  const editorColumns = [
    {
      title: '姓名',
      dataIndex: 'name',
      editConfig: {
        render: (text, record, index) => {
          return <Input />
        },
      },
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      editConfig: {
        render: (text, record, index) => {
          return <InputNumber min={0} />
        }
      }
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      render: (a, record, index) => {
        if (!a) return null
        const item = address.find(item => item.value === a)
        const text = item ? item.label : '未知地址'
        return text
      },
      editConfig: {
        render: (value, record, index) => {
          return (
            <Selector defaultList={address} />
          )
        }
      },
    }
  ]

  const actions = ([editDataList, setEditDataList], selectedRowKeys) => {
    return (
      <>
        <Button onClick={() => { setEditDataList((list) => [{ key: getKey() }, ...list]) }}>添加到第一行</Button>
        <Button onClick={() => { setEditDataList(([first, ...list]) => list) }}>删除第一行</Button>
      </>
    )
  }
  return <Table
    columns={editorColumns}
    dataSource={dataSource}
    headerRight={
      <>
        <Button onClick={() => { setEditing(SwitchStatus) }}>{editing === EditStatus.EDIT ? "退出" : "进入"}编辑</Button>
        <Button onClick={() => { setEditing(EditStatus.SAVE) }}>保存</Button>
      </>
    }
    editable={editing}
    editActions={actions}
    onSave={setDataSource}
    scroll={{ y: 400 }}
  />
}




function WidthTable(props) {

  const [columns, setcolumns] = useState([
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => text + 1,
      width: 150,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 200
    },
    {
      title: '住址住址住址住址住址住址住址住址住址',
      dataIndex: 'address',
      key: 'address',
      width: 200
    },
    {
      title: '嵌套',
      dataIndex: 'nest',
      width: 600,
      children: [
        {
          title: '123123123123123123123',
          dataIndex: 'age1',
          key: 'age1',
        },
        {
          title: 'Age',
          dataIndex: 'age2',
          key: 'age2',
          children: [
            {
              title: 'Age',
              dataIndex: 'age3',
              key: 'age3',
            },
            {
              title: 'Age',
              dataIndex: 'age4',
              key: 'age4',
            },
          ]
        },
        {
          title: 'Age',
          dataIndex: 'age5',
          key: 'age5',
        },
      ]
    }
  ])

  let dataArray = new Array(10), dataSource = [];
  dataArray = dataArray.fill()
  dataArray.map((item, index) => {
    dataSource.push({
      name: "namenamenamenamenamenamename",
      age: index,
      address: "table的宽度需要是各列宽度的总和，如果没有设置列宽，将平分table的宽度,table默认600px，如果不太清楚table的布局策略，最好table宽度和所有列都加上宽度",
      key: index,
      age1: 'aoiduoaisudbaopisdjbpaisjdba;osdbapoisdbna[osidnaosdna[oisda[sidaoibs'
    })
  })

  return <Table columns={columns} dataSource={dataSource} scroll={{ x: 1050 }} />
}

function TitleUse(props) {
  let dataArray = new Array(10), dataSource = [];
  dataArray = dataArray.fill()
  dataArray.map((item, index) => {
    dataSource.push({
      name: "name" + index,
      age: index,
      address: "123",
      key: index
    })
  })
  return <Table
    columns={columns}
    title="标题"
    headerRight={<Button size='small'>right</Button>}
    dataSource={dataSource}
    resizable={false}
  />
}


function WideTable() {

  let dataArray = new Array(10), dataSource = [];
  dataArray = dataArray.fill()
  dataArray.map((item, index) => {
    dataSource.push({
      name: "namenamenamenamenamenamenamename" + index,
      age: index,
      address: "123",
      key: index,
      address2: 'address' + index
    })
  })

  const [data, setdata] = useState(dataSource)


  const [columns, setcolumns] = useState([
    {
      title: '姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名',
      dataIndex: 'name',

      key: 'name',
      width: 150,
    },
    {
      title: '年龄年龄年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址住址住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '姓名姓名姓名',
      dataIndex: 'name1',
      editConfig: {
        fieldType: "input",
      },
      key: 'name1',
    },
    {
      title: '年龄年龄年龄',
      dataIndex: 'age1',
      key: 'age1',
    },
    {
      title: '住址住址住址',
      dataIndex: 'address1',
      editConfig: {
        fieldType: "textarea",
      },
      key: 'address1',
    },
    {
      title: '姓名姓名姓名',
      dataIndex: 'name2',
      editConfig: {
        fieldType: "input",
      },
      key: 'name2',
    },
    {
      title: '年龄年龄年龄',
      dataIndex: 'age2',
      key: 'age2',
      width: 200,
      fixed: 'right'
    },
    {
      title: '住址住址住址',
      dataIndex: 'address2',
      editConfig: {
        fieldType: "textarea",
      },
      key: 'address2',
      width: 200,
      fixed: 'right'
    },
  ])
  const tollgleFixed = useCallback(
    () => {
      setcolumns(cols => {
        const { fixed } = cols[0]
        cols[0].fixed = fixed === 'left' ? undefined : 'left'
        return cols.slice(0)
      })
    },
    [],
  )
  return <Table
    wrap
    columns={columns}
    dataSource={data}
    hideVisibleMenu
    onDragEnd={setdata}
    headerRight={(
      <>
        <Button onClick={tollgleFixed}>切换固定列</Button>
      </>
    )}
    scroll={{ x: 2000, y: 400 }}
  />
}

const TreeTable = () => {
  const [keys, setKeys] = useState();
  const dataSource = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: 3,
      name: '合并单元格',
      children: [
        {
          key: 31,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park',
        },
      ]
    },
  ];

  const renderContent = useCallback(
    (text, record) => {
      const obj = {
        children: text,
        props: {},
      }
      if (record.children) {
        obj.props.colSpan = 0
      }
      return obj
    },
    [],
  )
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      expandColumn: true,
      render: (text, record) => {
        if (record.children) {
          return {
            children: text,
            props: {
              colSpan: 5
            }
          }
        }
        return text
      }
    },
    {
      title: '序号',
      dataIndex: 'g-index',
      render: renderContent
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 120,
      render: renderContent
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
      render: renderContent
    },
    {
      title: 'Address2',
      dataIndex: 'address2',
      width: '30%',
      key: 'address2',
      render: renderContent
    },
  ];
  return <Table
    columns={columns}
    dataSource={dataSource}
    hideVisibleMenu={true}
    isZebra={false}
    tail={list => `当前页有${list.length}条数据`}
    rowSelection={{
      type: 'checkbox',
      selectedRowKeys: keys,
      clickable: false,
      onChange: (keys, rows) => {
        setKeys(keys)
      },
    }}
  />
}


function PaginationTable(props) {

  const [pagenumber, setpagenumber] = useState(1)
  const [size, setsize] = useState(50)

  const [dataSource, setdataSource] = useState(() => {
    const dataSource = new Array(78).fill().map((item, index) => {
      return {
        name: "name",
        age: index,
        address: "123",
        key: index,
        isDeleted: true
      }
    })
    return dataSource
  })

  const list = useMemo(() => {
    return dataSource.slice((pagenumber - 1) * size, pagenumber * size)
  }, [pagenumber, size])

  const onChange = useCallback(
    (page, size) => {
      setpagenumber(page)
      setsize(size)
    },
    [],
  )

  const [scrollKey, setscrollKey] = useState(null)

  // useEffect(() => {
  // 	setTimeout(() => {
  // 		setscrollKey('30')
  // 	}, 10000)
  // }, [])

  return <Table
    columns={columns}
    withIndex={0}
    dataSource={list}
    scrollKey={scrollKey}
    scroll={{ x: '100%', y: 350 }}
    pagination={{ total: 78, current: pagenumber, pageSize: size, onChange }}
    tail={list => `当前页有${list.length}条数据`}
    footerDirection='row-reverse'
  />
}


function LightTable(props) {
  const getlist = useCallback(
    (length) => {
      const dataSource = new Array(length).fill().map((item, index) => {
        return {
          name: "namenamenamenamenamenamename" + index,
          age: index,
          address: "123",
        }
      })
      return dataSource
    },
    [],
  )
  const [dataSource, setdataSource] = useState(getlist(5))

  const [spacing, setspacing] = useState(10)

  return (
    <>
      <div style={{ width: 200 }}>
        <Slider
          min={4}
          max={20}
          onChange={setspacing}
          value={spacing}
        />
      </div>
      <Table light spacing={spacing} cellPadding='8px 4px' columns={columns} dataSource={dataSource} onDragEnd={setdataSource} pagination={false} />
    </>
  )
}

function EmptyTable(props) {

  return <Table columns={columns} dataSource={[]} scroll={{ x: '100%', y: 350 }} pagination={false} emptyDescription='这个表格是空的' />
}

const config = {
  codes: code.map(V => `import React, { useState, useCallback, useEffect, useMemo } from 'react';\n${V}`),
  useage: (
    `在已有的表格基本功能以后，还有其他以下功能以增强表格在不同场景下的应用
		<h2>主要特性</h2>
		<b>1、可缩放的列</b><br/>
		<b>2、单元格编辑</b><br/>
		<b>3、优化大数据下的滚动</b><br/>

		<h2>其他特性</h2>
		<b>1、滚动加载</b><br/>
		<b>2、拖动排序</b><br/>`
  ),
  children: [
    {
      title: '基本用法',
      describe: '通过columns指定显示的列，通过dataSource显示数据，缩放列的功能默认开启，通过设置resizable来修改配置',
      cmp: BasicTable
    },
    {
      title: '可编辑表格',
      describe: `单元格编辑功能，
      通过editable属性，控制表格可否编辑.
      editActions用于渲染在编辑状态下的额外组件。
      在column数据上添加editConfig表示开启该列的可编辑状态。
      onSave会返回当editable状态修改为EditStatus.SAVE状态时的整个表格数据。
      除了data-cell-g中的组件，如何实现自定义的用于表格编辑的组件请参看NOTES`,
      cmp: EditorTable
    },
    {
      title: '嵌套表头',
      describe: 'table的宽度需要是各列宽度的总和，如果没有设置列宽，将平分table的宽度,table默认600px，如果不太清楚table的布局策略，最好table宽度和所有列都加上宽度',
      cmp: WidthTable
    },
    {
      title: '宽表格',
      describe: '在小屏幕上出现滚动条,设置fixed的列必须设置宽度，试试缩小屏幕。同时，因为有固定列，所以wrap使文本折行的属性不能生效',
      cmp: WideTable
    },
    {
      title: '带标题',
      describe: '标题展示',
      cmp: TitleUse
    },
    {
      title: '树形表格',
      describe: '树形表格,级联选择, 与antd组件相比，多选情况下onSelect第一个参数修改为了数组。datasource中有children属性自动开启树形结构, rowSelection为对象开启选择，增强选择的时候判断是否有子节点并一起选中,clickable: false用于关闭行选功能',
      cmp: TreeTable
    },
    {
      title: '带分页组件的table',
      describe: 'footerDirection=row-reverse控制分页和tail的顺序，延迟5秒滚动第31行数据到视图，再延迟5秒滚动第4行到视图',
      cmp: PaginationTable
    },
    {
      title: 'table明亮模式',
      describe: '设置light,spacing设置行间距,cellPadding设置单元格内边距',
      cmp: () => (
        <div style={{ padding: 10, backgroundColor: 'rgba(230,230,230,.5)' }}>
          <LightTable></LightTable>
        </div>
      )
    },
    {
      title: '无数据Table',
      describe: 'emptyDescription可自定义无数据时的文案',
      cmp: EmptyTable
    },
  ]
};
export default () => <CodeDecorator config={config} />