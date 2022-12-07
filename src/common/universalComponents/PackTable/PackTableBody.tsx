import * as React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SchoolIcon from '@mui/icons-material/School'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import { PackType } from '../../../api/packs-api'
import { deletePackTC, Order, updatePackTC } from '../../../reducers/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/Hooks'

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

type PropsType = {
  cardPacks: PackType[]
}
export const PackTableBody = ({ cardPacks }: PropsType) => {
  const dispatch = useAppDispatch()
  const { _id } = useAppSelector(state => state.auth.userData)

  const updatePackTitle = (id: string, name: string) => {
    dispatch(updatePackTC(id, name))
  }

  const deletePack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  return (
    <TableBody>
      {cardPacks.map(row => {
        return (
          <TableRow tabIndex={0} key={row._id}>
            <TableCell></TableCell>

            <TableCell component="th" scope="row" padding="none">
              <NavLink to={`/cardTable/${row._id}`}>{row.name}</NavLink>
            </TableCell>

            <TableCell align="right">{row.cardsCount}</TableCell>
            <TableCell align="right">{new Date(row.updated).toLocaleDateString('ru-RU')}</TableCell>
            <TableCell align="right">{row.user_name}</TableCell>
            <TableCell align="right" padding="normal">
              <SchoolIcon style={{ color: 'steelblue', marginRight: '10px' }} />
              {_id === row.user_id && (
                <ModeEditIcon
                  style={{ color: 'steelblue', marginRight: '10px' }}
                  onClick={() => {
                    updatePackTitle(row._id, 'You changed my name')
                  }}
                />
              )}
              {_id === row.user_id && (
                <DeleteIcon
                  style={{ color: 'steelblue' }}
                  onClick={() => {
                    deletePack(row._id)
                  }}
                />
              )}
              {row.actions}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}
