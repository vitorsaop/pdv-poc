import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importe FormsModule

import { AppComponent } from './app.component';
import { VendaComponent } from './venda/venda.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    VendaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Adicione FormsModule
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
