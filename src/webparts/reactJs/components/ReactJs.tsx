import * as React from 'react';
import styles from './ReactJs.module.scss';
import { IReactJsProps } from './IReactJsProps';
import * as $ from 'jquery';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  BaseClientSideWebPart,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
export interface spListItems {
  value: spListItem[]
}
export interface spListItem {
  Title: string;
  id: string;
  Created: string;
  Author: {
    Title: string;
  };
}

export default class ReactJs extends React.Component<IReactJsProps, {}> {

  private listName: string = "";
  public constructor(context: IReactJsProps) {
    super(context);
  }


  public render(): React.ReactElement<IReactJsProps> {

    this.LoadListItems();
    return (
      <div className={styles.reactJs}>
        <div className={styles.container} id="listContent">
          <div className="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white {styles.row}">

          </div>
        </div>
      </div>
    );
  }

  private LoadListItems(): void {
    var temp = this;
    this.listName = "List1";
    let url: string = this.props.newContext + "/_api/web/lists/getbytitle('" + this.listName + "')/items?$select=Title,Created,Author/Title&$expand=Author";

    $.ajax({
      url: url,
      type: "GET",
      headers: {
        "accept": "application/json;odata=verbose",
      },
      success: function (data) {
        console.log(data.d.results);
        temp.RenderListItems(data.d.results);
      },
      error: function (error) {
        alert(JSON.stringify(error));
      }
    });
  }

  private RenderListItems(listItems: spListItem[]): void {
    let itemsHtml: string = "";
    itemsHtml += '<h2>' + this.listName + '</h2>';
    listItems.forEach((listItem: spListItem) => {
      let itemTimeStr: string = listItem.Created;
      let itemTime: Date = new Date(itemTimeStr);
      itemsHtml += `  
      <div class="${styles.listItem}">  
        <div class="${styles.listItemTitle}">${listItem.Title}</div>  
        <div class="${styles.listItemProps}">Created  on${itemTime.toDateString()} by ${listItem.Author.Title}</div>  
      </div>`;
    });
    $("#listContent").append(itemsHtml);
  }
}
