import { Injectable, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';
import { UserService } from '../services/user.service';

@Injectable()
export class BirthdayConsumer implements OnModuleInit {
  private consumer: Consumer;

  constructor(private readonly userService: UserService) {
    const kafka = new Kafka({
      clientId: 'riskistore-birthday',
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    });

    this.consumer = kafka.consumer({ groupId: 'birthday-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'user-updates', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;
        
        const userData = JSON.parse(message.value.toString());
        
        if (await this.userService.checkBirthday(userData.userId)) {
          console.log(`Happy Birthday to user ${userData.userId}!`);
          // Here you would typically send an email or notification
        }
      },
    });
  }
}
