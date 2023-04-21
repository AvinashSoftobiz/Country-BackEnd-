import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Country } from './country.model';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async create(@Body() country: Country): Promise<Country> {
    return this.countryService.create(country);
  }

  @Get()
  async findAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.countryService.delete(id);
  }

  @Delete()
  async deleteMany(@Query('shortcodes') shortcodes: string[]): Promise<void> {
    await this.countryService.deleteMany(shortcodes);
  }

  @Patch(':idOrShortcode')
  async update(@Param('idOrShortcode') idOrShortcode: string, @Body() country: Country): Promise<Country> {
    return this.countryService.update(idOrShortcode, country);
  }

  @Get('search')
  async searchByName(@Query('name') name: string): Promise<Country[]> {
    return this.countryService.searchByName(name);
  }

  @Delete('shortcode')
  async deleteManyByShortcode(@Query('shortcodes') shortcodes: string[]): Promise<void> {
    await this.countryService.deleteManyByShortcode(shortcodes);
  }

  @Get('search-all')
  async searchByKeyword(@Query('keyword') keyword: string): Promise<Country[]> {
    return this.countryService.searchByKeyword(keyword);
  }
}
