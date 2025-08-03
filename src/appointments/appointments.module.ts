import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/entity/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [],
  providers: [AppointmentsService]
})
export class AppointmentsModule {}
