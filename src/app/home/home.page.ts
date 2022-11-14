import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Console } from 'console';
import { MyServiceService } from '../services/my-service.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {
  public definitiva: any = [];
  public totalItems: number = 0;
  public artisti: { name: string; id: string }[] = [];
  constructor(private myService: MyServiceService) { }

  ionViewWillEnter(): void {
    for (let i = 0; i < 24; i++) {
      this.myService.getDefinitivaTracks(i).subscribe({
        next: (data: any) => {
          this.totalItems = data.total;
          this.definitiva.push(...data.items.map((t: any) => {
            return {
              track: {
                name: t.track.name,
                artists: t.track.artists
              },
              added_at: t.added_at
            }
          }));
        },
        error: (error) => console.log(error)
      })
    }
  }

  orderDefinitiva = () => {
    this.definitiva = [...this.definitiva.sort((a: any, b: any) => { return new Date(b.added_at).valueOf() - new Date(a.added_at).valueOf() })];
  }

  loggaDefinitiva() {
    console.log(this.definitiva)
    console.log(this.definitiva.length)
  }

  getArrayArtisti() {
    this.definitiva.map((track, i) => {
      track.track.artists.map((artist, i) => {
        if (this.artisti.findIndex(a => a.id === artist.id) === -1)
          this.artisti.push({
            name: artist.name,
            id: artist.id
          })
      })
    })

    const ids = this.artisti.slice(0,49).map(a => a.id).join(',');
    this.myService.getSeveralArtists(ids).subscribe({
      next: (data: any) => {
        console.log(data)
      }
    })
  }

}
