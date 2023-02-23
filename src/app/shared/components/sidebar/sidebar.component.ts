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
  // dashboardSelectedMood:Type.MoodType;
  selectedNode: DynamicFlatNode;
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

    // this.database.selectedMood.subscribe({
    //   next:(res)=>{
    //     this.dashboardSelectedMood=res;
    //   }
    // })
  }

  selectNode(node: DynamicFlatNode) {
    this.goToComp(node);
    this.selectedNode = node;
  }

  goToComp(node: DynamicFlatNode) {
    switch (node.item) {
      case 'About Dhaka Record':
<<<<<<< HEAD
        this._router$.navigate(['main/about']);
        break;
      case 'Terms & Condition':
        this._router$.navigate(['main/terms']);
        break;
      case 'Privacy Policy':
        this._router$.navigate(['main/privacy']);
=======
        // this._router$.navigate(['about/about-us']);
                this._router$.navigate(['main/about-us']);
        break;
      case 'Terms & Condition':
        // this._router$.navigate(['about/terms']);
        this._router$.navigate(['main/terms']);
        break;
      case 'Privacy Policy':
        // this._router$.navigate(['about/privacy']);
                this._router$.navigate(['main/privacy']);
>>>>>>> 52585f17872642697793c1729bb2c58d073df498
        break;
    }
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  ngOnInit(): void {}
}
