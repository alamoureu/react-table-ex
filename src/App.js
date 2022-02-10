import React from "react";
import styled from 'styled-components'
import { useTable, useBlockLayout, useResizeColumns, useSortBy } from 'react-table'
import jsonData from "./data/data.json";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Divider
} from '@chakra-ui/react'

import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'


const Styles = styled.div`
  padding: 1rem;

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      .resizer {
        display: inline-block;
        background: gray;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
      }
    }
  }
`


function CTable({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 300,
    }),
    []
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useSortBy,
    useBlockLayout,
    useResizeColumns
  )

  // Render the UI for your table
  return (
    <Box>
    <Box justifyContent='center'>
    <Table {...getTableProps()} variant='simple' size={'lg'}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
             <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render('Header')}
              {/* S'occupe du resizing */}
              <div {...column.getResizerProps()} className={`resizer ${ column.isResizing ? 'isResizing' : '' }`}/>
              {/* Add a sort direction indicator */}
              <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <ArrowDownIcon ml={'2'} mb={'1'}/>
                        : <ArrowUpIcon ml={'2'} mb={'1'}/>
                      : ''}
                  </span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return<><Td {...cell.getCellProps()}>{cell.render("Cell")}</Td></> ;
              })}
             
            </Tr>
            
          );
        })}
      </Tbody>
    </Table>
    </Box>
    </Box>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Phone",
            accessor: "phone"
          },
          {
            Header: "Email",
            accessor: "email"
          },
          {
            Header: "Region",
            accessor: "region"
          },
          {
            Header: "Address",
            accessor: "address"
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(() => jsonData, []);

  return (
    <Styles>
      <CTable columns={columns} data={data} />
    </Styles>

  );
}

export default App;
