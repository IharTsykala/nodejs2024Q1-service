import { Global, Module } from '@nestjs/common';

import Database from './index';

@Global()
@Module({
  providers: [Database],
  exports: [Database],
})
export class DBModule {}
