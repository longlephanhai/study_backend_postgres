import { Module } from '@nestjs/common';
import { UserTaskProgressService } from './user-task-progress.service';
import { UserTaskProgressController } from './user-task-progress.controller';

@Module({
  controllers: [UserTaskProgressController],
  providers: [UserTaskProgressService],
})
export class UserTaskProgressModule {}
