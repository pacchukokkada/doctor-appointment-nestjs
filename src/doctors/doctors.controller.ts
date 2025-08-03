import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';
import { successResponse } from 'src/common/utils/response.util';

@Controller('doctors')
export class DoctorsController {
    constructor(private doctorsService: DoctorsService) {}

    @Get()
    async getAllDoctors() {
        const doctors = await this.doctorsService.findAll();
        return successResponse(doctors, 'Doctors record fetched');
    }
    @Get(':id')
    async getDoctor(@Param( 'id', ParseIntPipe) id: number) {
        const doctor = await this.doctorsService.findOne(id);
        return successResponse(doctor, 'Doctor record found');
    }

    @Post()
    async addDoctor(@Body() createDoctorDto: CreateDoctorDto) {
        const doctor = await this.doctorsService.create(createDoctorDto);
        return successResponse(doctor, 'Doctor details added successfully');
    };
    
    @Put(':id')
    async updateDoctor(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateDoctorDto: UpdateDoctorDto) {
            const doctor = await this.doctorsService.update(id, updateDoctorDto);
            return successResponse(doctor, 'Doctor details updated successfully');
        }
    
    @Delete(':id')
    async removeDoctor(@Param('id', ParseIntPipe) id: number) {
        await this.doctorsService.remove(id);
        return successResponse({id}, 'Doctor details removed successfully');
    }
}
