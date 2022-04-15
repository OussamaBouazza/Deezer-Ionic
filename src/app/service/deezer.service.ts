import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DataSearchArtist} from "../data/DataSearchArtist";
import {DataSearchAlbum} from "../data/DataSearchAlbum";
import {Artist} from "../data/Artist";
import {DataSearchTrackList} from "../data/DataSearchTrackList";

@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  readonly TAG:string = 'dezeer service';

  constructor(private http: HttpClient) { }

  //Récupère la liste des artistes
  getArtists(artist:string): Promise<DataSearchArtist>{
    // console.log(`${this.TAG} getAuthor ${artist}`);

    const url = `https://api.deezer.com/search/artist?q=artist:"${encodeURI(artist)}"`;
    // console.log(`${this.TAG} url: ${url}`);

    return new Promise(resolve =>{
      this.http.get(url).subscribe(data => {
        let json:DataSearchArtist = data as DataSearchArtist;
        resolve(json);

      }, err => {
        console.log(err);
      });
    });
  }

  //récupère la liste des Albums
  getAlbumList(artistID:String): Promise<DataSearchAlbum>{
    // console.log(`artistID : ${artistID}`)

    const url = `https://api.deezer.com/artist/${ artistID}/albums`;

    return new Promise( resolve => {
       this.http.get(url).subscribe(data => {

         let json:DataSearchAlbum = data as DataSearchAlbum;
        resolve(json);
      }, err => {
        console.log(err);
      })
    })
  }

  //récupère la tracklist dd'un album
  getTrackList(albumID:string): Promise<DataSearchTrackList>{
    const url = `https://api.deezer.com/album/${albumID}`;

    return new Promise( resolve => {
      this.http.get(url).subscribe(data => {
        let json:DataSearchTrackList = data as DataSearchTrackList;
        resolve(json);
      }, err => {
        console.log(err);
      })
    })
  }
}
