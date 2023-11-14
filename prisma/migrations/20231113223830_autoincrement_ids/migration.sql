-- AlterTable
CREATE SEQUENCE invoice_id_seq;
ALTER TABLE "Invoice" ALTER COLUMN "id" SET DEFAULT nextval('invoice_id_seq');
ALTER SEQUENCE invoice_id_seq OWNED BY "Invoice"."id";

-- AlterTable
CREATE SEQUENCE invoiceitem_id_seq;
ALTER TABLE "InvoiceItem" ALTER COLUMN "id" SET DEFAULT nextval('invoiceitem_id_seq');
ALTER SEQUENCE invoiceitem_id_seq OWNED BY "InvoiceItem"."id";

-- AlterTable
CREATE SEQUENCE payment_id_seq;
ALTER TABLE "Payment" ALTER COLUMN "id" SET DEFAULT nextval('payment_id_seq');
ALTER SEQUENCE payment_id_seq OWNED BY "Payment"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
