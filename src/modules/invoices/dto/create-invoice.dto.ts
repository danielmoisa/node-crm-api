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
  @MaxLength(255)
  number!: number;

  @IsInt()
  @MaxLength(255)
  year!: number;

  @IsDateString()
  date!: Date;

  @IsDateString()
  expiredDate!: Date;

  @IsInt()
  @MaxLength(255)
  taxRate!: number;

  @IsInt()
  @MaxLength(255)
  subTotal!: number;

  @IsInt()
  @MaxLength(255)
  total!: number;

  @IsInt()
  @MaxLength(255)
  credit!: number;

  @IsInt()
  @MaxLength(255)
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
  @MaxLength(255)
  removed = false;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus = PaymentStatus.UNPAID;

  @IsEnum(InvoiceStatus)
  status: InvoiceStatus = InvoiceStatus.DRAFT;
}
