import { Injectable, NotFoundException } from '@nestjs/common';
import { Doctor } from 'src/entity/doctors.entity';
import { Repository, ReturnDocument } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from 'src/dto/create-doctor.dto';
import { UpdateDoctorDto } from 'src/dto/update-doctor.dto';


@Injectable()
export class DoctorsService {
    constructor(
        @InjectRepository(Doctor)
        private doctorsRepository: Repository<Doctor>,
    ){}

    findAll(): Promise<Doctor[]> {
        return this.doctorsRepository.find();
    }

    async findOne(id: number): Promise<Doctor> {
        const doctor = await this.doctorsRepository.findOne({where: {id}});
        if (!doctor) {
            throw new NotFoundException('Doctor Not Found');
        }
        return doctor;
    }

    async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
        const doctor = this.doctorsRepository.create(createDoctorDto);
        return this.doctorsRepository.save(doctor);
    }

    async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
        const doctor = await this.doctorsRepository.findOne({where: {id}});
        if (!doctor) {
            throw new NotFoundException('Doctor Not Found');
        }
        Object.assign(doctor, updateDoctorDto);
        return this.doctorsRepository.save(doctor);
    }

    async remove(id: number): Promise<void> {
        const result = await this.doctorsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Doctor Not found');
        }
    }
 }
