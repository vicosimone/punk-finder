import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  token: string = "BQBandzHf87v1VxzrVGPh2ii6ODRaIAW2MPpOsTiDp4ZLJXBa5xDtBBtWhb1k7Rw_e7J2rjnhElNCTftUZ3C4ua3Huw6WHa6GTiNN0zD9EkVIvsrs4U3uS2vL4WIB1FV4_f9YMeWikYQ4MhzG_VM4IR7sLmESMX5XixNdfI9HtVAcjsV";
  headers = new Headers();

  constructor(private http: HttpClient) { }

  getDefinitivaTracks = (offset: number): Observable<any> => {
    return this.http.get<any>('https://api.spotify.com/v1/playlists/1flHgYPPFIYwRos1UM9qYD/tracks?offset=' + offset * 100, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    });
  }

  getSeveralArtists = (artistsId: string): Observable<any> => {
    return this.http.get<any>('https://api.spotify.com/v1/artists?ids='+artistsId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    });
  }
}
