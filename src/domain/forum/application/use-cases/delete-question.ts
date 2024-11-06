import { left, right, type Either } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowed } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFound | NotAllowed, {}>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFound())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowed())
    }
    await this.questionRepository.delete(question)

    return right({})
  }
}
