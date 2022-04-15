import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeezerService} from "../service/deezer.service";
import {DataSearchTrackList, Track} from "../data/DataSearchTrackList";

@Component({
  selector: 'app-list-track',
  templateUrl: './list-track.page.html',
  styleUrls: ['./list-track.page.scss'],
})
export class ListTrackPage implements OnInit {
  albumID: string;
  albumTitle: string;
  albumCover:string;

  trackList: Track[] = [];
  audio:HTMLAudioElement;
  actualSong:string;      //chanson qui est en lecture

  constructor(public route:ActivatedRoute, private deezerService:DeezerService) { }

//lance une requête vers deezer pour récupérer la tracklist de l'album
  async ngOnInit() {
    this.route.queryParams.subscribe(param =>{
      this.albumID = param["albumID"];
      this.albumTitle = param["albumTitle"];
      this.albumCover = param["albumCover"];
    })

    this.audio = new Audio()

    const searchTrack:DataSearchTrackList = await this.deezerService.getTrackList(this.albumID);
    this.trackList = searchTrack.tracks.data;
  }

  //gère le lecteur audio
  playSong(track:Track){
    //met en pause si le clip audio est en lecture ou qu'il y a une autre chanson en lecture
    if (this.actualSong == track.preview && !this.audio.paused){
      this.audio.pause();
      this.actualSong = null;
    }

    else {
      this.audio.src = track.preview;

      this.audio.load();
      this.audio.play();
      this.actualSong = track.preview;
    }
  }

}
