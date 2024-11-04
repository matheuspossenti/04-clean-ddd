import { left, right, type Either } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFound } from './errors/resource-not-found-error'
import { NotAllowed } from './errors/not-allowed-error'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFound | NotAllowed,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFound())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowed())
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
