import { left, right, type Either } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFound } from './errors/resource-not-found-error'
import { NotAllowed } from './errors/not-allowed-error'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFound | NotAllowed,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFound())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowed())
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
