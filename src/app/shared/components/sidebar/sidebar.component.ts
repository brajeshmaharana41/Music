import { Component, OnInit } from '@angular/core';
import {
  CollectionViewer,
  SelectionChange,
  DataSource,
} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SidebarService } from '../../services/sidebar.service';
import { BehaviorSubject } from 'rxjs';
import { DynamicDataSource } from '../../common/dynamicDataSource';
import * as Type from '../../type/main.type';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public id: string,
    public parentNode: any,
    public level = 1,
    public expandable = false,
    public isLoading = false
  ) {}
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    public database: SidebarService,
    public _commonService$: CommonService,
    public _router$: Router
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  ngOnInit(): void {}
}
