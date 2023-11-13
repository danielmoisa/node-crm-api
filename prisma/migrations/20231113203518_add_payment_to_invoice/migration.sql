/*
  Warnings:

  - You are about to drop the column `invoiceItemId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_invoiceItemId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "invoiceItemId",
ADD COLUMN     "invoiceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
