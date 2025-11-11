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
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from '../dto/inventory.dto';
import { type AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @Get()
  getAll(@Request() request: AuthenticatedRequest) {
    const user_id = request.user?.id;
    if (!user_id) throw new UnauthorizedException();
    return this.inventoryService.getAll(user_id);
  }

  @Post()
  create(
    @Body(new ValidationPipe()) payload: Omit<CreateInventoryDto, 'user_id'>,
    @Request() request: AuthenticatedRequest,
  ) {
    const user_id = request.user?.id;
    if (!user_id) throw new UnauthorizedException();
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
    if (item.get().user_id !== request.user?.id)
      throw new ForbiddenException(`You do not own this resource.`);

    const update = await this.inventoryService.update(id, payload);
    return update[1][0];
  }

  @Delete(`:id`)
  async destroy(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequest,
  ) {
    const _item = await this.inventoryService.getById(id);
    if (!_item) throw new NotFoundException();
    const inventoryItem = _item?.get();
    if (inventoryItem.user_id !== request.user?.id)
      throw new ForbiddenException(
        `You do not own this resource.`,
      );
    return this.inventoryService.destroy(id);
  }
}
