import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListService } from './list.servce';
import { CreateListDto } from './dto/create-list.dto';
import { LIST_TYPES, PER_PAGE_LIMIT } from 'src/constants/constants';

@ApiTags('Lists')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async getList(
    @Query('page') page: number = 1,
    @Headers('userId') userId: string
  ) {
    const items = await this.listService.listMyItems(userId, page);
    return { success: true, message: 'Items fetched successfully', data: items };
  }

  @Post()
  async create(
    @Body() createListDto: { type: string, movieOrShowId: string },
    @Headers('userId') userId: string 
) {
    const sendData: CreateListDto = {
        userId: userId,
        type: createListDto.type,
        movieOrShowId: createListDto.movieOrShowId
    }
    if(![LIST_TYPES.MOVIES, LIST_TYPES.TVSHOW].includes(createListDto.type)){
        throw new HttpException('Please provide proper show type.', HttpStatus.CONFLICT);
    }
    const isUnique = await this.listService.checkUniqueEntry(userId, createListDto.movieOrShowId);
    if (!isUnique) {
      throw new HttpException('Item already exists in the list for this user', HttpStatus.CONFLICT);
    }
    const newItem = await this.listService.addToList(sendData);
    return { success: true, message: 'Item added successfully', data: newItem };
  }

  @Delete(':movieOrShowId')
  async removeItem(
    @Param('movieOrShowId') id: string,
    @Headers('userId') userId: string 
) {
    const exists = await this.listService.checkExists(userId, id);
    if (!exists) {
      throw new HttpException('Item not found in the list', HttpStatus.NOT_FOUND);
    }
    await this.listService.removeFromList(id);
    return { success: true, message: 'Item removed successfully' };
  }
}

