import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabasesModule } from './databases/databases.module';
import { ExamResultModule } from './exam-result/exam-result.module';
import { FilesModule } from './files/files.module';
import { GrammarsModule } from './grammars/grammars.module';
import { Part5MistakesModule } from './part5-mistakes/part5-mistakes.module';
import { PartsModule } from './parts/parts.module';
import { PermissionsModule } from './permissions/permissions.module';
import { QuestionModule } from './question/question.module';
import { RoleModule } from './role/role.module';
import { SpeakingAiModule } from './speaking-ai/speaking-ai.module';
import { TestsModule } from './tests/tests.module';
import { TopicsSpeakingModule } from './topics-speaking/topics-speaking.module';
import { TopicsVocabulariesModule } from './topics-vocabularies/topics-vocabularies.module';
import { UsersModule } from './users/users.module';
import { VocabulariesModule } from './vocabularies/vocabularies.module';
import { WritingModule } from './writing/writing.module';
import { WritingAiModule } from './writing-ai/writing-ai.module';
import { WritingHistoryModule } from './writing-history/writing-history.module';
import { User } from './users/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { Permission } from './permissions/entities/permission.entity';
import { Question } from './question/entities/question.entity';
import { Part } from './parts/entities/part.entity';
import { ExamResult } from './exam-result/entities/exam-result.entity';
import { Grammar } from './grammars/entities/grammar.entity';
import { Part5Mistakes } from './part5-mistakes/entities/part5-mistake.entity';
import { Test } from './tests/entities/test.entity';
import { TopicsSpeaking } from './topics-speaking/entities/topics-speaking.entity';
import { TopicsVocabulary } from './topics-vocabularies/entities/topics-vocabulary.entity';
import { Vocabulary } from './vocabularies/entities/vocabulary.entity';
import { Writing } from './writing/entities/writing.entity';
import { WritingHistory } from './writing-history/entities/writing-history.entity';
import { SurveysModule } from './surveys/surveys.module';
import { Survey } from './surveys/entities/survey.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
          Role,
          Permission,
          Question,
          Part,
          ExamResult,
          Grammar,
          Part5Mistakes,
          Test,
          TopicsSpeaking,
          TopicsVocabulary,
          Vocabulary,
          Writing,
          WritingHistory,
          Survey
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    DatabasesModule,
    ExamResultModule,
    FilesModule,
    GrammarsModule,
    Part5MistakesModule,
    PartsModule,
    PermissionsModule,
    QuestionModule,
    RoleModule,
    SpeakingAiModule,
    TestsModule,
    TopicsSpeakingModule,
    TopicsVocabulariesModule,
    UsersModule,
    VocabulariesModule,
    WritingModule,
    WritingAiModule,
    WritingHistoryModule,
    SurveysModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
