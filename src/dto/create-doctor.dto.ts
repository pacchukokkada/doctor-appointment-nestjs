import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Prasj' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Kokkada' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'Male' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: '2000-08-04' })
  @IsString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ example: '+919090909090' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'example@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Cardiology' })
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @ApiProperty({ example: '09:00' })
  @IsString()
  @IsNotEmpty()
  shift_start_time: string

  @ApiProperty({ example: '18:00' })
  @IsString()
  @IsNotEmpty()
  shift_end_time: string

  }
  