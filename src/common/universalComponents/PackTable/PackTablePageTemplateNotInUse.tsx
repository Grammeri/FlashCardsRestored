import * as React from 'react'
import { useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SchoolIcon from '@mui/icons-material/School'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import {
  createNewPackTC,
  deletePackTC,
  myPacksAC,
  Order,
  searchPacksAC,
  setAscDesAC,
  setPackTC,
  setPageAC,
  setRowsPerPageAC,
  updatePackTC,
} from '../../../reducers/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/Hooks'
import RangeSlider from '../../Slider'

interface Data {
  cardsCount: number
  user_name: string
  updated: number
  name: string
  actions: string
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])

    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'cardsCount',
    numeric: true,
    disablePadding: false,
    label: 'Cards',
  },
  {
    id: 'updated',
    numeric: true,
    disablePadding: false,
    label: 'Last Updated',
  },
  {
    id: 'user_name',
    numeric: true,
    disablePadding: false,
    label: 'Created by',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
]

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, onRequestSort, orderBy } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow></TableRow>
      <TableRow>
        <TableCell></TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function PackTableBody() {
  const [dense, setDense] = React.useState(false)
  const dispatch = useAppDispatch()

  const { queryParams, cardPacksTotalCount, cardPacks, orderBy, sortOrder } = useAppSelector(
    state => state.pack
  )
  const { _id } = useAppSelector(state => state.auth.userData)

  const { page, packName, pageCount, user_id } = queryParams

  const debouncedValue = useDebounce<string>(packName, 400)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && sortOrder === 'asc'
    const order = isAsc ? 'desc' : 'asc'

    dispatch(setAscDesAC(property, order))
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPageAC(newPage + 1))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setRowsPerPage(parseInt(event.target.value, 10))
    //setPage(0)
    dispatch(setRowsPerPageAC(Number(event.target.value)))
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  useEffect(() => {
    dispatch(setPackTC())
  }, [page, pageCount, orderBy, sortOrder, debouncedValue, user_id])

  const updatePackTitle = (id: string, name: string) => {
    dispatch(updatePackTC(id, name))
  }

  const createNewPack = () => {
    const cardsPack = {
      name: 'I am your new pack',
      deckCover: '',
      private: false,
    }

    dispatch(createNewPackTC({ cardsPack }))
  }

  const deletePack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchPacksAC(event.currentTarget.value))
  }

  const myPackHandler = () => {
    dispatch(myPacksAC(_id))
  }
  const allPacks = () => {
    dispatch(myPacksAC(''))
  }

  const filterOffHandler = () => {
    dispatch(setPackTC())
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'bottom',
          justifyContent: 'space-between',
        }}
      >
        <input
          /* value={packName}*/
          type={'text'}
          onChange={searchHandler}
          placeholder={"Search, don't be shy!"}
          style={{
            width: '30%',
            borderRadius: '10px',
            backgroundColor: 'lightblue',
            color: 'white',
          }}
        />
        <Button
          onClick={myPackHandler}
          variant="outlined"
          style={{ color: 'steelblue', backgroundColor: 'lightblue' }}
        >
          My Packs
        </Button>
        <Button
          size={'small'}
          onClick={allPacks}
          variant="contained"
          style={{
            background: 'lightblue',
            color: 'steelblue',
            marginRight: '20px',
          }}
        >
          All Packs
        </Button>
        <RangeSlider />
        <FilterAltOffIcon fontSize={'large'} onClick={filterOffHandler} />
      </div>

      <button
        onClick={createNewPack}
        style={{
          width: '100%',
          height: '30px',
          color: 'steelblue',
          border: '3px solid steelblue',
          borderRadius: '10px',
          backgroundColor: 'lightblue',
        }}
      >
        Click Me to Create a New Pack
      </button>

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
              <TableBody>
                {cardPacks.map(row => {
                  return (
                    <TableRow tabIndex={0} key={row._id}>
                      <TableCell></TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.cardsCount}</TableCell>
                      <TableCell align="right">
                        {new Date(row.updated).toLocaleDateString('ru-RU')}
                      </TableCell>
                      <TableCell align="right">{row.user_name}</TableCell>
                      <TableCell align="right" padding="normal">
                        <SchoolIcon style={{ color: 'steelblue', marginRight: '10px' }} />
                        <ModeEditIcon
                          style={{ color: 'steelblue', marginRight: '10px' }}
                          onClick={() => {
                            updatePackTitle(row._id, 'You changed my name')
                          }}
                        />
                        <DeleteIcon
                          style={{ color: 'steelblue' }}
                          onClick={() => {
                            deletePack(row._id)
                          }}
                        />
                        {row.actions}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
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
