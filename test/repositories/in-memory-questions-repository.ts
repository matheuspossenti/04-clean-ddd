import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: Slug) {
    const question = this.items.find((item) => item.slug === slug)

    if (!question) {
      return null
    }

    return question
  }

  async save(question: Question) {
    const itemIdex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIdex] = question
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(question: Question) {
    const itemIdex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIdex, 1)
  }
}
