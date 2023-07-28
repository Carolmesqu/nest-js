import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './CriaPedido.dto';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}
