import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LIST_TYPES, PER_PAGE_LIMIT } from 'src/constants/constants';
import { List, ListDocument } from 'src/models/list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { MoviesService } from 'src/movies/movies.service';
import { TVShowsService } from 'src/tvshows/tvshows.service';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<ListDocument>, 
    @Inject(MoviesService)
    private readonly movieService: MoviesService,
    @Inject(TVShowsService)
    private readonly tvShowService: TVShowsService,
  
  ) {}

  async addToList(createListDto: CreateListDto): Promise<List> {
    const createdList = new this.listModel(createListDto);
    return createdList.save();
  }

  async removeFromList(id: string) {
    return this.listModel.deleteOne({ movieOrShowId: id }).exec();
  }

  async listMyItems(userId, page){
    const offset = page*PER_PAGE_LIMIT;
    const myLists = await this.listModel.find({ userId }).skip(offset).limit(PER_PAGE_LIMIT).exec();
    const moviesIds = [];
    const showIds = [];

    myLists.forEach((movie) => {
      if(movie.type === LIST_TYPES.MOVIES) {
        moviesIds.push(movie.movieOrShowId);
      } else {
        showIds.push(movie.movieOrShowId);
      }
    })
    const allShows = await this.tvShowService.findByIds(showIds);
    const movies = await this.movieService.findByIds(moviesIds);
  
    return {
      tvShows: allShows,
      movies
    }
  }

  async checkExists(userId: string, movieOrShowId: string): Promise<boolean> {
    const existingItem = await this.listModel.findOne({ userId, movieOrShowId }).exec();
    return !!existingItem;
  }

  async checkUniqueEntry(userId: string, movieOrShowId: string): Promise<boolean> {
    const existingItem = await this.listModel.findOne({ userId, movieOrShowId }).exec();
    return !existingItem;
  }

}
