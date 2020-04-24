import { Component, OnInit, Input } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title : string
  panier: Array<any>

  constructor(private panierSevice: PanierService, private router: Router) {
    this.panier = [];
  }

  goToPanier(){
    this.router.navigate(['/panier']);
  }

  ngOnInit() {
  }

  

}
