import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from './country.model';

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country.name) private countryModel: Model<Country>) {}

  async create(country: Country): Promise<Country> {
    const createdCountry = new this.countryModel(country);
    return createdCountry.save();
  }

  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async findById(id: string): Promise<Country> {
    return this.countryModel.findById(id).exec();
  }

  async findByShortcode(shortcode: string): Promise<Country> {
    return this.countryModel.findOne({ shortcode }).exec();
  }

  async update(id: string, country: Country): Promise<Country> {
    return this.countryModel.findByIdAndUpdate(id, country, { new: true }).exec();
  }

  async delete(id: string): Promise<Country> {
    return this.countryModel.findByIdAndDelete(id).exec();
  }

  async deleteMany(shortcodes: string[]): Promise<any> {
    return this.countryModel.deleteMany({ shortcode: { $in: shortcodes } }).exec();
  }

  async searchByName(name: string): Promise<Country[]> {
    const regex = new RegExp(name, 'i');
    return this.countryModel.find({ name: regex }).exec();
  }

// async searchByName(name: string): Promise<Country[]> {
//     return this.countryModel.find({ name: { $regex: name, $options: 'i' } }).exec();
//   }

  async deleteManyByShortcode(shortcodes: string[]): Promise<void> {
    await this.countryModel.deleteMany({ shortcode: { $in: shortcodes } }).exec();
  }

  async searchByKeyword(keyword: string): Promise<Country[]> {
    return this.countryModel.find({ $or: [{ name: { $regex: keyword, $options: 'i' } }, { shortcode: { $regex: keyword, $options: 'i' } }] }).exec();
  }
}