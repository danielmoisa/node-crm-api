/*
  Warnings:

  - Added the required column `date` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID', 'PARTIALLY');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PENDING');

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "credit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "expiredDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
ADD COLUMN     "pdfPath" TEXT,
ADD COLUMN     "removed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "subTotal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "taxRate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" INTEGER NOT NULL,
    "removed" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER,
    "invoiceId" INTEGER,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" INTEGER NOT NULL,
    "removed" BOOLEAN NOT NULL DEFAULT false,
    "number" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ref" TEXT,
    "description" TEXT,
    "invoiceItemId" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceItemId_fkey" FOREIGN KEY ("invoiceItemId") REFERENCES "InvoiceItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
