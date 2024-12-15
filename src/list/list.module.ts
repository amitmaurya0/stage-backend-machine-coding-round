import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { List, ListSchema } from 'src/models/list.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ListService } from './list.servce';
import { User, UserSchema } from 'src/models/user.schema';
import { MoviesService } from 'src/movies/movies.service';
import { TVShowsService } from 'src/tvshows/tvshows.service';
import { TVShow, TVShowSchema } from 'src/models/tvshow.schema';
import { Movie, MovieSchema } from 'src/models/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]), 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TVShow.name, schema: TVShowSchema }]),  // Register the TVShow model
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),  // Register the TVShow model
  ],
  controllers: [ListController],
  providers: [ListService, MoviesService, TVShowsService],
})
export class ListModule {}
