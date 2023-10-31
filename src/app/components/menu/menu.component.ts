import { Component, OnInit } from '@angular/core';
import { ClashOfClansService } from 'src/app/service/clash-of-clans';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  protected needNewKey: boolean = false;
  protected newKey: string | null | undefined = null;
  protected errors: string = '';
  protected correct: string = '';
  protected clanTag: string = '#2L88GRR8L';

  protected jsonWarLog: any;
  protected jsonMembers: any;
  protected jsonCurrentWar: any;
  protected jsonLeagueGroup: any;
  protected jsonCapitalRaidSeasons: any;

  constructor(private clashOfClansService: ClashOfClansService) {}
  public ngOnInit(): void {
    this.checkApiKey();
  }

  protected checkApiKey(){
    this.errors = ''; this.correct = '';
    if(this.newKey) this.clashOfClansService.syncApiKeyToLocalStorage(this.newKey);
    
    this.newKey = this.clashOfClansService.syncApiKeyFromLocalStorage();
    console.log(this.newKey);

    this.clashOfClansService.getClanInformation('#2L88GRR8L')
    .subscribe({
      next: () => this.needNewKey = false,
      error: error => {
        console.error(error);
        this.errors = error.status + ' ' + error.error.reason + ' ' + error.error.message;
        if(error.status === 403)
          this.needNewKey = true;
      }
    });
  }
  
  // get clash of clans data
  protected getClanMembers(): void {
    this.errors = ''; this.correct = ''; this.jsonMembers = null;

    this.clashOfClansService.getClanMembers(this.clanTag)
    .subscribe({
      next: response => {
        this.correct = 'Data was upload';
        console.log(response);
        this.jsonMembers = response;
      },
      error: error => {
        console.error(error);
        this.errors = error.status + ' ' + error.error.reason + ' ' + error.error.message;
        if(error.status === 403)
          this.needNewKey = true;
      }
    });
  }

  protected getWarLog(): void {
    this.errors = ''; this.correct = ''; this.jsonWarLog = null;

    this.clashOfClansService.getClanWarLog(this.clanTag)
    .subscribe({
      next: response => {
        this.correct = 'Data was upload';
        console.log(response);
        this.jsonWarLog = response;
      },
      error: error => {
        console.error(error);
        this.errors = error.status + ' ' + error.error.reason + ' ' + error.error.message;
        if(error.status === 403)
          this.needNewKey = true;
      }
    });
  }

  protected getCurrentWar(): void {
    this.errors = ''; this.correct = ''; this.jsonCurrentWar = null;
    
    this.clashOfClansService.getClanCurrentWar(this.clanTag)
    .subscribe({
      next: response => {
        this.correct = 'Data was upload';
        console.log(response);
        this.jsonCurrentWar = response;
      },
      error: error => {
        console.error(error);
        this.errors = error.status + ' ' + error.error.reason + ' ' + error.error.message;
        if(error.status === 403)
          this.needNewKey = true;
      }
    });
  }

  protected getLeagueGroup(): void {
    this.errors = ''; this.correct = ''; this.jsonLeagueGroup = null;
    
    this.clashOfClansService.getClanLeagueGroup(this.clanTag)
    .subscribe({
      next: response => {
        this.correct = 'Data was upload';
        console.log(response);
        this.jsonLeagueGroup = response;
      },
      error: error => {
        console.error(error);
        this.errors = error.status + ' ' + error.error.reason + ' ' + error.error.message;
        if(error.status === 403)
          this.needNewKey = true;
      }
    });
  }

  protected getCapitalRaidSeasons(): void {
    this.errors = ''; this.correct = ''; this.jsonCapitalRaidSeasons = null;
    
    this.clashOfClansService.getClanCapitalRaidSeasons(this.clanTag)
    .subscribe({
      next: response => {
        this.correct = 'Data was upload';
        console.log(response);
        this.jsonCapitalRaidSeasons = response;
      },
      error: error => {
        console.error(error);
        this.errors = error.status + ' ' + error.error.reason + ' ' + error.error.message;
        if(error.status === 403)
          this.needNewKey = true;
      }
    });
  }

  // current date
  private getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  // download json files
  protected downloadJson(json: any, fileName: string): void {
    const data = JSON.stringify(json, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName + this.getCurrentDate() + '.json';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}