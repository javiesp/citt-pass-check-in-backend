import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, { // micro servicio
    transport: Transport.TCP,    
    options: {
      port: 3009 // modificar puerto seg´pun los puerto ocupados 
    }
  });
  await app.listen();
}
bootstrap();                
                         