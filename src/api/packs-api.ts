import { instanceLocal } from './instance-api'

export const packsAPI = {
  getPacks(params: ParamsType) {
    return instanceLocal.get<PackResponse>('/cards/pack', { params })
  },
  createNewPack(payload: CreateNewPackType) {
    return instanceLocal.post<PackType>('cards/pack', payload)
  },
  deletePack(packId: string) {
    return instanceLocal.delete<PackType[]>(`cards/pack?id=${packId}`)
  },
  updatePack(_id: string, name: string) {
    return instanceLocal.put<PackType>('cards/pack', {
      cardsPack: {
        _id,
        name,
      },
    })
  },
}

export type ParamsType = {
  packName: string
  min: number
  max: number
  sortPacks: string
  page: number
  pageCount: number
  user_id: string
  block: boolean
}

export type PackResponse = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: ''
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover: string
  actions: string
}

export type CreateNewPackType = {
  cardsPack: {
    name: string
    deckCover?: string
    private: boolean
  }
}

/*export type UpdatePackType = {
  cardsPack: {
    _id: string
    name: string
  }
}*/
