import { Injectable } from '@angular/core';

export class TabConfig {
  name: string;
  value: string[];
}

const tabsData: TabConfig[] = [
  { name: 'From This Device', value: ['file'] },
  { name: 'From the Web', value: ['url'] },
  { name: 'Both', value: ['file', 'url'] },
];

@Injectable()
export class TextService {
  isMultiline: boolean = true;
  markup: string;

  getTabsData(): TabConfig[] {
    return tabsData;
  }
  public getMarkup(): string {
    return this.markup;
  }
  public setMarkup(markup: string){
    this.markup = markup;
  }

}
