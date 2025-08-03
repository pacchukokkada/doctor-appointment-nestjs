import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto {
    @ApiProperty({ example: 'Prash' })
    @IsString()
    first_name?: string;

    @ApiProperty({ example: 'Kokkada' })
    @IsString()
    last_name?: string;

    @ApiProperty({ example: 'Male' })
    @IsString()
    gender?: string;

    @ApiProperty({ example: '2000-08-04' })
    @IsString()
    dob?: string;

    @ApiProperty({ example: '+919090909090' })
    @IsString()
    phone?: string;

    @ApiProperty({ example: 'example@mail.com' })
    @IsEmail()
    email?: string;

    @ApiProperty({ example: 'Cardiology' })
    @IsString()
    specialty: string;

    @ApiProperty({ example: '09:00' })
    @IsString()
    shift_start_time: string

    @ApiProperty({ example: '18:00' })
    @IsString()
    shift_end_time: string
}
  