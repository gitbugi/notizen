import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { Capacitor } from '@capacitor/core';
import { DetailService } from '../services/detail.service';
import { SQLiteService } from '../services/sqlite.service';
import { ChangeDetectorRef } from '@angular/core';

import config from 'capacitor.config';
import { environment } from 'src/environments/environment';

import { DatabaseService } from '../services/database.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

import { MenuController } from '@ionic/angular'; 

interface listdata {
  name: string;
  finished: boolean;
  comment?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  listdata: listdata[] = [];

  name: string;
  comment: string;
  message: string;

  categorys: any[] = [];
  categoryname: string = this.categorys[0];

  mousedown: boolean = false;
  timeout: any;         //NodeJS.Timeout;

  selectedCategory = ""       //For remove Category

  constructor(private _sqlite: SQLiteService,
    private _detailService: DetailService,
    private _ref: ChangeDetectorRef,
    private database: DatabaseService,
    private menu: MenuController) { }

  ngOnInit() { }

  async ngAfterViewInit() {
    //console.log(this);

    await this.database.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query('CREATE TABLE IF NOT EXISTS categorys(categoryname string);', [])
      await db.query('CREATE TABLE IF NOT EXISTS list(categoryname string,name string, finished boolean, comment string);', [])

      //console.log((await db.query(`SELECT * FROM list`, [])).values);
      //console.log((await db.query(`SELECT * FROM categorys`, [])).values);

      this.categorys = (await db.query('SELECT * FROM categorys ', [])).values
      if (this.categorys[0] !== undefined) {
        this.categoryname = this.categorys[0].categoryname;
        this.listdata = (await db.query(`SELECT * FROM list WHERE categoryname="${this.categoryname}" `, [])).values;
      }
    })
  };

  @ViewChild(IonModal) modal: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  };
  async confirm() {
    if(this.categorys[0]){
      this.modal.dismiss(this.name, 'confirm');
      await this.database.executeQuery<any>(async (db: SQLiteDBConnection) => {
        await db.query(`INSERT INTO list (categoryname, name, finished, comment) VALUES ('${this.categoryname}', '${this.name}', false, '${this.comment}');`, [])
        await this.onSegmentChange();
      })
      this.name = "";
      this.comment = "";
    }
    else {
      alert("Erst eine Kategory hinzufügen")
      this.cancel();
    }
  };
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  };

  async addCategory() {
    let newCategory = prompt();
    if (newCategory !== null) {
      this.categorys.push({ "categoryname": newCategory });

      await this.database.executeQuery<any>(async (db: SQLiteDBConnection) => {
        await db.query(`INSERT INTO categorys(categoryname) VALUES('${newCategory}');`, [])
        this.categoryname = newCategory;
        this.listdata = (await db.query(`SELECT * FROM list WHERE categoryname="${newCategory}"`, [])).values
      })
    }
  };

  async onSegmentChange() {
    this.listdata = [];

    await this.database.executeQuery<any>(async (db: SQLiteDBConnection) => {
      this.listdata = (await db.query(`SELECT * FROM list WHERE categoryname="${this.categoryname}"`, [])).values
    })
  };

  getSelectedCategory(x: any){
    this.selectedCategory = x.target.value;
  }

  async removeCategory() {
    if(this.selectedCategory !== ""){
      this.selectedCategory = this.selectedCategory.trim();
      await this.database.executeQuery<any>(async (db: SQLiteDBConnection) => {
        await db.query(`DELETE FROM categorys WHERE categoryname="${this.selectedCategory}"`, [])
        await db.query(`DELETE FROM list WHERE categoryname="${this.selectedCategory}"`, [])
        this.categorys = [];
        this.categorys = (await db.query(`SELECT * FROM categorys`, [])).values
        if(this.categorys[0]){
          this.categoryname = this.categorys[0].categoryname;
        }
        else{
          this.categoryname = "";
        }
        this.listdata = [];
        this.listdata = (await db.query(`SELECT * FROM list WHERE categoryname="${this.categoryname}"`, [])).values
      })  
    }
    this.menu.close();
  };

  segmentMousedown() {    //FUNKT BEI SMARTPHONE NICHT
    this.timeout = setTimeout(async () => {       //ohne function, sonst wird this nicht von homeComponent übernommen
        let deleteCategory = confirm('delete category')
        if (deleteCategory) {
          //await this.removeCategory();
        }
      
    }, 1500);
  }

  mouseUp() {
    clearInterval(this.timeout);
  }

  async clickOnCheckbox(data: any){    
    //data.finished != data.finished;  <--GEHT NICHT DATABASE ARBEITET MIT 0 ODER 1
    if(data.finished === 0){
      data.finished = 1;
    }
    else if(data.finished === 1){
      data.finished = 0;
    }
    //categoryname="${this.categoryname}"
    await this.database.executeQuery<any>(async (db: SQLiteDBConnection) => {
      (await db.query(`UPDATE list SET finished="${data.finished}" WHERE categoryname="${data.categoryname}" AND name="${data.name}" AND comment="${data.comment}"`, [])).values
    })
  };

  async deleteListItem(data: any){
    await this.database.executeQuery<any>(async (db: SQLiteDBConnection) => {
      await db.query(`DELETE FROM list WHERE categoryname="${data.categoryname}" AND name="${data.name}" AND comment="${data.comment}"`, [])
      this.listdata = [];
      this.listdata = (await db.query(`SELECT * FROM list WHERE categoryname="${data.categoryname}"`, [])).values
    })
  }
}
