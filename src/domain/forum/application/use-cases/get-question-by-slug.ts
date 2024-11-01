import type { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import type { Slug } from '../../enterprise/entities/value-objects/slug'

interface GetQuestionBySlugUseCaseRequest {
  slug: Slug
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return { question }
  }
}
