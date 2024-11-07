import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAttachmentsAnswerRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAttachmentsAnswerRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAttachmentsAnswerRepository,
    )
  })

  it('should send a notification when an answer is created', async () => {
    const onAnswerCreated = new OnAnswerCreated()

    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)
  })
})
