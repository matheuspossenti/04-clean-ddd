import { left, right, type Either } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowed } from './errors/not-allowed-error'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFound | NotAllowed, {}>

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFound())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowed())
    }
    await this.answerRepository.delete(answer)

    return right({})
  }
}
