import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class BookAppointmentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Monappa' })
    patient_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '2025-08-04' })
    date: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '10:30' })
    start_time: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '11:00' })
    end_time: string;
  }
  