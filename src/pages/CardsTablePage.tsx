import React from 'react'

import {
  CardTableHeader,
  CardTableHeaderProps,
} from '../common/universalComponents/CardTable/CardTableHeader'

export const CardsTablePage = (props: CardTableHeaderProps) => {
  const { order, orderBy, onRequestSort } = props

  return (
    <div>
      <CardTableHeader onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
    </div>
  )
}
