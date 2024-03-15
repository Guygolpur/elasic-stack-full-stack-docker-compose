import { Component, OnInit } from '@angular/core';
import { NameService } from './name.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  names: any[] = [];
  newName = { firstName: '', lastName: '' };

  constructor(private nameService: NameService) {}

  ngOnInit() {
    this.getNames();
  }

  getNames() {
    this.nameService.getNames().subscribe(data => {
      console.log('data: ', data)
      this.names = data;
    });
  }

  addName() {
    this.nameService.addName(this.newName.firstName, this.newName.lastName).subscribe(() => {
      this.getNames(); // Refresh the list
      this.newName = { firstName: '', lastName: '' }; // Reset the form
    });
  }

  deleteName() {
    this.nameService.deleteName(this.newName.firstName, this.newName.lastName).subscribe(() => {
      this.getNames(); // Refresh the list
      this.newName = { firstName: '', lastName: '' }; // Reset the form
    });
  }
}
