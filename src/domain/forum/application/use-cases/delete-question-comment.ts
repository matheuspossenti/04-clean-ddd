import { left, right, type Either } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { NotAllowed } from './errors/not-allowed-error'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFound | NotAllowed,
  {}
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFound())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowed())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right({})
  }
}
