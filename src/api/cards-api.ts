import { instanceLocal } from './instance-api'

export const cardsApi = {
  getCards(params: CardsParamsType) {
    return instanceLocal.get<CardResponse>('cards/card', { params })
  },
  createCard(cardPayload: PostCardsType) {
    return instanceLocal.post<CardResponse>('cards/card', cardPayload)
  },
  deleteCard(cardId: string) {
    return instanceLocal.delete<CardResponse>(`cards/card?id=${cardId}`)
  },
  updateCard(cardPayload: UpdateCardType) {
    return instanceLocal.put('cards/card', cardPayload)
  },
}

export type CardsParamsType = {
  cardAnswer: string
  cardQuestion: string
  cardsPack_id: string
  mim: number
  max: number
  sortCards: string
  page: number
  pageCount: number
}

export type CardResponse = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type PostCardsType = {
  card: {
    cardsPack_id: string
    question: string
    answer: string
    grade: number
    shots: number
    answerImg: string
    questionImg: string
    questionVideo: string
    answerVideo: string
  }
}

export type UpdateCardType = {
  card: {
    _id: string
    quesiton: string
    comments: string
  }
}
