import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { filter } from "rxjs";

export abstract class AbstractRepository<T extends AbstractEntity>{
    protected abstract readonly logger:Logger;
    constructor(public readonly model:Model<T>){}

    async create(document: Omit<T, '_id'>):Promise<T> {
        const createDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return (await createDocument.save()).toJSON() as unknown as T;
    }

    async findOne(filterQuery : FilterQuery<T>): Promise<T> {
        const document = await this.model.findOne(filterQuery,{},{lean:true});

        if(!document) {
            this.logger.warn("Document not found with filterQuery: %0" , filterQuery);
            throw new NotFoundException("Documnet not Found");
        }
        return document as unknown as T;
    }
    
    async findOneAndUpdate(
        filterQuery: FilterQuery<T>,
        update: UpdateQuery<T>
    ): Promise<T> {
        const document = await this.model.findOneAndUpdate(filterQuery,update, {lean: true,new: true},);

        if(!document) {
            this.logger.warn('Documnt not found with filterQuery:%o', filterQuery)
            throw new NotFoundException('Document not FOund')
        }
        return document as unknown as T;
    }
    async find(filterQuery: FilterQuery<T>): Promise<T>{
        const documnet = await this.model.find(filterQuery , {lean: true });

        if(!documnet) {
            this.logger.warn('Document not found with filterQuery:%o', filterQuery, {lean: true});
        }
        return document as unknown as T;
    }

    async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T>{
        const document = await this.model.find(filterQuery,{lean: true});

        if(!document) {
            this.logger.warn('Document not found with filterQuery:%o', filterQuery, {lean:true});
        }
        return document as unknown as T 
    }
}