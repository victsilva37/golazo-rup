import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await this.dataSource.query('SELECT 1 FROM dual');
      console.log('✅ Conexión a Oracle exitosa');
    } catch (err) {
      console.error('❌ Error de conexión a Oracle:', err);
    }
  }
}
