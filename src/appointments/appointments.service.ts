import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookAppointmentDto } from 'src/dto/book-appointment.dto';
import { Appointment } from 'src/entity/appointment.entity';
import { Doctor } from 'src/entity/doctors.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AppointmentsService {
    constructor(@InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
    ) {}

    generateSlots(startTime: string, endTime: string, duration: number): string[][] {
        // duration in minutes, startTime/endTime like "10:00"
        const slots: string[][] = [];
        let [startHour, startMinute] = startTime.split(':').map(Number);
        let [endHour, endMinute] = endTime.split(':').map(Number);
    
        let current = new Date(0, 0, 0, startHour, startMinute);
        const end = new Date(0, 0, 0, endHour, endMinute);
    
        while (current < end) {
          const slotStart = current.toTimeString().slice(0, 5);
          current.setMinutes(current.getMinutes() + duration);
          const slotEnd = current.toTimeString().slice(0, 5);
          slots.push([slotStart, slotEnd]);
        }
        return slots;
      }
    async getAvailableSlots(doctorId: number, date: string, start_time: string, end_time: string) {
        // Define your doctor's working hours and slot size
        const slotDuration = Number(process.env.SLOT_DURATION_MIN) || 30;
        const slots = this.generateSlots(start_time, end_time, slotDuration);
        // Find booked slots for this doctor and date
        const appointments = await this.appointmentRepository.find({
          where: { doctor: { id: doctorId }, date }
        });
        const booked = new Set(
          appointments.map(a => `${a.start_time}-${a.end_time}`)
        );
        // Return only the slots not booked
        return slots.filter(([start, end]) => !booked.has(`${start}-${end}`));
    }

    async bookAppointment(bookAppointDto: BookAppointmentDto, doctor_id: number) {
        // Check if this slot already has an appointment or overlapping.
        const {date, start_time, end_time, patient_name} = bookAppointDto;
        const definedSlotDuration = Number(process.env.SLOT_DURATION_MIN);
        const requestedSlotDuration = calculateDuration(start_time, end_time);
        if (requestedSlotDuration > definedSlotDuration) {
            throw new BadRequestException(`Appointment duration must be exactly ${definedSlotDuration} minutes.`)
        }
        const isOverlapping = await this.appointmentRepository
        .createQueryBuilder('appointment')
        .where('appointment.doctor_id = :doctor_id', { doctor_id })
        .andWhere('appointment.date = :date', { date })
        .andWhere('appointment.start_time < :end_time', { end_time })
        .andWhere('appointment.end_time > :start_time', { start_time })
        .getOne();
    
        if (isOverlapping) {
            throw new BadRequestException('Slot already booked or overlaps with reserved slots');
        }
        const appointment = this.appointmentRepository.create({
          doctor: { id: doctor_id } as Doctor,
          date,
          start_time,
          end_time,
          patient_name,
        });
    
        return this.appointmentRepository.save(appointment);
    }
}


function calculateDuration(start: string, end: string): number {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    return (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
  }