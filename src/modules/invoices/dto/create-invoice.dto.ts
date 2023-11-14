import { InvoiceStatus, PaymentStatus } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsInt()
  number: number;

  @IsInt()
  year: number;

  @IsDateString()
  date: Date;

  @IsDateString()
  expiredDate: Date;

  @IsInt()
  taxRate: number;

  @IsInt()
  subTotal: number;

  @IsInt()
  total: number;

  @IsInt()
  credit: number;

  @IsInt()
  discount: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  pdfPath?: string;

  @IsBoolean()
  @IsOptional()
  removed = false;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus = PaymentStatus.UNPAID;

  @IsEnum(InvoiceStatus)
  status: InvoiceStatus = InvoiceStatus.DRAFT;

  @IsInt()
  userId: number;
}
