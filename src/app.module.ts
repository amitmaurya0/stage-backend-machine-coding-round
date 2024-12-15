import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { TvshowsModule } from './tvshows/tvshows.module';
import { ListModule } from './list/list.module';
import { SeedService } from './seed/seed.service';
import { UserModule } from './user/user.module';
import { User, UserSchema } from './models/user.schema';
import { TVShow, TVShowSchema } from './models/tvshow.schema';
import { Movie, MovieSchema } from './models/movie.schema';
import { List, ListSchema } from './models/list.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/stagedb'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: TVShow.name, schema: TVShowSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: List.name, schema: ListSchema },
    ]),
    UserModule,
    MoviesModule,
    TvshowsModule,
    ListModule,
  ],
  providers:[
    // SeedService
  ]
})
export class AppModule {}
