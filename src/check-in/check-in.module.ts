import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInController } from './check-in.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckInSchema } from './entities/check-in.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'CheckIn', schema: CheckInSchema }])],
  controllers: [CheckInController],
  providers: [CheckInService],
})
export class CheckInModule {}
