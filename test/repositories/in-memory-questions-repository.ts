import type { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'
import type { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findBySlug(slug: Slug) {
    const question = this.items.find((item) => item.slug === slug)

    console.log(question?.slug)
    console.log(question?.slug.value)
    console.log(slug)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }
}
