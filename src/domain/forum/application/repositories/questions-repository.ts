import type { Question } from '../../enterprise/entities/question'
import type { Slug } from '../../enterprise/entities/value-objects/slug'

export interface QuestionsRepository {
  findBySlug(slug: Slug): Promise<Question | null>
  create(question: Question): Promise<void>
}
