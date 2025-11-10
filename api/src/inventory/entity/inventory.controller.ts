import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from '../dto/inventory.dto';
import { type AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';

// todo: get from request/session
const user_id = 'f146b53c-1606-468e-b990-85484c14c3dc';

@UseGuards(AuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @Get()
  getAll() {
    return this.inventoryService.getAll(user_id);
  }

  @Post()
  create(
    @Body(new ValidationPipe()) payload: Omit<CreateInventoryDto, 'user_id'>,
  ) {
    return this.inventoryService.create({ ...payload, user_id });
  }

  @Put(`:id`)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) payload: UpdateInventoryDto,
    @Request() request: AuthenticatedRequest,
  ) {
    const item = await this.inventoryService.getById(id);
    if (!item) throw new NotFoundException();
    if (item.get().user_id !== request.user?.id) throw new ForbiddenException();

    const update = await this.inventoryService.update(id, payload);
    return update[1];
  }

  @Delete(`:id`)
  async destroy(@Param() id: string, @Request() request: AuthenticatedRequest) {
    const inventoryItem = await this.inventoryService.getById(id);
    if (!inventoryItem) throw new NotFoundException();
    if (inventoryItem?.user_id !== request.user?.id)
      throw new ForbiddenException();
    return this.inventoryService.destroy(id);
  }
}
