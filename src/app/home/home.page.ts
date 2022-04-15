import { Component } from '@angular/core';
import {DataSearchArtist} from "../data/DataSearchArtist";
import {DeezerService} from "../service/deezer.service";
import {Artist} from "../data/Artist";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  readonly TAG:string = 'homepage';
  public artists:Artist[] = [];


  constructor(private deezerService:DeezerService, public router:Router) {
  }

   async onSearchArtist(event:any){
    let val = event.target.value;
    const search:DataSearchArtist  = await this.deezerService.getArtists(val);
    this.artists = search.data;
  }

  onClickCard(artist :Artist){
    //envoyer l'id et le nom de l'artiste de la carte sélectionnée vers la page list-album
    this.router.navigate(['list-album'], {queryParams : {
      id : artist.id,
      name : artist.name
    }});
  }



}
