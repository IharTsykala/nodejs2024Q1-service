import { Global, Module } from '@nestjs/common';

//db
import Database from './index';

@Global()
@Module({
  providers: [Database],
  exports: [Database],
})
export class DBModule {}
