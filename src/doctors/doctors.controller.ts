import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';
import { successResponse } from 'src/common/utils/response.util';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { BookAppointmentDto } from 'src/dto/book-appointment.dto';
import { ApiTags, ApiBody, ApiParam, ApiQuery, ApiHeader } from '@nestjs/swagger';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
    constructor(
        private doctorsService: DoctorsService,
        private readonly appointmentService: AppointmentsService
    ) {}

    @Get()
    @ApiQuery({ name: 'page', required: true, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: true, type: Number, example: 10 })
    @ApiHeader({ name: 'x-api-key', description: 'API key for authorization', required: true})      
    async getAllDoctors(
        @Query('page', ParseIntPipe) page = 1,
        @Query('limit', ParseIntPipe) limit = 10,
        ) {
            const paginatedResponse = await this.doctorsService.findAll(page, limit);
            return successResponse(paginatedResponse.data, 'Doctors record fetched',
                {page: paginatedResponse.page, limit: paginatedResponse.limit,
                    totalCount: paginatedResponse.totalCount});
        }   

    @Get(':id')
    @ApiParam({name: 'id', required: true, example: '1'})
    @ApiHeader({ name: 'x-api-key', description: 'API key for authorization', required: true})      
    async getDoctor(@Param( 'id', ParseIntPipe) id: number) {
        const doctor = await this.doctorsService.findOne(id);
        return successResponse(doctor, 'Doctor record found', null);
    }

    @Post()
    @ApiBody({ type: CreateDoctorDto})
    @ApiHeader({ name: 'x-api-key', description: 'API key for authorization', required: true})      
    async addDoctor(@Body() createDoctorDto: CreateDoctorDto) {
        const doctor = await this.doctorsService.create(createDoctorDto);
        return successResponse(doctor, 'Doctor details added successfully', null);
    };
    
    @Put(':id')
    @ApiParam({name: 'id', required: true, example: '1'})
    @ApiBody({type: UpdateDoctorDto})
    @ApiHeader({ name: 'x-api-key', description: 'API key for authorization', required: true})      
    async updateDoctor(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateDoctorDto: UpdateDoctorDto) {
            const doctor = await this.doctorsService.update(id, updateDoctorDto);
            return successResponse(doctor, 'Doctor details updated successfully', null);
        }
    
    @Delete(':id')
    @ApiParam({name: 'id', required: true, example: '1'})
    @ApiHeader({ name: 'x-api-key', description: 'API key for authorization', required: true})      
    async removeDoctor(@Param('id', ParseIntPipe) id: number) {
        await this.doctorsService.remove(id);
        return successResponse({id}, 'Doctor details removed successfully', null);
    }

    @Get(':id/available-slots')
    @ApiParam({name: 'id', required: true, example: '1'})
    @ApiQuery({name: 'date', required: true, example: '2025-08-04'})
    @ApiHeader({ name: 'x-api-key', description: 'API key for authorization', required: true})      
    async getAvailableSlotsOfDoctor(@Param('id', ParseIntPipe) id: number, @Query('date') date: string) {
        const doctor = await this.doctorsService.findOne(id);
        if (!doctor) {
            throw new NotFoundException('Doctor Not Found');
        }
        const {shift_start_time, shift_end_time} = doctor;
        const availableSlots = await this.appointmentService
            .getAvailableSlots(id, date, shift_start_time, shift_end_time);
        return successResponse(availableSlots, 'Available slots fetched', null);
    }

    @Post(':id/appointment')
    @ApiParam({name: 'id', required: true, example: '1'})
    @ApiBody({type: BookAppointmentDto})
    @ApiHeader({ name: 'x-api-key', description: 'API key for authorization', required: true})      
    async bookAnAppointment(
        @Param('id', ParseIntPipe) id: number,
        @Body() bookAppointmentDto: BookAppointmentDto) {
            const doctor = await this.doctorsService.findOne(id);
            if (!doctor) {
                throw new NotFoundException('Doctor Not Found');
            }
            const appointment = await this.appointmentService.bookAppointment(bookAppointmentDto, id);
            return successResponse(appointment, 'Appointment booked successfully', null);
    }
}
