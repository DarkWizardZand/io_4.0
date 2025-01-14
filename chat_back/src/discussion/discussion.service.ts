import { Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Discussion } from './entities/discussion.entity';
import { Model } from 'mongoose';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectModel(Discussion.name)
    private readonly discussionRepository: Model<Discussion>,
  ) {}

  async create(createDiscussionDto: CreateDiscussionDto) {
    const newDisc = await this.discussionRepository.create({
      ...createDiscussionDto,
    });
    console.log({ ...createDiscussionDto });

    newDisc.status = 'Ввод сведений';
    newDisc.type = '';
    newDisc.messagesId = `${createDiscussionDto.customerId}:${createDiscussionDto.providerId}`;
    await newDisc.save();
    return newDisc;
  }

  async findAll() {
    return this.discussionRepository.find();
  }

  async findOne(id: string) {
    return await this.discussionRepository.findById(id);
  }
}
