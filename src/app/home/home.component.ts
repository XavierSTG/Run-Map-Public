import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import createGraph, * as Graph from 'ngraph.graph';
import { GraphService } from '../graph.service';
import { DataService } from '../data.service';
import CheapRuler, { Point } from 'cheap-ruler';
import Utils from 'src/core/util';
import { HttpClient } from '@angular/common/http';

const startCoord: Point = [45.57008, -73.707605];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GraphService]
})

export class HomeComponent implements OnInit {

  readonly baseUrl = 'https://www.google.com/maps/embed/v1/directions?origin=';
  smsBaseUrl = 'https://www.google.com/maps/dir/?api=1&origin=';
  smsUrl = '';
  address: string;
  distance: number;
  url: string;
  trustedUrl: SafeResourceUrl;
  isHidden: boolean;
  ruler = new CheapRuler(45.5, 'meters');

  coords: Point[];
  // globaGraph: GraphService;
  constructor(private sanitizer: DomSanitizer, private graph: GraphService, private data: DataService, public http: HttpClient) {
    //
    this.url = '';
    this.trustedUrl = sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.isHidden = true;
    this.coords = [];
  }

  ngOnInit() {
    // this.graph = new GraphService();
    // this.getData(); unused in version 1

  }
  getData() {
    this.data.getInfo().subscribe(
      data => {
          const graph = createGraph();
          const csvToRowArray = data.split('\n');
          for (let index = 9; index < csvToRowArray.length - 1; index++) {
            const row = csvToRowArray[index].split(' ');
            if (row.length === 3)  {
              graph.addNode(row[0], {lat: row[1], lon: row[2]});
            } else {
              graph.addLink(row[0], row[1], {len: row[2], type: row[3]});
              }
          }
          this.graph.init(graph);
      },
      error => {
          console.log(error);
      }
  );
  }
  processForm() {
    const finalCoords = this.getCoordinates(startCoord, 0);
    this.trustedUrl = this.baseUrl + this.address + '&destination=' + this.address + '&mode=walking&waypoints=';

    // tslint:disable-next-line: prefer-for-of
    let coordsStrings = '';
    for (let i = 0; i < finalCoords.length; ++i) {
      if (i === finalCoords.length - 1) {
        coordsStrings += finalCoords[i][0].toString() + '%2C' + finalCoords[i][1].toString();
      } else {
        coordsStrings +=  finalCoords[i][0].toString() + '%2C' + finalCoords[i][1].toString() + '%7C';
      }
    }

    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.trustedUrl + coordsStrings +
        '&key=[INSERT_KEY]'); //key is hidden for security reasons
    this.isHidden = false;
    this.coords = [];
    this.smsUrl = this.smsBaseUrl + this.address +
    '&destination=' + this.address + '&mode=walking&waypoints=' + coordsStrings + '&travelmode=walking';
    /* sms to be implemented
    this.http.post('https://rest-api.d7networks.com/secure/send',
   '{\n\t"to":"[PHONE_NUMBER]",\n\t"content":"Welcome to D7 sms , we will help you to talk with your customer effectively",\n\t"from":"SMSINFO",\n\t"dlr":"yes",\n\t"dlr-method":"GET", \n\t"dlr-level":"2", \n\t"dlr-url":"http://yourcustompostbackurl.com"\n}',
   {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic [INSERT_KEY]',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    }} ).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
      */

  }

  getCoordinates(coord: Point, dist: number): Point[] {
    const randAngle = Utils.getRandomInt(360);
    const randDist = Utils.getRandomArbitrary(500, 1000);
    dist += randDist;
    this.coords.push(this.ruler.destination(coord, randDist, randAngle));
    const distance = this.ruler.distance(this.coords[this.coords.length - 1], startCoord);
    if ( distance > (.35 * 1000 * this.distance) || dist > (.35 * 1000 * this.distance)) {
      return this.coords;
    } else { return this.getCoordinates(this.coords[this.coords.length - 1], dist); }
   }
}
