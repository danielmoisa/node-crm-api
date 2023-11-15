import { InvoiceStatus, PaymentStatus, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateInvoiceDto implements Prisma.InvoiceCreateInput {
  @IsInt()
  number!: number;

  @IsInt()
  year!: number;

  @IsDateString()
  date!: Date;

  @IsDateString()
  expiredDate!: Date;

  @IsInt()
  taxRate!: number;

  @IsInt()
  subTotal!: number;

  @IsInt()
  total!: number;

  @IsInt()
  credit!: number;

  @IsInt()
  discount!: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  pdfPath?: string;

  @IsBoolean()
  @IsOptional()
  removed = false;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus = PaymentStatus.UNPAID;

  @IsEnum(InvoiceStatus)
  status: InvoiceStatus = InvoiceStatus.DRAFT;
}
