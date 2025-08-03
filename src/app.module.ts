import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Doctor}  from './entity/doctors.entity';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './entity/appointment.entity';
import { ApiKeyGuard } from './common/guards/api-key.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    DoctorsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Doctor, Appointment],
      synchronize: true,
    }),
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApiKeyGuard],
})
export class AppModule {}
