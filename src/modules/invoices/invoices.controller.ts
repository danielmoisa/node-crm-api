import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiResponse, ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { User } from '@prisma/client';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiResponse({
    status: 201,
    description: 'The invoice has been successfully created.',
  })
  @ApiBody({ type: CreateInvoiceDto })
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @CurrentUser() user: User,
  ) {
    return this.invoicesService.create(createInvoiceDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all invoices for the current user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the list of invoices for the current user.',
  })
  async findAll(@CurrentUser() user: User) {
    return this.invoicesService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get details of a specific invoice' })
  @ApiResponse({
    status: 200,
    description: 'Returns the details of the specified invoice.',
  })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.invoicesService.findOne(Number(id), user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update details of a specific invoice' })
  @ApiResponse({
    status: 200,
    description: 'The invoice has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @CurrentUser() user,
  ) {
    return this.invoicesService.update(Number(id), updateInvoiceDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a specific invoice' })
  @ApiResponse({
    status: 200,
    description: 'The invoice has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.invoicesService.remove(Number(id), user);
  }
}
