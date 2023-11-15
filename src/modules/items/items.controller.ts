import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { User } from '@prisma/client';

@ApiTags('Items')
@Controller('invoice/:invoiceId/items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiBody({ type: CreateItemDto })
  async create(
    @Body() createItemDto: CreateItemDto,
    @CurrentUser() user: User,
    @Param('invoiceId', ParseIntPipe) invoiceId: number,
  ) {
    return await this.itemsService.create(createItemDto, user, invoiceId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Returns the list of all items.' })
  async findAll(
    @Param('invoiceId', ParseIntPipe) invoiceId: number,
    @CurrentUser() user: User,
  ) {
    return await this.itemsService.findAll(invoiceId, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Returns the specified item.' })
  @ApiNotFoundResponse({ description: 'Item not found.' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('invoiceId', ParseIntPipe) invoiceId: number,
    @CurrentUser() user: User,
  ) {
    return await this.itemsService.findOne(id, invoiceId, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Returns the updated item.' })
  @ApiNotFoundResponse({ description: 'Item not found.' })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @ApiBody({ type: UpdateItemDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Param('invoiceId', ParseIntPipe) invoiceId: number,
    @Body() updateItemDto: UpdateItemDto,
    @CurrentUser() user: User,
  ) {
    return await this.itemsService.update(
      id,
      invoiceId,
      user.id,
      updateItemDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiResponse({
    status: 200,
    description: 'Item has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Item not found.' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('invoiceId', ParseIntPipe) invoiceId: number,
    @CurrentUser() user: User,
  ) {
    return await this.itemsService.remove(id, invoiceId, user.id);
  }
}
