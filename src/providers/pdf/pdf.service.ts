import * as pdf from 'html-pdf';
import * as pug from 'pug';

import { Injectable, RequestTimeoutException } from '@nestjs/common';

import { GENERATE_PDF_ERROR } from '../../errors/errors.constants';
import { Invoice } from '@prisma/client';
import dayjs from 'dayjs';
import fs from 'node:fs';
import { join } from 'path';

type PdfInfo = {
  filename: string;
  format: 'A5' | 'A3' | 'A4' | 'Legal' | 'Letter' | 'Tabloid';
};

type PdfModelName = 'Invoice' | 'Offer' | 'Payment';

@Injectable()
export class PdfService {
  async generatePdf(
    modelName: PdfModelName,
    info: PdfInfo = { filename: 'pdf_file', format: 'A5' },
    invoice: Invoice,
  ) {
    const fileId = info.filename + '-' + invoice.id + '.pdf';
    const folderPath = modelName.toLowerCase();
    const pdfsPath = join(process.cwd(), 'public', 'pdfs');
    const targetLocation = `${pdfsPath}/${folderPath}/${fileId}`;

    // If PDF already exist, then delete it and create new PDF
    if (fs.existsSync(targetLocation)) {
      fs.unlinkSync(targetLocation);
    }
    const viewsPath = join(
      process.cwd(),
      'src',
      'views',
      'pdf',
      modelName + '.pug',
    );

    // Render pdf html
    const html = pug.renderFile(viewsPath, {
      model: invoice,
      moment: dayjs,
    });

    // Create pdf file
    pdf
      .create(html, {
        format: info.format,
        orientation: 'portrait',
        border: '12mm',
      })
      .toFile(targetLocation, function (error) {
        if (error) throw new RequestTimeoutException(GENERATE_PDF_ERROR);
      });
  }
}
