import { Injectable } from '@nestjs/common';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { UpdateCheckInDto } from './dto/update-check-in.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CheckIn } from './entities/check-in.entity';
import { Model } from 'mongoose';

@Injectable()
export class CheckInService {
  constructor(@InjectModel(CheckIn.name) private readonly checkInModel: Model<CheckIn>) {}

  async createCheckIn(createCheckInDto): Promise<CheckIn> {
    console.log(createCheckInDto);
    const lastCheckIn = await this.checkInModel.findOne({ uid_user: createCheckInDto.uid_user }).sort({ entry_date: -1 });
    // Si hay un check-in anterior, incrementar times_entered en 1
    if (lastCheckIn) {
      createCheckInDto.times_entered = lastCheckIn.times_entered + 1;
    }
    const createdCheckIn = new this.checkInModel(createCheckInDto); // Create a new instance of CheckIn model
    return createdCheckIn.save(); // Save the created check-in and return the promise
  }

  async findAllByDate(): Promise<CheckIn[]> {
    return this.checkInModel.find().sort({ entry_date: -1 }).exec();
  }

  async findAllByDateRange(startDate: string, endDate: string): Promise<CheckIn[]> {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
  
    return this.checkInModel.find({ 
      entry_date: { $gte: startDateTime, $lte: endDateTime } 
    }).exec();
  }
  
  

  async findAllByWeek(): Promise<CheckIn[]> {
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    return this.checkInModel.find({ entry_date: { $gte: lastWeekDate } }).exec();
  }

  async findAllByDay(): Promise<CheckIn[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return this.checkInModel.find({
      entry_date: { $gte: today, $lt: tomorrow }
    }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} checkIn`;
  }

  update(id: number, updateCheckInDto: UpdateCheckInDto) {
    return `This action updates a #${id} checkIn`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkIn`;
  }
}
