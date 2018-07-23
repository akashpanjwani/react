import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactJsWebPartStrings';
import ReactJs from './components/ReactJs';
import { IReactJsProps } from './components/IReactJsProps';

export interface IReactJsWebPartProps {
  description: string;
  newContext:string;
}

export default class ReactJsWebPart extends BaseClientSideWebPart<IReactJsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<any> = React.createElement(
        ReactJs,
        {
          description: this.properties.description,
          newContext:this.context.pageContext.web.absoluteUrl
        }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('newContext', {
                  label: strings.DescriptionFieldLabel,
                  value:"https://desireinfowebsp.sharepoint.com/sites/Intranet/"
                })
              ]              
            }
          ]
        }
      ]
    };
  }
}
