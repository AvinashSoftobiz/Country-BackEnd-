
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoURI } from './mongo.uri';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI),
    CountryModule,
  ],
})
export class AppModule {}