import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: Slug): Promise<Question | null>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
