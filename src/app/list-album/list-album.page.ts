import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeezerService} from "../service/deezer.service";
import {DataSearchAlbum} from "../data/DataSearchAlbum";
import {Albums} from "../data/Album";
import {Artist} from "../data/Artist";

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.page.html',
  styleUrls: ['./list-album.page.scss'],
})
export class ListAlbumPage implements OnInit {
  readonly TAG:string = 'ListAlbumPage';

  private artistID: String;
  private artistName: String;
  private listAlbum:Albums[] = [];  //liste des album de l'artiste sélectionné

  constructor(public route:ActivatedRoute, private deezerService:DeezerService, public  router:Router) { }

  async ngOnInit() {
    //récupérer l'id et le nom de l'artiste
    this.route.queryParams.subscribe(params => {
      this.artistID = params['id'];
      this.artistName = params['name'];
    });

    //reqête pour récupérer la liste des album de l'artiste
    const search:DataSearchAlbum = await this.deezerService.getAlbumList(this.artistID);
    this.listAlbum = search.data;
  }

  // envoyer l'id de l'album sélectionné vers list-track
  onClickAlbum(album:Albums){
    this.router.navigate(['list-track/' + album.id])
  }





}
