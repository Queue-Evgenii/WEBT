import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/categories.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // Выполнение GET-запроса к API
    this.http.get('http://localhost/phpdb/webt/api/categories')
      .subscribe((data) => {
        for(let item of Object.values(data)) {
          data = item;
        }
        this.categories = data as Category[];
      });
  }
  categories: Category[];
  categoriesTitle: string = 'Categories';
}