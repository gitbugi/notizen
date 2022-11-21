
import { SQLiteService } from './sqlite.service';

import { Injectable } from '@angular/core';


@Injectable()
export class InitializeAppService {

  constructor(
    private sqliteService: SQLiteService) { }

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
      try {
        //execute startup queries
        //await this.migrationService.migrate();

      } catch (error) {
        throw Error(`initializeAppError: ${error}`);
      }

    });
  }

}
