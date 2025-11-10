import { Injectable } from '@nestjs/common';
import { CreateInventoryDto, UpdateInventoryDto } from '../dto/inventory.dto';
import { InjectModel } from '@nestjs/sequelize';
import { InventoryModel } from './inventory.model';
import { randomUUID } from 'crypto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryModel)
    private inventoryModel: typeof InventoryModel,
  ) {}

  getAll(user_id: string) {
    return this.inventoryModel.findAll({
      where: {
        user_id,
      },
    });
  }

  create(payload: CreateInventoryDto) {
    const data = { ...payload, id: randomUUID() } as InventoryModel;
    return this.inventoryModel.create(data);
  }

  update(id: string, payload: UpdateInventoryDto) {
    return this.inventoryModel.update(payload, {
      where: { id },
      returning: true,
    });
  }

  destroy(id: string) {
    return this.inventoryModel.destroy({ where: { id } });
  }
}
