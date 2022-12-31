import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

interface FoodNode {
  icons: string;
  name: string;
  link: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    icons: 'library_music',
    name: 'Mood List',
    link: '',
    children: [{icons: 'home', name: 'Transactions', link: 'transactions'}, {icons: 'account_circle', name: 'Party', link: 'party'}],
  },
  // {
  //   icons: 'add_shopping_cart',
  //   name: 'Purchase',
  //   link: '',
  //   children: [{icons: '', name: 'Purchase Entry', link: 'purchaseentry'}, {icons: '', name: 'Cash Out', link: 'paymentout'}],
  // },
  // {
  //   icons: 'call_split',
  //   name: 'Sale',
  //   link: '',
  //   children: [{icons: '', name: 'Sale Invoice', link: 'purchaseentry'  }, {icons: '', name: 'Cash In', link: 'paymentin'  }],
  // },
  // {
  //   icons: 'import_contacts',
  //   name: 'OutStanding',
  //   link: '',
  //   children: [{icons: '', name: 'Payable', link: 'payable'  }, {icons: '', name: 'Receivable', link: 'bank'  }],
  // },
  // {
  //   icons: 'arrow_forward',
  //   name: 'Master Data',
  //   link: '',
  //   children: [ {icons: '', name: 'Vehicle', link: 'vehicles'}, 
  //               {icons: '', name: 'Customer', link: 'customer'}, 
  //               {icons: '', name: 'Branch', link: 'branch'},
  //               {icons: '', name: 'Dealers', link: 'dealer'},
  //               {icons: '', name: 'Party Group', link: 'partygroup'},
  //               {icons: '', name: 'Finace Company', link: 'financecompany'},
  //               {icons: '', name: 'Bank', link: 'bank'},
  //             ],
  // },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  
  ngOnInit(): void {
  }
}
