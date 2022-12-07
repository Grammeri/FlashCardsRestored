import React, { useEffect } from 'react'

import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { useDebounce } from 'usehooks-ts'

import { cardsApi } from '../api/cards-api'
import { PackTableBody } from '../common/universalComponents/PackTable/PackTableBody'
import { PackTableControlPanel } from '../common/universalComponents/PackTable/PackTableControlPanel'
import { EnhancedTableHead } from '../common/universalComponents/PackTable/PackTableHeader'
import {
  searchPacksAC,
  setAscDesAC,
  setPackTC,
  setPageAC,
  setRowsPerPageAC,
} from '../reducers/pack-reducer'
import { useAppDispatch, useAppSelector } from '../store/hooks/Hooks'

export interface Data {
  cardsCount: number
  user_name: string
  updated: number
  name: string
  actions: string
}

export const PackTablePage = () => {
  const [dense, setDense] = React.useState(false)
  const dispatch = useAppDispatch()

  const { queryParams, cardPacksTotalCount, cardPacks, orderBy, sortOrder } = useAppSelector(
    state => state.pack
  )

  const { page, packName, pageCount, user_id } = queryParams

  const debouncedValue = useDebounce<string>(packName, 400)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && sortOrder === 'asc'
    const order = isAsc ? 'desc' : 'asc'

    dispatch(setAscDesAC(property, order))
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('new Page ', newPage)
    dispatch(setPageAC(newPage + 1))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPageAC(Number(event.target.value)))
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  useEffect(() => {
    dispatch(setPackTC())
  }, [page, pageCount, orderBy, sortOrder, debouncedValue, user_id])

  if (debouncedValue && !cardPacks.length) {
    return (
      <>
        <button
          style={{ height: '30px' }}
          onClick={() => {
            dispatch(searchPacksAC(''))
          }}
        >
          There are no cards with this name. Click me if you want to get back to packs
        </button>
      </>
    )
  }

  return (
    <div>
      <PackTableControlPanel />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={sortOrder}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={cardPacksTotalCount}
              />
              <PackTableBody cardPacks={cardPacks} />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 50]}
            component="div"
            count={cardPacksTotalCount}
            rowsPerPage={pageCount}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </div>
  )
}
