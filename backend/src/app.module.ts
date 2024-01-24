import { Module } from '@nestjs/common';
import { TrafficweatherModule } from './trafficweather/trafficweather.module';

@Module({
  imports: [TrafficweatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
