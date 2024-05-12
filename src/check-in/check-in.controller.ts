import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { UpdateCheckInDto } from './dto/update-check-in.dto';
import { CheckIn } from './entities/check-in.entity';

@Controller('check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post('/create-check-in')
  async createCheckIn(@Body() createCheckInDto: CreateCheckInDto) {
    createCheckInDto.entry_date = new Date();
    return this.checkInService.createCheckIn(createCheckInDto);
  }

  @Get('/find-all-by-date')
  findAllByDate() {
    return this.checkInService.findAllByDate();
  }

  @Get('/findByDateRange')
  async findAllByDateRange(
    @Query('startDate') startDateStr: string,
    @Query('endDate') endDateStr: string
  ): Promise<CheckIn[]> {
    console.log('esto ingresa ', startDateStr, endDateStr);
  
    // Convert the date strings to Date objects
    const [startDay, startMonth, startYear] = startDateStr.split('/').map(Number);
    const startDateObj = new Date(startYear, startMonth - 1, startDay);
  
    const [endDay, endMonth, endYear] = endDateStr.split('/').map(Number);
    const endDateObj = new Date(endYear, endMonth - 1, endDay);
  
    // Convert Date objects to ISO strings after converting to UTC
    const isoStartDate = startDateObj.toISOString();
    const isoEndDate = endDateObj.toISOString();
  
    // Call the service to find check-ins within the date range
    return this.checkInService.findAllByDateRange(isoStartDate, isoEndDate);
  }
  
  
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckInDto: UpdateCheckInDto) {
    return this.checkInService.update(+id, updateCheckInDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkInService.remove(+id);
  }
}
