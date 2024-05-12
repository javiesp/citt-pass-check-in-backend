import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CreateCheckInDto } from './dto/create-check-in.dto';
import { UpdateCheckInDto } from './dto/update-check-in.dto';
import { CheckIn } from './entities/check-in.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post('/create-check-in')
  @MessagePattern('createCheckIn')
  async createCheckIn(@Body() createCheckInDto: CreateCheckInDto) {
    createCheckInDto.entry_date = new Date();
    return this.checkInService.createCheckIn(createCheckInDto);
  }

  @Get('/find-all-check-in')
  @MessagePattern('findAllByDate')
  findAllByDate() {
    return this.checkInService.findAllByDate();
  }

  @Get('/find-by-date-range')
  @MessagePattern('findAllByDateRange')
  async findAllByDateRange(query): Promise<CheckIn[]> { 
  
    // Convertir la cadena de fecha de inicio a objeto Date
    const [startDay, startMonth, startYear] = query.startDateStr.split('/').map(Number);
    const startDateObj = new Date(startYear, startMonth - 1, startDay);
  
    // Convertir la cadena de fecha de fin a objeto Date
    const [endDay, endMonth, endYear] = query.endDateStr.split('/').map(Number);
    const endDateObj = new Date(endYear, endMonth - 1, endDay);
  
    // Obtener la fecha actual
    const currentDate = new Date();
  
    // Convertir Date objects a ISO strings después de convertir a UTC
    const isoStartDate = startDateObj.toISOString();
    const isoEndDate = endDateObj.toISOString();
    
    // Llamar al servicio para encontrar check-ins dentro del rango de fechas
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
