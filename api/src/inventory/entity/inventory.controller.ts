import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from '../dto/inventory.dto';

// todo: get from request/session
const user_id = 'f146b53c-1606-468e-b990-85484c14c3dc';

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
  ) {
    const update = await this.inventoryService.update(id, payload);
    return update[1];
  }

  @Delete(`:id`)
  destroy(@Param() id: string) {
    return this.inventoryService.destroy(id);
  }
}
