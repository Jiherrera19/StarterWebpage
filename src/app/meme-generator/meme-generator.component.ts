import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { App } from './react-src/App.js';

@Component({
  selector: 'app-meme',
  template: '<span [id]="rootDomID"></span>'
})

export class MemeGeneratorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  rootDomID: string;

  protected getRootDomNode() {
      const node = document.getElementById(this.rootDomID);
      invariant(node, `Node '${this.rootDomID} not found!`);
      return node;
  }

  private isMounted(): boolean {
      return !!this.rootDomID;
  }

  protected render() {
      if (this.isMounted()) {
          ReactDOM.render(React.createElement(App), this.getRootDomNode());
      }
  }

  ngOnInit() {
      this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
      this.render();
  }

  ngAfterViewInit() {
      this.render();
  }

  ngOnDestroy() {
      // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
      // ReactDOM.unmountComponentAtNode(this.getRootDomNode());
  }
}