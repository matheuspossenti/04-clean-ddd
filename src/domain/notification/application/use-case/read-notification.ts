import { right, Either, left } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notification-repository'
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowed } from '@/core/errors/errors/not-allowed-error'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFound | NotAllowed,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFound())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowed())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return right({ notification })
  }
}
